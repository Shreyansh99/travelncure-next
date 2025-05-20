"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { departments, treatments } from "@/constants/departments";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Brain, Heart, Activity, Bone, Beaker, Baby, Stethoscope, Scissors, Leaf, Pill, Dna, Microscope, Eye, CheckCircle2 } from 'lucide-react';

const BookConsultation = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [medicalReports, setMedicalReports] = useState(null);
  const [medicalCondition, setMedicalCondition] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Check authentication status when component mounts
  // useEffect(() => {
  //   const checkAuthStatus = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://medical-tourism-lqcu.onrender.com/api/patient/check-auth",
  //         { withCredentials: true }
  //       );
  //       setIsLoggedIn(true);
  //     } catch (error) {
  //       setIsLoggedIn(false);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   checkAuthStatus();
  // }, []);

  const handleDepartmentClick = (department) => {
    // Smooth scroll to treatments section when department is selected
    setSelectedDepartment(department);
    setSelectedTreatment(null);

    // Add smooth scrolling to the treatments section after a short delay
    setTimeout(() => {
      const treatmentsSection = document.querySelector('.treatments-section');
      if (treatmentsSection) {
        treatmentsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedTreatment(subcategory);

    // Add smooth scrolling to the consultation form after a short delay
    setTimeout(() => {
      const formSection = document.querySelector('.consultation-form');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 10 * 1024 * 1024) {
      setMessage("File size should be less than 10MB");
      return;
    }
    setMedicalReports(file);
    setMessage("");
  };

  const handleSubmit = async () => {
    if (!selectedDepartment || !selectedTreatment) {
      setMessage("Please select a department and treatment.");
      return;
    }

    if (!medicalCondition.trim()) {
      setMessage("Please provide a brief description of your medical condition.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("department", selectedDepartment);
      formData.append("treatment", selectedTreatment);
      formData.append("medicalHistory", medicalCondition);
      if (medicalReports) {
        formData.append("medicalDocument", medicalReports);
      }

      const response = await axios.post(
        "https://medical-tourism-lqcu.onrender.com/api/patient/consultation",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      setMessage("Consultation request submitted successfully!");
      toast.success("Consultation request submitted!");
      setShowConfirmation(true);

      setSelectedDepartment(null);
      setSelectedTreatment(null);
      setMedicalCondition("");
      setMedicalReports(null);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
      setMessage(errorMessage);
      toast.error(errorMessage);
    }

    setLoading(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="mb-4">Loading...</p>
        </div>
      </div>
    );
  }

  // Define department icons
  const departmentIcons = {
    "Neurology": <Brain className="h-10 w-10" />,
    "Ophthalmology": <Eye className="h-10 w-10" />,
    "Dental": <Pill className="h-10 w-10" />,
    "Cardiology": <Heart className="h-10 w-10" />,
    "Orthopedics": <Bone className="h-10 w-10" />,
    "Oncology": <Microscope className="h-10 w-10" />,
    "Pediatrics": <Baby className="h-10 w-10" />,
    "Cosmetic": <Scissors className="h-10 w-10" />,
    "Spine Surgery": <Dna className="h-10 w-10" />,
    "Weight Loss": <Activity className="h-10 w-10" />,
    "IVF": <Beaker className="h-10 w-10" />,
    "Liver Transplant": <Leaf className="h-10 w-10" />
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto py-10 px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4 text-blue-900"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Book Your Medical Consultation
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Get expert medical advice from top specialists around the world
            </motion.p>
          </div>

          {/* Alert Message */}
          {message && (
            <motion.div
              className={`p-4 mb-6 rounded-md text-center ${message.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {message}
            </motion.div>
          )}

          {/* Steps Indicator */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center">
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${!selectedDepartment ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'}`}
                whileHover={{ scale: 1.1 }}
              >
                1
              </motion.div>
              <div className={`w-16 h-1 ${!selectedTreatment ? 'bg-gray-300' : 'bg-blue-600'}`}></div>
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedDepartment && !selectedTreatment ? 'bg-blue-600 text-white' : selectedTreatment ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-600'}`}
                whileHover={{ scale: 1.1 }}
              >
                2
              </motion.div>
              <div className={`w-16 h-1 ${!selectedTreatment ? 'bg-gray-300' : 'bg-blue-600'}`}></div>
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedTreatment ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                whileHover={{ scale: 1.1 }}
              >
                3
              </motion.div>
            </div>
          </div>

          {/* Departments Section */}
          <motion.div
            className="py-10 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-xl mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-8 text-center">Select Medical Department</h2>

            <motion.div
              className="flex flex-wrap justify-center gap-6 px-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {departments.map((dept, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover="hover"
                  className={`flex flex-col items-center justify-center w-[130px] h-[130px] p-4 bg-white/10 backdrop-blur-md rounded-xl cursor-pointer transition-all ${
                    selectedDepartment === dept.title ? 'bg-white/30 ring-2 ring-white' : 'hover:bg-white/20'
                  }`}
                  onClick={() => handleDepartmentClick(dept.title)}
                >
                  <div className={`p-3 rounded-full mb-2 ${selectedDepartment === dept.title ? 'bg-white text-blue-600' : 'bg-white/20'}`}>
                    {departmentIcons[dept.title] || <Stethoscope className="h-8 w-8" />}
                  </div>
                  <span className="text-sm font-medium text-center">{dept.title}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Treatments Section */}
          {selectedDepartment && (
            <motion.div
              className="mt-8 bg-white rounded-xl shadow-lg p-8 treatments-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Select Treatment for <span className="text-blue-600">{selectedDepartment}</span>
              </h2>

              <motion.div
                className="flex flex-wrap gap-4 justify-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {treatments[selectedDepartment]?.map((subcategory, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover="hover"
                    className={`flex flex-col items-center justify-center w-[180px] h-[120px] p-4 border rounded-xl shadow-sm cursor-pointer text-center transition-all ${
                      selectedTreatment === subcategory
                        ? "bg-blue-50 border-blue-400 shadow-md"
                        : "bg-white hover:bg-gray-50 border-gray-200"
                    }`}
                    onClick={() => handleSubcategoryClick(subcategory)}
                  >
                    {selectedTreatment === subcategory && (
                      <CheckCircle2 className="h-5 w-5 text-green-500 mb-1" />
                    )}
                    <span className="text-md font-medium text-gray-800">{subcategory}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Consultation Form */}
          {selectedTreatment && (
            <motion.div
              className="my-8 mx-auto max-w-2xl bg-white p-8 rounded-xl shadow-lg border border-gray-100 consultation-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-100 rounded-full mr-4">
                  {departmentIcons[selectedDepartment] || <Stethoscope className="h-6 w-6 text-blue-600" />}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedTreatment}</h2>
                  <p className="text-gray-600">{selectedDepartment} Department</p>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-blue-800 mb-2">What happens next?</h3>
                <p className="text-sm text-blue-700">
                  Our medical team will review your information and connect you with the best specialists for your condition.
                  You'll receive a detailed treatment plan and cost estimate within 48 hours.
                </p>
              </div>

              <div className="flex flex-col space-y-6">
                <div>
                  <Label htmlFor="reports" className="text-lg font-medium text-gray-700 mb-2 block">Upload Medical Reports (PDF)</Label>
                  <Input
                    type="file"
                    id="reports"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="cursor-pointer border-2 border-gray-300 rounded-lg p-3 hover:border-blue-400 transition-colors"
                  />
                  <p className="text-sm text-gray-500 mt-1">Maximum file size: 10MB</p>
                </div>

                <div>
                  <Label htmlFor="condition" className="text-lg font-medium text-gray-700 mb-2 block">Brief Medical Condition</Label>
                  <textarea
                    id="condition"
                    className="w-full p-4 border-2 border-gray-300 rounded-lg min-h-[150px] focus:border-blue-400 focus:ring-blue-400 transition-colors"
                    value={medicalCondition}
                    onChange={(e) => setMedicalCondition(e.target.value)}
                    placeholder="Please describe your condition, symptoms, and any relevant medical history..."
                  />
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>Submit Consultation Request</>
                    )}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}

        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <motion.div
              className="mx-auto mb-4 bg-green-100 p-3 rounded-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </motion.div>
            <DialogTitle className="text-xl text-center">Consultation Request Submitted</DialogTitle>
            <DialogDescription className="text-center">
              <p className="mb-4 text-gray-600">Thanks for submitting your consultation request! Our medical team will review your information and get back to you within 24-48 hours.</p>
              <p className="text-gray-600">You can track the status of your consultation in your patient dashboard.</p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => router.push("/")}
                className="bg-blue-600 hover:bg-blue-700 px-8 py-2 rounded-full"
              >
                Return to Home
              </Button>
            </motion.div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookConsultation;