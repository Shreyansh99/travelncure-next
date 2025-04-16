"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const pathname = usePathname(); // Get the current route
  const isAdminRoute = pathname.startsWith('/admin'); // Check for admin route

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Login", to: "/login" },
    { name: "Register", to: "/register" },
    { name: "Contact", to: "/contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 ease-in-out py-4",
        scrolled ? "bg-white/80 backdrop-blur-lg shadow-sm" : "bg-transparent",
        isAdminRoute ? "hidden" : "" // Add 'hidden' class for admin routes
      )}
    >
      
      <div className="container max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <motion.div
            className="text-2xl font-display font-bold tracking-tight z-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Travel n Cure
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 relative">
          {/* Explore Dropdown */}
          <div className="relative">
            <button
              className="text-md font-medium text-foreground/80 hover:text-primary transition-colors"
              onClick={() => setExploreOpen(!exploreOpen)}
            >
              Explore
            </button>
            {exploreOpen && (
              <motion.div
              className="absolute left-0 mt-2 bg-white rounded-md shadow-lg p-4 w-48 z-10"
              initial={{ opacity: 0, y: -10 }}
              animate={exploreOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={{ display: exploreOpen ? "block" : "none" }}
            >
              <Link href="/hospitals">
                <div className="text-md font-medium text-foreground/80 hover:text-primary transition-colors py-2">
                  Hospitals
                </div>
              </Link>
              <Link href="/doctors">
                <div className="text-md font-medium text-foreground/80 hover:text-primary transition-colors py-2">
                  Doctors
                </div>
              </Link>
            </motion.div>
            
            )}
          </div>
          
          {navLinks.map((link, i) => (
            <Link key={link.name} href={link.to}>
              <motion.div
                className="text-md font-medium text-foreground/80 hover:text-primary transition-colors"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              >
                {link.name}
              </motion.div>
            </Link>
          ))}

          
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden z-10">
          <button
            className="p-2 text-foreground focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span
                className={cn(
                  "block h-0.5 bg-current transition-all duration-300 ease-in-out",
                  mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                )}
              />
              <span
                className={cn(
                  "block h-0.5 bg-current transition-all duration-300 ease-in-out",
                  mobileMenuOpen ? "opacity-0" : "opacity-100"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 bg-current transition-all duration-300 ease-in-out",
                  mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                )}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-lg md:hidden transition-all duration-300 ease-in-out flex flex-col justify-center items-center gap-8",
            mobileMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          {navLinks.map((link) => (
            <Link key={link.name} href={link.to}>
              <div
                className="text-xl font-medium hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </div>
            </Link>
          ))}
          <div className="relative">
            <button
              className="text-xl font-medium hover:text-primary transition-colors"
              onClick={() => {
                setExploreOpen(!exploreOpen);
                setMobileMenuOpen(false); // Close mobile menu when explore is opened
              }}
            >
              Explore
            </button>
            {exploreOpen && (
              <div className="absolute left-0 mt-2 bg-white rounded-md shadow-lg p-4 w-48 z-10">
                <Link href="/hospitals">
                  <div className="text-md font-medium text-foreground/80 hover:text-primary transition-colors py-2">
                    Hospitals
                  </div>
                </Link>
                <Link href="/doctors">
                  <div className="text-md font-medium text-foreground/80 hover:text-primary transition-colors py-2">
                    Doctors
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;