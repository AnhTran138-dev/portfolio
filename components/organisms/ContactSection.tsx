"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Section } from "../atoms/Section";
import { Button } from "../ui/button";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
} from "react-icons/fa";

interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  githubUrl?: string;
  linkedinUrl?: string;
  facebookUrl?: string;
}

interface ContactSectionProps {
  contactInfo: ContactInfo;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface SubmitStatus {
  type: "idle" | "loading" | "success" | "error" | "warning";
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  contactInfo,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({
    type: "idle",
    message: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isServiceAvailable, setIsServiceAvailable] = useState<boolean>(true);

  // Check service availability on mount
  useEffect(() => {
    const checkServiceHealth = async () => {
      try {
        const response = await fetch("/api/contact");
        const data = await response.json();
        setIsServiceAvailable(data.status === "configured");
      } catch {
        setIsServiceAvailable(false);
      }
    };

    checkServiceHealth();
  }, []);

  // Validate individual fields
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (value.length > 100) return "Name is too long (max 100 characters)";
        break;
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Please enter a valid email";
        break;
      case "subject":
        if (!value.trim()) return "Subject is required";
        if (value.length > 200)
          return "Subject is too long (max 200 characters)";
        break;
      case "message":
        if (!value.trim()) return "Message is required";
        if (value.length > 5000)
          return "Message is too long (max 5000 characters)";
        break;
    }
    return undefined;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field error when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    // Clear status message
    if (submitStatus.type !== "idle") {
      setSubmitStatus({ type: "idle", message: "" });
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setFormErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof FormData]);
      if (error) {
        errors[key as keyof FormErrors] = error;
        isValid = false;
      }
    });

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check service availability
    if (!isServiceAvailable) {
      setSubmitStatus({
        type: "warning",
        message: `Email service is currently unavailable. Please contact me directly at ${contactInfo.email}`,
      });
      return;
    }

    // Validate form
    if (!validateForm()) {
      setSubmitStatus({
        type: "error",
        message: "Please fix the errors above",
      });
      return;
    }

    setSubmitStatus({
      type: "loading",
      message: "Sending your message...",
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message:
            result.message ||
            "Message sent successfully! I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
        setFormErrors({});
      } else {
        // Handle different error status codes
        if (response.status === 503) {
          setSubmitStatus({
            type: "warning",
            message:
              result.error ||
              `Service temporarily unavailable. Please contact me directly at ${contactInfo.email}`,
          });
        } else if (response.status === 429) {
          setSubmitStatus({
            type: "warning",
            message:
              result.error ||
              "Too many requests. Please try again in a few minutes.",
          });
        } else {
          setSubmitStatus({
            type: "error",
            message:
              result.error || "Failed to send message. Please try again.",
          });
        }
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message: `Network error. Please check your connection or contact me directly at ${contactInfo.email}`,
      });
    }

    // Clear status after 7 seconds
    setTimeout(() => {
      setSubmitStatus({ type: "idle", message: "" });
    }, 7000);
  };

  const contactItems = [
    {
      icon: FaEnvelope,
      label: "Email",
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
      color: "text-cyan-400",
    },
    {
      icon: FaPhone,
      label: "Phone",
      value: contactInfo.phone,
      href: `tel:${contactInfo.phone}`,
      color: "text-green-400",
    },
    {
      icon: FaMapMarkerAlt,
      label: "Location",
      value: contactInfo.address,
      href: null,
      color: "text-red-400",
    },
  ];

  const socialLinks = [
    {
      icon: FaGithub,
      href: contactInfo.githubUrl,
      label: "GitHub",
      color: "hover:text-gray-300",
    },
    {
      icon: FaLinkedin,
      href: contactInfo.linkedinUrl,
      label: "LinkedIn",
      color: "hover:text-blue-400",
    },
    {
      icon: FaFacebook,
      href: contactInfo.facebookUrl,
      label: "Facebook",
      color: "hover:text-blue-500",
    },
  ].filter((link) => link.href);

  return (
    <Section id="contact" className="bg-black relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Get In{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Ready to start your next project? Let's work together to create
            something amazing.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Information - Same as before */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* ... Contact info section remains the same ... */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                Let's Connect
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Have a project in mind or just want to chat about web
                development? Feel free to reach out through any of the channels
                below.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              {contactItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      className="flex items-center space-x-4 p-4 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-700/30 hover:border-cyan-400/50 transition-all duration-300 hover:bg-gray-800/50"
                    >
                      <div
                        className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 ${item.color} group-hover:scale-110 transition-transform duration-300`}
                      >
                        <item.icon size={20} />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">{item.label}</p>
                        <p className="text-white font-medium">{item.value}</p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center space-x-4 p-4 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-700/30">
                      <div
                        className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 ${item.color}`}
                      >
                        <item.icon size={20} />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">{item.label}</p>
                        <p className="text-white font-medium">{item.value}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-6">
              <p className="text-gray-400 text-sm mb-4">Follow me on</p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gray-900/50 border border-gray-700/30 text-gray-400 ${social.color} transition-all duration-300 hover:border-cyan-400/50 hover:scale-110`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form - Enhanced */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {/* Service Status Warning */}
            {!isServiceAvailable && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 flex items-center space-x-3"
              >
                <FaInfoCircle />
                <span className="text-sm">
                  Contact form is temporarily unavailable. Please use direct
                  email instead.
                </span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    required
                    className={`w-full px-4 py-3 rounded-xl bg-gray-900/50 border text-white placeholder-gray-500 focus:outline-none transition-all duration-300 ${
                      formErrors.name
                        ? "border-red-500/70 focus:border-red-400 focus:ring-2 focus:ring-red-400/20"
                        : "border-gray-700/50 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    }`}
                    placeholder="John Doe"
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-400">
                      {formErrors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    required
                    className={`w-full px-4 py-3 rounded-xl bg-gray-900/50 border text-white placeholder-gray-500 focus:outline-none transition-all duration-300 ${
                      formErrors.email
                        ? "border-red-500/70 focus:border-red-400 focus:ring-2 focus:ring-red-400/20"
                        : "border-gray-700/50 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    }`}
                    placeholder="john@example.com"
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-400">
                      {formErrors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required
                  className={`w-full px-4 py-3 rounded-xl bg-gray-900/50 border text-white placeholder-gray-500 focus:outline-none transition-all duration-300 ${
                    formErrors.subject
                      ? "border-red-500/70 focus:border-red-400 focus:ring-2 focus:ring-red-400/20"
                      : "border-gray-700/50 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  }`}
                  placeholder="Project Collaboration"
                />
                {formErrors.subject && (
                  <p className="mt-1 text-sm text-red-400">
                    {formErrors.subject}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Message *{" "}
                  <span className="text-gray-500 text-xs">
                    ({formData.message.length}/5000)
                  </span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required
                  className={`w-full px-4 py-3 rounded-xl bg-gray-900/50 border text-white placeholder-gray-500 focus:outline-none transition-all duration-300 resize-none ${
                    formErrors.message
                      ? "border-red-500/70 focus:border-red-400 focus:ring-2 focus:ring-red-400/20"
                      : "border-gray-700/50 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  }`}
                  placeholder="Tell me about your project..."
                />
                {formErrors.message && (
                  <p className="mt-1 text-sm text-red-400">
                    {formErrors.message}
                  </p>
                )}
              </div>

              {/* Status Message */}
              {submitStatus.type !== "idle" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl flex items-center space-x-3 ${
                    submitStatus.type === "success"
                      ? "bg-green-500/10 border border-green-500/30 text-green-400"
                      : submitStatus.type === "error"
                        ? "bg-red-500/10 border border-red-500/30 text-red-400"
                        : submitStatus.type === "warning"
                          ? "bg-yellow-500/10 border border-yellow-500/30 text-yellow-400"
                          : "bg-cyan-500/10 border border-cyan-500/30 text-cyan-400"
                  }`}
                >
                  {submitStatus.type === "success" && <FaCheckCircle />}
                  {submitStatus.type === "error" && <FaExclamationTriangle />}
                  {submitStatus.type === "warning" && <FaInfoCircle />}
                  {submitStatus.type === "loading" && (
                    <div className="w-4 h-4 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
                  )}
                  <span className="text-sm">{submitStatus.message}</span>
                </motion.div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={
                  submitStatus.type === "loading" || !isServiceAvailable
                }
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-[1.02] disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {submitStatus.type === "loading" ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    <span>
                      {!isServiceAvailable
                        ? "Service Unavailable"
                        : "Send Message"}
                    </span>
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};
