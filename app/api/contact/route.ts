import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getEmailConfig, validateEmailConfig } from "@/lib/email-config";
import {
  ContactEmailTemplate,
  AutoReplyTemplate,
  ContactEmailTemplatePlainText,
  AutoReplyTemplatePlainText,
} from "@/lib/email-templates";
import { z } from "zod";

// Rate limiting (simple in-memory store)
const rateLimit = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 3; // Max 3 requests per 15 minutes

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters").max(200),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000),
});

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const requests = rateLimit.get(identifier) || [];

  // Remove old requests
  const recentRequests = requests.filter(
    (time) => now - time < RATE_LIMIT_WINDOW
  );

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  recentRequests.push(now);
  rateLimit.set(identifier, recentRequests);
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Check if email configuration is valid
    if (!validateEmailConfig()) {
      console.error("Invalid email configuration");
      return NextResponse.json(
        {
          success: false,
          error:
            "Email service is currently unavailable. Please try again later.",
        },
        { status: 503 }
      );
    }

    const body = await request.json();

    // Validate input
    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid form data",
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = validationResult.data;

    console.log("📧 Received contact form submission:", {
      name,
      email,
      subject,
      messageLength: message.length,
    });

    // Rate limiting
    const clientIP =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please try again later.",
        },
        { status: 429 }
      );
    }

    // Get email configuration
    const config = getEmailConfig();
    console.log("📋 Email config:", {
      fromEmail: config.fromEmail,
      contactEmail: config.contactEmail,
      hasApiKey: !!config.apiKey,
    });

    const resend = new Resend(config.apiKey);

    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Ho_Chi_Minh",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    // Send email to yourself (notification)
    console.log("📬 Sending notification email to:", config.contactEmail);
    const emailToSelf = await resend.emails.send({
      from: config.fromEmail,
      to: config.contactEmail,
      subject: `New Contact: ${subject}`,
      replyTo: email, // Email của khách hàng
      html: ContactEmailTemplate({
        name,
        email,
        subject,
        message,
        appName: config.appName || "Portfolio",
        appUrl: config.appUrl || "",
        timestamp,
      }),
      text: ContactEmailTemplatePlainText({
        name,
        email,
        subject,
        message,
        appName: config.appName || "Portfolio",
        appUrl: config.appUrl || "",
        timestamp,
      }),
      // Anti-spam headers
      headers: {
        "X-Priority": "3",
        "X-Mailer": "Portfolio Contact Form",
        "X-Entity-ID": `contact-${Date.now()}`,
      },
    });

    if (emailToSelf.error) {
      console.error("❌ Failed to send notification email:", emailToSelf.error);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to send message. Please try again later.",
        },
        { status: 500 }
      );
    }

    console.log(
      "✅ Notification email sent successfully:",
      emailToSelf.data?.id
    );

    // Send auto-reply to the sender - Move this BEFORE the success response
    console.log("📤 Sending auto-reply to:", email);
    try {
      const autoReplyResult = await resend.emails.send({
        from: config.fromEmail, // onboarding@resend.dev
        to: email, // Email khách hàng
        subject: "Thank you for contacting me - Trần Hoàng Trung Anh",
        html: AutoReplyTemplate({
          name,
          appName: config.appName || "Portfolio",
        }),
        text: AutoReplyTemplatePlainText({ name }),
        // Anti-spam headers for auto-reply
        headers: {
          "X-Priority": "3",
          "X-Mailer": "Portfolio Auto-Reply System",
          "X-Auto-Response-Suppress": "DR, RN, NRN, OOF, AutoReply",
          "Auto-Submitted": "auto-replied",
        },
      });

      if (autoReplyResult.error) {
        console.error("❌ Auto-reply failed:", autoReplyResult.error);
        // Log detailed error for debugging
        console.error("Auto-reply error details:", {
          error: autoReplyResult.error,
          fromEmail: config.fromEmail,
          toEmail: email,
          hasApiKey: !!config.apiKey,
        });
      } else {
        console.log(
          "✅ Auto-reply sent successfully:",
          autoReplyResult.data?.id
        );
      }
    } catch (autoReplyError) {
      console.error("❌ Auto-reply exception:", autoReplyError);
      // Log more details about the error
      if (autoReplyError instanceof Error) {
        console.error("Auto-reply error message:", autoReplyError.message);
        console.error("Auto-reply error stack:", autoReplyError.stack);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully! I will get back to you soon.",
    });
  } catch (error) {
    console.error("❌ Contact form error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}

// Handle preflight requests
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}
