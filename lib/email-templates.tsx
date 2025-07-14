interface ContactEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
  appName: string;
  appUrl: string;
  timestamp: string;
}

export const ContactEmailTemplate = ({
  name,
  email,
  subject,
  message,
  appName,
  appUrl,
  timestamp,
}: ContactEmailProps): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>New Contact Form Submission</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <!-- Header -->
          <div style="background-color: #000; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">
              New Contact from <span style="color: #06b6d4;">${appName}</span>
            </h1>
          </div>

          <!-- Content -->
          <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <!-- Contact Info -->
            <div style="margin-bottom: 30px;">
              <h2 style="color: #06b6d4; margin-bottom: 20px; font-size: 20px; border-bottom: 2px solid #06b6d4; padding-bottom: 10px;">
                Contact Information
              </h2>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid #eee;">
                  <td style="padding: 15px; font-weight: bold; color: #555; width: 30%;">Name:</td>
                  <td style="padding: 15px; color: #333;">${name}</td>
                </tr>
                <tr style="border-bottom: 1px solid #eee;">
                  <td style="padding: 15px; font-weight: bold; color: #555;">Email:</td>
                  <td style="padding: 15px;">
                    <a href="mailto:${email}" style="color: #06b6d4; text-decoration: none;">
                      ${email}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px; font-weight: bold; color: #555;">Subject:</td>
                  <td style="padding: 15px; color: #333;">${subject}</td>
                </tr>
              </table>
            </div>

            <!-- Message -->
            <div style="margin-bottom: 30px;">
              <h3 style="color: #06b6d4; margin-bottom: 15px; border-bottom: 2px solid #06b6d4; padding-bottom: 5px;">Message:</h3>
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #06b6d4; white-space: pre-wrap; font-family: Arial, sans-serif; line-height: 1.6;">
${message}
              </div>
            </div>

            <!-- Quick Actions -->
            <div style="text-align: center; margin-bottom: 30px;">
              <a 
                href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}"
                style="background-color: #06b6d4; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold; font-size: 16px; box-shadow: 0 2px 4px rgba(6, 182, 212, 0.3);"
              >
                ✉️ Reply to ${name}
              </a>
            </div>

            <!-- Footer -->
            <div style="border-top: 2px solid #eee; padding-top: 20px; font-size: 12px; color: #888; text-align: center;">
              <p style="margin: 5px 0;"><strong>Received:</strong> ${timestamp}</p>
              <p style="margin: 5px 0;">
                This message was sent from the contact form on
                <a href="${appUrl}" style="color: #06b6d4; text-decoration: none;">
                  ${appName}
                </a>
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `.trim();
};

// Auto-reply template for the sender
export const AutoReplyTemplate = ({
  name,
  appName,
}: {
  name: string;
  appName: string;
}): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Thank you for your message</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #000; color: white; padding: 25px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">
              Thank you, <span style="color: #06b6d4;">${name}</span>! 🙏
            </h1>
          </div>

          <div style="background-color: white; padding: 40px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <p style="font-size: 18px; margin-bottom: 20px;">Hi <strong>${name}</strong>,</p>
            
            <p style="font-size: 16px; margin-bottom: 20px;">
              Thank you for reaching out through my portfolio contact form. 
              I've received your message and will get back to you as soon as possible.
            </p>
            
            <div style="background-color: #f0f9ff; border-left: 4px solid #06b6d4; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
              <p style="margin: 0; font-size: 16px; color: #0c4a6e;">
                <strong>⏰ Response Time:</strong> I typically respond within 24-48 hours during business days.
              </p>
            </div>
            
            <p style="font-size: 16px; margin-bottom: 30px;">
              In the meantime, feel free to check out my other projects on 
              <a href="https://github.com/AnhTran138-dev" style="color: #06b6d4; text-decoration: none;">GitHub</a> 
              or connect with me on 
              <a href="https://www.linkedin.com/in/tran-hoang-trung-anh/" style="color: #06b6d4; text-decoration: none;">LinkedIn</a>.
            </p>
            
            <div style="border-top: 2px solid #eee; padding-top: 25px; margin-top: 30px;">
              <p style="margin-bottom: 5px; font-size: 16px;">
                Best regards,<br />
                <strong style="color: #06b6d4; font-size: 18px;">Trần Hoàng Trung Anh</strong>
              </p>
              <p style="margin: 5px 0; color: #666;">Frontend Developer</p>
              
              <!-- Professional signature -->
              <div style="margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 6px;">
                <div style="font-size: 14px; color: #555;">
                  📧 <a href="mailto:anhthtservice@gmail.com" style="color: #06b6d4; text-decoration: none;">anhthtservice@gmail.com</a><br />
                  🐙 <a href="https://github.com/AnhTran138-dev" style="color: #06b6d4; text-decoration: none;">GitHub</a> | 
                  💼 <a href="https://www.linkedin.com/in/tran-hoang-trung-anh/" style="color: #06b6d4; text-decoration: none;">LinkedIn</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `.trim();
};

// Plain text versions for better deliverability
export const ContactEmailTemplatePlainText = ({
  name,
  email,
  subject,
  message,
  appName,
  timestamp,
}: ContactEmailProps): string => {
  return `
New Contact from ${appName}
============================

Contact Information:
-------------------
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
--------
${message}

---
Received on: ${timestamp}
This message was sent from the contact form on ${appName}
  `.trim();
};

export const AutoReplyTemplatePlainText = ({
  name,
}: {
  name: string;
}): string => {
  return `
Hi ${name},

Thank you for reaching out through my portfolio contact form. 
I've received your message and will get back to you as soon as possible.

Response Time: I typically respond within 24-48 hours during business days.

In the meantime, feel free to check out my other projects:
- GitHub: https://github.com/AnhTran138-dev
- LinkedIn: https://www.linkedin.com/in/tran-hoang-trung-anh/

Best regards,
Trần Hoàng Trung Anh
Frontend Developer
anhthtservice@gmail.com
  `.trim();
};
