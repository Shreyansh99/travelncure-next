"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, Search } from "lucide-react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Hospitals", to: "/hospitals" },
    { name: "Doctors", to: "/doctors" },
    { name: "Knowledge", to: "/blogs" },
    { name: "Patient Stories", to: "/about" },
    { name: "HNI Consult", to: "/contact" },
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
      <div className="container max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-2xl font-display font-bold text-white">
              Vaidam.com
            </span>
            <span className="text-xs text-white/80">Get Expert Guidance</span>
          </motion.div>
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="search"
              className="block w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search for hospitals, treatments..."
            />
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          {/* Nav Links */}
          <div className="flex items-center space-x-1">
            {navLinks.map((link, i) => (
              <Link key={link.name} href={link.to}>
                <motion.div
                  className="px-3 py-2 text-sm font-medium text-white hover:bg-white/10 rounded transition-colors"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
                >
                  {link.name}
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Get a FREE quote button */}
          <div className="ml-4">
            <Link href="/consultation">
              <motion.div
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded transition-colors"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Get a FREE quote
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
              className="fixed inset-0 bg-white md:hidden flex flex-col pt-20 px-6"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {/* Search in Mobile */}
              <div className="mb-6">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="search"
                    className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search for hospitals, treatments..."
                  />
                </div>
              </div>

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

                {/* Get a FREE quote button */}
                <div className="mt-4">
                  <Link href="/consultation">
                    <div
                      className="px-4 py-3 bg-red-500 text-white text-base font-medium rounded-lg text-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Get a FREE quote
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
