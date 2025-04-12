"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-blue-600 text-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 mx-auto w-auto px-5">
          <div className="flex flex-col">
            <h3 className="text-xl font-bold mb-4">TravelCure</h3>
            <p className="text-blue-100 w-2/3">
              Your trusted partner in medical tourism, combining world-class
              healthcare with exceptional travel experiences.
            </p>
          </div>

          <div className="pl-20">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/hospitals"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  Hospitals
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>+91 99273 28682</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>deepak.rajput@dcodepro.com</span>
              </li>
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Dharampur, Dehradun, Uttarakhand, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-400 mt-8 pt-8 text-center">
          <p className="text-blue-100">
            &copy; {currentYear} TravelNCure. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;