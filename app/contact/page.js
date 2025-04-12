"use client"; // Mark the component as a client component

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { FaWhatsapp, FaLinkedin, FaInstagram } from "react-icons/fa";

const Contact = () => {
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (title, description, duration) => {
    setToastMessage({ title, description });
    setTimeout(() => setToastMessage(null), duration);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    country: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://medical-tourism-lqcu.onrender.com/api/patient/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if(!response.ok) {
        throw new Error(data.message || "Failed to Contact, Try Again!");
      }

      //After successful registration, show following message
      showToast(
        "Message received",
        "We'll get back to you as soon as possible.",
        5000
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }

    const form = e.target;
    form.reset();
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-32 bg-secondary/50 relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-block px-3 py-1 mb-4 text-xl font-medium bg-[#e3f2fd] rounded-full text-[#1e67a8]">
              Get in Touch
            </div>

            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
              Your Healthcare
              <br />
              <span className="text-primary">Journey Begins Here</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Have questions about medical tourism or need to discuss your
              treatment options? Our team of healthcare experts is here to guide
              you every step of the way.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Email Us</h3>
                  <p className="text-muted-foreground">
                    travelncurewellness@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Call Us</h3>
                  <p className="text-muted-foreground">+91 99273 28682</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Visit Us</h3>
                  <p className="text-muted-foreground">
                    Dharampur, Dehradun, Uttarakhand, India
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <a
                href="https://wa.me/919927328682"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-green-500 hover:bg-green-500 hover:text-white transition-colors"
              >
                <FaWhatsapp />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/travle-n-cure-wellness/"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <FaLinkedin />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <FaInstagram />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="blue-glass rounded-2xl p-8 md:p-10 shadow-lg"
          >
            {error && <p className="text-red-500"> {error} </p>}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="John Doe"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="john@example.com"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="contact"
                    className="block text-sm font-medium mb-2"
                  >
                    Contact
                  </label>
                  <input
                    type="tel"
                    id="contact"
                    className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="Contact Number"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium mb-2"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="Your Country"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                  placeholder="Tell us about your medical needs..."
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <Button
                type="submit"
                className="w-full rounded-lg py-6 bg-black text-base shadow-lg shadow-primary/20"
              >
                {loading ? "Sending Your Message": "Send Message"}
                {/* Send Message */}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                By submitting this form, you agree to our{" "}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary hover:underline">
                  Terms of Service
                </a>
                .
              </p>
            </form>
          </motion.div>
        </div>
      </div>
      {toastMessage && (
        <div className="fixed bottom-8 left-8 p-4 bg-white rounded shadow-md">
          <p className="font-semibold">{toastMessage.title}</p>
          <p className="text-sm">{toastMessage.description}</p>
        </div>
      )}
    </section>
  );
};

export default Contact;