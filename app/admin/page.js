"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FileText, PlusCircle, Edit } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const AdminDashboardHomePage = () => {
  // To Check if motion is defined in the browser (client-side)
  useEffect(() => {
    if (typeof window !== "undefined" && !motion) {
      console.error("Framer Motion is not correctly initialized or available.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto flex items-center justify-between px-8">
          <div className="flex items-center gap-2">
            {/* Replace with your website logo */}
            <span className="text-xl font-bold text-teal-600">
              Travel N Cure
            </span>
          </div>
          <h1 className="text-2xl font-semibold text-teal-600">
            Admin Dashboard
          </h1>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="container mx-auto py-10 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* View Patient Records Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-center
                       transition-all duration-300 hover:bg-teal-50 hover:shadow-xl hover:border-teal-500/50
                       border border-transparent"
          >
            <Link href="/admin/patientRecord">
              <Button
                variant="outline"
                className={cn(
                  "w-full h-full flex flex-col items-center justify-center gap-2",
                  "text-gray-800 hover:text-teal-600",
                  "border-teal-500/50 hover:border-teal-500",
                  "bg-transparent hover:bg-teal-50",
                  "rounded-lg transition-colors duration-300",
                  "shadow-md hover:shadow-lg"
                )}
              >
                <FileText className="w-8 h-8" />
                <span className="text-lg font-medium">
                  View Patient Records
                </span>
              </Button>
            </Link>
          </motion.div>

          {/* Add Hospitals Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-center
                       transition-all duration-300 hover:bg-teal-50 hover:shadow-xl hover:border-teal-500/50
                       border border-transparent"
          >
            <Link href="/admin/hospital">
              <Button
                variant="outline"
                className={cn(
                  "w-full h-full flex flex-col items-center justify-center gap-2",
                  "text-gray-800 hover:text-teal-600",
                  "border-teal-500/50 hover:border-teal-500",
                  "bg-transparent hover:bg-teal-50",
                  "rounded-lg transition-colors duration-300",
                  "shadow-md hover:shadow-lg"
                )}
              >
                <PlusCircle className="w-8 h-8" />
                <span className="text-lg font-medium">Add Hospitals</span>
              </Button>
            </Link>
          </motion.div>

          {/* Add Doctors Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-center
                       transition-all duration-300 hover:bg-teal-50 hover:shadow-xl hover:border-teal-500/50
                       border border-transparent"
          >
            <Link href="/admin/doctor">
              <Button
                variant="outline"
                className={cn(
                  "w-full h-full flex flex-col items-center justify-center gap-2",
                  "text-gray-800 hover:text-teal-600",
                  "border-teal-500/50 hover:border-teal-500",
                  "bg-transparent hover:bg-teal-50",
                  "rounded-lg transition-colors duration-300",
                  "shadow-md hover:shadow-lg"
                )}
              >
                <PlusCircle className="w-8 h-8" />
                <span className="text-lg font-medium">Add Doctors</span>
              </Button>
            </Link>
          </motion.div>

          {/* Write Blogs Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-center
                       transition-all duration-300 hover:bg-teal-50 hover:shadow-xl hover:border-teal-500/50
                       border border-transparent"
          >
            <Link href="/admin/blog">
              <Button
                variant="outline"
                className={cn(
                  "w-full h-full flex flex-col items-center justify-center gap-2",
                  "text-gray-800 hover:text-teal-600",
                  "border-teal-500/50 hover:border-teal-500",
                  "bg-transparent hover:bg-teal-50",
                  "rounded-lg transition-colors duration-300",
                  "shadow-md hover:shadow-lg"
                )}
              >
                <Edit className="w-8 h-8" />
                <span className="text-lg font-medium">Write Blogs</span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardHomePage;
