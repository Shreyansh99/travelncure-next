"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import bgimg from "@/assets/landing.jpg";

const Hero = () => {
  const heroRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    treatment: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", phone: "", treatment: "" });
  };

  // Modified parallax effect on scroll - gentler and prevents text fade
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;

      const scrollY = window.scrollY;
      const heroImage = heroRef.current.querySelector(".hero-image");
      const heroContent = heroRef.current.querySelector(".hero-content");

      // Limit the maximum parallax movement
      const maxMovement = 50;
      const imageMovement = Math.min(scrollY * 0.1, maxMovement);
      const contentMovement = Math.min(scrollY * 0.05, maxMovement / 2);

      if (heroImage) {
        heroImage.style.transform = `translateY(${imageMovement}px)`;
        // Maintain opacity
        heroImage.style.opacity = Math.max(1 - scrollY / 1000, 0.7);
      }

      if (heroContent) {
        heroContent.style.transform = `translateY(${contentMovement}px)`;
        // Maintain opacity - text stays fully visible
        heroContent.style.opacity = Math.max(1 - scrollY / 2000, 0.95);

        // Add text shadow as scroll increases to maintain readability
        const shadowIntensity = Math.min(scrollY / 500, 0.3);
        heroContent.style.textShadow = `0 2px 4px rgba(0,0,0,${shadowIntensity})`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden font-sans"
    >
      {/* Modern Background elements */}
      <div className="absolute inset-0">
        {/* Gradient background with modern colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0099ff] via-[#0077cc] to-[#0055aa]"></div>

        {/* Animated wave effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="wave-container">
            <div className="wave wave1"></div>
            <div className="wave wave2"></div>
          </div>
        </div>

        {/* Modern medical icons background pattern */}
        <div className="absolute inset-0 opacity-15 bg-[url('/images/medical-pattern.svg')] bg-repeat bg-[length:200px_200px]"></div>

        {/* Modern geometric shapes with floating animation */}
        <div
          className="absolute top-20 right-20 w-64 h-64 rounded-full bg-white opacity-5"
          style={{ animation: "float 8s ease-in-out infinite" }}
        ></div>
        <div
          className="absolute bottom-20 left-20 w-40 h-40 rounded-full bg-white opacity-5"
          style={{ animation: "float 12s ease-in-out infinite", animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/3 left-1/4 w-20 h-20 rounded-full bg-white opacity-5"
          style={{ animation: "float 10s ease-in-out infinite", animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/3 right-1/4 w-32 h-32 rounded-full bg-white opacity-5"
          style={{ animation: "float 9s ease-in-out infinite", animationDelay: "3s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center gap-12 md:gap-8">
        {/* Hero Content */}
        <motion.div
          className="hero-content flex-1 text-center md:text-left space-y-8 pt-12 md:pt-16 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="flex flex-col items-center md:items-start mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-4 mb-2">
              <Image
                src="/logo.png"
                alt="Healithon Logo"
                width={120}
                height={120}
                className="rounded-md"
                priority
              />
              <div className="flex flex-col">
                <div className="text-4xl md:text-5xl font-display font-bold text-white drop-shadow-md" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
                  Healithon
                </div>
                <div className="text-lg text-white/90 font-medium">International Healthcare Experts</div>
              </div>
            </div>
          </motion.div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight tracking-tight mt-2">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="block text-white drop-shadow-md"
              style={{ textShadow: "0 2px 4px rgba(0,0,0,0.15)" }}
            >
              Medical Treatment With
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="block text-white drop-shadow-md"
              style={{ textShadow: "0 2px 4px rgba(0,0,0,0.15)" }}
            >
              Unmatched Personal Care
            </motion.span>
          </h1>

          <motion.p
            className="text-lg md:text-xl text-white max-w-xl mx-auto md:mx-0 mt-4 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textShadow: "0 1px 2px rgba(0,0,0,0.15)" }}
          >
            World's Most Trusted Medical Travel Assistance Platform
          </motion.p>

          <motion.div className="flex items-center gap-3 justify-center md:justify-start mt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full bg-white/90 border-2 border-white"></div>
              <div className="w-10 h-10 rounded-full bg-white/90 border-2 border-white"></div>
              <div className="w-10 h-10 rounded-full bg-white/90 border-2 border-white"></div>
            </div>
            <div className="text-white text-sm">
              <div className="font-bold">1,000,000+ Patients Assisted Since 2010</div>
              <div className="flex items-center mt-1">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-white">4.7</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link href="/consultation">
              <Button size="lg" className="rounded-full px-8 text-base h-12 shadow-lg shadow-primary/20 bg-white text-blue-600 hover:bg-gray-100">
                Book Consultation
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Hero Form */}
        <motion.div
          className="hero-image flex-1 relative pt-8 md:pt-0"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="relative z-0 mx-auto max-w-[450px]">
            <div className="absolute -inset-1 bg-white/20 rounded-2xl blur-xl opacity-70"></div>
            <div className="bg-white backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl overflow-hidden p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Let Us Help You</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-700"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-700"
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    className="w-1/4 px-2 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-700"
                  >
                    <option value="+91">+91</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                  </select>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-3/4 px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-700"
                    required
                  />
                </div>
                <div>
                  <select
                    name="treatment"
                    value={formData.treatment}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-700"
                    required
                  >
                    <option value="" disabled>Select City</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Chennai">Chennai</option>
                  </select>
                </div>
                <Button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg flex items-center justify-center transition-colors duration-200"
                >
                  Get FREE Consultation
                </Button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div className="absolute bottom-10 left-1/2 transform -translate-x-1/2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 2 }}>
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-white">Scroll Down</p>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div className="w-1.5 h-1.5 bg-white rounded-full mt-1" animate={{ y: [0, 14, 0] }} transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }} />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;




