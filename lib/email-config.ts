interface EmailConfig {
  apiKey: string;
  fromEmail: string;
  contactEmail: string;
  appName: string;
  appUrl: string;
}

export const getEmailConfig = (): EmailConfig => {
  const config = {
    apiKey: process.env.RESEND_API_KEY,
    fromEmail: process.env.RESEND_FROM_EMAIL,
    contactEmail: process.env.CONTACT_EMAIL,
    appName: process.env.NEXT_PUBLIC_APP_NAME,
    appUrl: process.env.NEXT_PUBLIC_APP_URL,
  };

  // Validate required environment variables
  const requiredFields = ["apiKey", "fromEmail", "contactEmail"] as const;
  const missingFields = requiredFields.filter((field) => !config[field]);

  if (missingFields.length > 0) {
    throw new Error(
      `Missing required email configuration: ${missingFields.join(", ")}`
    );
  }

  return config as EmailConfig;
};

export const validateEmailConfig = (): boolean => {
  try {
    getEmailConfig();
    return true;
  } catch {
    return false;
  }
};
