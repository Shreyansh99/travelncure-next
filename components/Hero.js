"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";
import bgimg from "@/assets/landing.jpg";
import heroVideo from "@/assets/intro.mp4";

const Hero = () => {
  const heroRef = useRef(null);
  const isMobile = useIsMobile();

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      
      const scrollY = window.scrollY;
      const heroImage = heroRef.current.querySelector(".hero-image");
      const heroContent = heroRef.current.querySelector(".hero-content");
      
      if (heroImage) {
        heroImage.style.transform = `translateY(${scrollY * 0.2}px)`;
      }
      
      if (heroContent) {
        heroContent.style.transform = `translateY(${scrollY * 0.1}px)`;
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <Image
          src={bgimg}
          alt="Medical background"
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E67A8]/70 to-[#071E3F]/70"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center gap-12 md:gap-8">
        {/* Hero Content */}
        <motion.div 
          className="hero-content flex-1 text-center md:text-left space-y-6 pt-16 md:pt-20 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight tracking-tight">
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="block">
              Your Health,
            </motion.span>
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="block text-[#64B5F6]">
              Our Priority
            </motion.span>
          </h1>
          
          <motion.p className="text-lg md:text-xl text-white/80 max-w-xl mx-auto md:mx-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Find the best medical treatments and destinations worldwide. We provide expert guidance for your healthcare journey.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link href="/consultation">
              <Button size="lg" className="rounded-full px-8 text-base h-12 shadow-lg shadow-primary/20 bg-blue-600 hover:bg-[#1A5A91]">
                Book Consultation
              </Button>
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Hero Video */}
        <motion.div className="hero-image flex-1 relative pt-8 md:pt-0" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.5 }}>
          <div className="relative z-0 mx-auto max-w-[450px]">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#64B5F6]/20 to-white/20 rounded-3xl blur-xl opacity-70"></div>
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl overflow-hidden">
              <video 
                src={heroVideo}
                controls
                autoPlay
                muted
                loop
                className="w-full h-auto object-cover rounded-2xl shadow-lg shadow-black/30"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          
          {/* Floating Elements - Only show on desktop */}
          {!isMobile && (
            <motion.div className="absolute -bottom-6 -left-6 p-4 bg-white/10 backdrop-blur-md rounded-xl shadow-lg max-w-[180px]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.4 }}>
              <p className="text-sm font-medium text-white">100+ Happy Patients</p>
              <div className="flex -space-x-2 mt-2">
                <div className="w-8 h-8 rounded-full bg-[#64B5F6]"></div>
                <div className="w-8 h-8 rounded-full bg-[#1E67A8]"></div>
                <div className="w-8 h-8 rounded-full bg-[#90CAF9]"></div>
                <div className="w-8 h-8 rounded-full bg-white text-xs flex items-center justify-center">+97</div>
              </div>
            </motion.div>
          )}
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
