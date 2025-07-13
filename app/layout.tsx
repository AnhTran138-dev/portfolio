import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trần Hoàng Trung Anh - Frontend Developer Portfolio",
  description:
    "Passionate Frontend Developer specializing in React, Next.js, and modern web technologies. FPT University graduate with hands-on experience in full-stack development.",
  keywords: [
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Web Development",
    "FPT University",
  ],
  authors: [{ name: "Trần Hoàng Trung Anh" }],
  creator: "Trần Hoàng Trung Anh",
  openGraph: {
    title: "Trần Hoàng Trung Anh - Frontend Developer Portfolio",
    description:
      "Passionate Frontend Developer specializing in React, Next.js, and modern web technologies.",
    url: "https://your-domain.com",
    siteName: "Trần Hoàng Trung Anh Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trần Hoàng Trung Anh - Frontend Developer Portfolio",
    description:
      "Passionate Frontend Developer specializing in React, Next.js, and modern web technologies.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Trần Hoàng Trung Anh",
    jobTitle: "Frontend Developer",
    description:
      "Passionate Frontend Developer with experience in modern web technologies",
    url: "https://your-domain.com",
    sameAs: ["https://github.com/username", "https://linkedin.com/in/username"],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Web Development",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "FPT University",
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
