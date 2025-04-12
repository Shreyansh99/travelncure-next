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
    setSelectedDepartment(department);
    setSelectedTreatment(null);
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedTreatment(subcategory);
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

  return (
    <>
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-semibold mb-8 text-center">Book a Consultation</h1>
        {message && (
          <div className={`p-4 mb-6 rounded-md text-center ${message.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {message}
          </div>
        )}

        <div className="py-8 flex flex-col items-center bg-[#071e3f] text-white rounded-lg">
          <h2 className="text-2xl font-semibold mb-6 uppercase">Departments</h2>
          <div className="flex flex-wrap justify-center gap-6 px-4">
            {departments.map((dept, index) => (
              <div
                key={index}
                className={`flex flex-col items-center justify-center w-[150px] h-[150px] p-4 border rounded-full shadow cursor-pointer transition-all ${
                  selectedDepartment === dept.name ? "border-blue-400 bg-blue-900" : "hover:bg-blue-900/50"
                }`}
                onClick={() => handleDepartmentClick(dept.name)}
              >
                <img src={dept.icon} alt={dept.name} className="mb-2" />
                <span className="text-md font-medium text-center">{dept.name}</span>
              </div>
            ))}
          </div>
        </div>

        {selectedDepartment && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Treatments under {selectedDepartment}
            </h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {treatments[selectedDepartment]?.map((subcategory, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center justify-center w-[150px] h-[150px] p-4 border rounded-full shadow-md cursor-pointer text-center transition-all ${
                    selectedTreatment === subcategory ? "bg-blue-200 border-blue-400" : "bg-amber-50 hover:bg-amber-100"
                  }`}
                  onClick={() => handleSubcategoryClick(subcategory)}
                >
                  <span className="text-md font-medium">{subcategory}</span>
                </div>
              ))}
            </div>

            {selectedTreatment && (
              <div className="my-8 mx-auto max-w-md bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">{selectedTreatment}</h2>

                <div className="flex flex-col space-y-4">
                  <div>
                    <Label htmlFor="reports" className="mb-2 block">Upload Medical Reports (PDF)</Label>
                    <Input
                      type="file"
                      id="reports"
                      accept="application/pdf"
                      onChange={handleFileChange}
                      className="cursor-pointer"
                    />
                    <p className="text-xs text-gray-500 mt-1">Maximum file size: 10MB</p>
                  </div>

                  <div>
                    <Label htmlFor="condition" className="mb-2 block">Brief Medical Condition</Label>
                    <textarea
                      id="condition"
                      className="w-full p-2 border rounded-md min-h-[120px]"
                      value={medicalCondition}
                      onChange={(e) => setMedicalCondition(e.target.value)}
                      placeholder="Please describe your condition, symptoms, and any relevant medical history..."
                    />
                  </div>

                  <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 mt-4"
                  >
                    {loading ? "Submitting..." : "Submit Consultation"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Consultation Request Submitted</DialogTitle>
              <DialogDescription>
                <p className="mb-4">Thanks for submitting your consultation request! Our medical team will review your information and get back to you within 24-48 hours.</p>
                <p>You can track the status of your consultation in your patient dashboard.</p>
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end">
              <Button onClick={() => router.push("/")}>Back</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default BookConsultation;