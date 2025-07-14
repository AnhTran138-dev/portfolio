"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Section } from "../atoms/Section";
import { FadeIn } from "../atoms/AnimatedText";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaPaperPlane,
  FaUser,
  FaCommentDots,
} from "react-icons/fa";

interface ContactInfo {
  email: string;
  phone?: string;
  address?: string;
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

export const ContactSection: React.FC<ContactSectionProps> = ({
  contactInfo,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }
  };

  const contactItems = [
    {
      icon: FaEnvelope,
      label: "Email",
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
    },
    ...(contactInfo.phone
      ? [
          {
            icon: FaPhone,
            label: "Phone",
            value: contactInfo.phone,
            href: `tel:${contactInfo.phone}`,
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
          },
        ]
      : []),
  ];

  const socialItems = [
    ...(contactInfo.githubUrl
      ? [
          {
            icon: FaGithub,
            label: "GitHub",
            value: "View Profile",
            href: contactInfo.githubUrl,
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
          },
        ]
      : []),
    ...(contactInfo.facebookUrl
      ? [
          {
            icon: FaFacebook,
            label: "Facebook",
            value: "Follow Me",
            href: contactInfo.facebookUrl,
          },
        ]
      : []),
  ];

  return (
    <Section
      id="contact"
      className="bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl"></div>

        {/* Floating contact icons */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-20 text-4xl text-purple-400/20"
        >
          <FaEnvelope />
        </motion.div>
        <motion.div
          animate={{
            x: [0, 15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-32 left-32 text-3xl text-cyan-400/20"
        >
          <FaCommentDots />
        </motion.div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
                Let&apos;s{" "}
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Connect
                </span>
              </h2>
              <div className="w-32 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto mb-6 rounded-full"></div>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Ready to bring your ideas to life? Let&apos;s start a
                conversation and create something amazing together.
              </p>
            </motion.div>
          </div>
        </FadeIn>

        {/* Three Column Layout: Contact Info + Social + Form */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-8 gap-8 items-start">
          {/* Direct Contact Information - Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="col-span-2"
          >
            <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-3xl p-6 shadow-2xl h-full">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <FaUser className="text-purple-400 mr-3" />
                Direct Contact
              </h3>

              <div className="space-y-4">
                {contactItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, x: 10 }}
                    className="group"
                  >
                    <div className="flex items-center space-x-4 p-3 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <item.icon className="text-lg text-purple-400 group-hover:text-cyan-400 transition-colors duration-300" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-1">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            target={
                              item.href.startsWith("http")
                                ? "_blank"
                                : undefined
                            }
                            rel={
                              item.href.startsWith("http")
                                ? "noopener noreferrer"
                                : undefined
                            }
                            className="text-white hover:text-purple-400 transition-colors duration-300 text-sm font-medium"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <span className="text-white text-sm font-medium">
                            {item.value}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form - Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="col-span-4"
          >
            <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-3xl p-6 shadow-2xl h-full">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <FaPaperPlane className="text-cyan-400 mr-3" />
                Send Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 backdrop-blur-sm text-sm"
                      placeholder="Enter your full name"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 backdrop-blur-sm text-sm"
                      placeholder="your.email@example.com"
                    />
                  </motion.div>
                </div>

                {/* Subject */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300 backdrop-blur-sm text-sm"
                    placeholder="What's this about?"
                  />
                </motion.div>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm resize-none text-sm"
                    placeholder="Tell me about your project..."
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                      isSubmitting
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:from-purple-600 hover:via-pink-600 hover:to-cyan-600 shadow-2xl shadow-purple-500/25"
                    } text-white text-sm`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <FaPaperPlane className="mr-2" />
                        Send Message
                      </span>
                    )}
                  </button>
                </motion.div>

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-green-500/20 border border-green-500/50 rounded-xl text-green-400 text-center text-sm"
                  >
                    ✅ Message sent successfully! I&apos;ll get back to you
                    soon.
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400 text-center text-sm"
                  >
                    ❌ Something went wrong. Please try again.
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>

          {/* Social Links - Middle Column */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="col-span-2"
          >
            <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-3xl p-6 shadow-2xl h-full">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <FaCommentDots className="text-blue-400 mr-3" />
                Social Media
              </h3>

              <div className="space-y-4">
                {socialItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, x: 10 }}
                    className="group"
                  >
                    <div className="flex items-center space-x-4 p-3 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <item.icon className="text-lg text-blue-400 group-hover:text-purple-400 transition-colors duration-300" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-1">
                          {item.label}
                        </p>
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-blue-400 transition-colors duration-300 text-sm font-medium"
                        >
                          {item.value}
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};
