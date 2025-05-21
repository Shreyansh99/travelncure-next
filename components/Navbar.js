"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Hospitals", to: "/hospitals" },
    { name: "Doctors", to: "/doctors" },
    { name: "Medical Guides", to: "/blogs" },
    { name: "Contact Us", to: "/contact" },
  ];

  const authLinks = [
    { name: "Login", to: "/login" },
    { name: "Register", to: "/register" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 py-3 bg-[#0099ff] shadow-md",
        isAdminRoute && "hidden"
      )}
    >
      <div className="container max-w-7xl mx-auto px-4 flex items-center justify-between space-x-8">
        {/* Logo */}
        <Link href="/">
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/logo.png"
              alt="Healithon Logo"
              width={40}
              height={40}
              className="rounded-md"
            />
            <div className="flex flex-col">
              <span className="text-2xl font-display font-bold text-white">
                  Healithon
                </span>
                <span className="text-xs text-white/80">International Healthcare Experts</span>
            </div>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          {/* Nav Links */}
          <div className="flex items-center space-x-3">
            {navLinks.map((link, i) => (
              <Link key={link.name} href={link.to}>
                <motion.div
                  className="px-4 py-2 text-base font-medium text-white hover:bg-white/10 rounded transition-colors"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
                >
                  {link.name}
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Get a FREE Consultation button */}
          <div className="ml-4">
            <Link href="/consultation">
              <motion.div
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-base font-medium rounded transition-colors"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Get a FREE Consultation
              </motion.div>
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden z-10 flex items-center">
          <button
            className="p-2 rounded-full hover:bg-white/10 text-white focus:outline-none ml-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={mobileMenuOpen ? "close" : "menu"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="fixed inset-0 bg-white md:hidden flex flex-col pt-24 px-6"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="flex flex-col space-y-1">
                {/* Main Nav Links */}
                {navLinks.map((link) => (
                  <Link key={link.name} href={link.to}>
                    <div
                      className="px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </div>
                  </Link>
                ))}

                {/* Auth Links */}
                <div className="border-t border-gray-100 pt-4 mt-4">
                  {authLinks.map((link) => (
                    <Link key={link.name} href={link.to}>
                      <div
                        className={cn(
                          "px-4 py-3 my-2 text-base font-medium rounded-lg text-center transition-colors",
                          link.name === "Register"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700"
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.name}
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Get a FREE Consultation button */}
                <div className="mt-4">
                  <Link href="/consultation">
                    <div
                      className="px-4 py-3 bg-red-500 text-white text-base font-medium rounded-lg text-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Get a FREE Consultation
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
