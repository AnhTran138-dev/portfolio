"use client";

import React from "react";
import { motion } from "framer-motion";
import { Section } from "../atoms/Section";
import { FadeIn } from "../atoms/AnimatedText";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

interface ContactInfo {
  email: string;
  phone?: string;
  address?: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

interface ContactSectionProps {
  contactInfo: ContactInfo;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  contactInfo,
}) => {
  const contactItems = [
    {
      icon: FaEnvelope,
      label: "Email",
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
      color: "text-red-600",
    },
    ...(contactInfo.phone
      ? [
          {
            icon: FaPhone,
            label: "Phone",
            value: contactInfo.phone,
            href: `tel:${contactInfo.phone}`,
            color: "text-green-600",
          },
        ]
      : []),
    ...(contactInfo.address
      ? [
          {
            icon: FaMapMarkerAlt,
            label: "Location",
            value: contactInfo.address,
            href: undefined,
            color: "text-blue-600",
          },
        ]
      : []),
    ...(contactInfo.githubUrl
      ? [
          {
            icon: FaGithub,
            label: "GitHub",
            value: "View Profile",
            href: contactInfo.githubUrl,
            color: "text-gray-800",
          },
        ]
      : []),
    ...(contactInfo.linkedinUrl
      ? [
          {
            icon: FaLinkedin,
            label: "LinkedIn",
            value: "Connect",
            href: contactInfo.linkedinUrl,
            color: "text-blue-700",
          },
        ]
      : []),
  ];

  return (
    <Section id="contact" className="bg-gray-900 text-white">
      <FadeIn>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-lg text-gray-300">
            Feel free to reach out for collaboration or just a friendly hello!
          </p>
        </div>
      </FadeIn>

      <div className="max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contactItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <item.icon className={`${item.color} text-2xl`} />
              <div>
                <p className="text-sm text-gray-400">{item.label}</p>
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="text-white hover:text-blue-400 transition-colors"
                  >
                    {item.value}
                  </a>
                ) : (
                  <span className="text-white">{item.value}</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};
