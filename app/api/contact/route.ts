import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

// Validate environment variables
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "anhthtservice@gmail.com";

if (!RESEND_API_KEY) {
  console.error("RESEND_API_KEY is not configured");
}

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ApiResponse {
  message?: string;
  error?: string;
  id?: string;
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse>> {
  try {
    // Check if Resend is properly configured
    if (!resend || !RESEND_API_KEY) {
      console.error("Email service not configured");
      return NextResponse.json(
        {
          error:
            "Email service is currently unavailable. Please try contacting directly via email.",
        },
        { status: 503 }
      );
    }

    // Parse and validate request body
    let body: ContactFormData;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request format" },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = body;

    // Validate required fields
    if (
      !name?.trim() ||
      !email?.trim() ||
      !subject?.trim() ||
      !message?.trim()
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate field lengths
    if (name.length > 100) {
      return NextResponse.json(
        { error: "Name is too long (max 100 characters)" },
        { status: 400 }
      );
    }

    if (subject.length > 200) {
      return NextResponse.json(
        { error: "Subject is too long (max 200 characters)" },
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { error: "Message is too long (max 5000 characters)" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
    };

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [CONTACT_EMAIL],
      replyTo: sanitizedData.email,
      subject: `Portfolio Contact: ${sanitizedData.subject}`,
      html: generateEmailTemplate(sanitizedData),
    });

    if (error) {
      console.error("Resend API error:", error);

      // Handle specific Resend errors
      if (error.message?.includes("API key")) {
        return NextResponse.json(
          {
            error: "Email service configuration error. Please try again later.",
          },
          { status: 503 }
        );
      }

      if (error.message?.includes("rate limit")) {
        return NextResponse.json(
          { error: "Too many emails sent. Please try again later." },
          { status: 429 }
        );
      }

      return NextResponse.json(
        {
          error: "Failed to send email. Please try again or contact directly.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Message sent successfully! I'll get back to you soon.",
        id: data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected server error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}

// Separate function to generate email template
function generateEmailTemplate(data: ContactFormData): string {
  const { name, email, subject, message } = data;
  const timestamp = new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #1a1a1a; color: #ffffff;">
      <div style="background: linear-gradient(135deg, #06b6d4, #3b82f6); padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
        <h1 style="margin: 0; font-size: 28px; font-weight: bold;">New Portfolio Contact</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">From your portfolio website</p>
      </div>
      
      <div style="background-color: #2a2a2a; border-radius: 12px; padding: 30px; margin-bottom: 20px;">
        <div style="margin-bottom: 25px;">
          <h3 style="color: #06b6d4; margin: 0 0 8px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Contact Information</h3>
          <div style="background-color: #1a1a1a; padding: 20px; border-radius: 8px; border-left: 4px solid #06b6d4;">
            <p style="margin: 0 0 10px 0;"><strong style="color: #06b6d4;">Name:</strong> ${name}</p>
            <p style="margin: 0 0 10px 0;"><strong style="color: #06b6d4;">Email:</strong> ${email}</p>
            <p style="margin: 0;"><strong style="color: #06b6d4;">Subject:</strong> ${subject}</p>
          </div>
        </div>
        
        <div>
          <h3 style="color: #06b6d4; margin: 0 0 15px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Message</h3>
          <div style="background-color: #1a1a1a; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6;">
            <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      </div>
      
      <div style="text-align: center; padding: 20px; background-color: #2a2a2a; border-radius: 12px;">
        <p style="margin: 0; color: #888; font-size: 14px;">
          This email was sent from your portfolio contact form
        </p>
        <p style="margin: 5px 0 0 0; color: #06b6d4; font-size: 12px;">
          ${timestamp}
        </p>
      </div>
    </div>
  `;
}

// Health check endpoint
export async function GET(): Promise<NextResponse> {
  const isConfigured = !!RESEND_API_KEY;

  return NextResponse.json({
    status: isConfigured ? "configured" : "not_configured",
    service: "contact-api",
  });
}
