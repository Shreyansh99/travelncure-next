"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle, XCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const AddDoctorPage = () => {
  const [doctorName, setDoctorName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [images, setImages] = useState([]);
  const [hospital, setHospital] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState("idle");
  const [submissionMessage, setSubmissionMessage] = useState("");

  // Dummy list of hospitals (for testing, to be removed on API Calls)
  const hospitals = [
    { id: "h1", name: "Apollo Hospital" },
    { id: "h2", name: "MAX Hospital" },
    { id: "h3", name: "City Hospital Delhi" },
  ];

  // Function to handle image selection
  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files) {
      const newImages = [];
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            newImages.push(event.target.result);
            if (newImages.length === files.length) {
              setImages((prevImages) => [...prevImages, ...newImages]);
            }
          }
        };
        reader.readAsDataURL(files[i]);
      }
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus("idle");
    setSubmissionMessage("");

    // Basic validation
    if (!doctorName || !specialization || !experience || !hospital) {
      setSubmissionStatus("error");
      setSubmissionMessage("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    if (images.length === 0) {
      setSubmissionStatus("error");
      setSubmissionMessage("Please upload at least one image.");
      setIsSubmitting(false);
      return;
    }

    // Set timestamp
    const now = new Date();
    const formattedTimestamp = now.toLocaleString();
    setTimestamp(formattedTimestamp);

    const doctorData = {
      doctorName,
      specialization,
      experience,
      images,
      hospital,
      timestamp: formattedTimestamp,
    };

    console.log("Doctor Data:", doctorData);

    try {
      // Simulate an API call (replace with your actual API endpoint)
      // await new Promise((resolve) => setTimeout(resolve, 2000));

      // Reset the form
      setDoctorName("");
      setSpecialization("");
      setExperience("");
      setImages([]);
      setHospital("");
      setSubmissionStatus("success");
      setSubmissionMessage("Doctor added successfully!");
    } catch (error) {
      setSubmissionStatus("error");
      setSubmissionMessage(
        `Failed to add doctor: ${error.message || "An error occurred."}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-8 my-15 w-[60%] border border-teal-400 shadow-sm shadow-teal-400">
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="outline"
          onClick={() => {
            window.location.href = "/admin";
          }}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
        <h1 className="text-3xl font-bold text-gray-800">Add Doctor</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Doctor Name */}
        <div>
          <Label
            htmlFor="doctorName"
            className="block text-sm font-medium text-gray-700"
          >
            Doctor Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="doctorName"
            type="text"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            className="mt-1"
            placeholder="Enter doctor name"
            required
          />
        </div>

        {/* Specialization */}
        <div>
          <Label
            htmlFor="specialization"
            className="block text-sm font-medium text-gray-700"
          >
            Specialization <span className="text-red-500">*</span>
          </Label>
          <Input
            id="specialization"
            type="text"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            className="mt-1"
            placeholder="Enter specialization"
            required
          />
        </div>

        {/* Experience */}
        <div>
          <Label
            htmlFor="experience"
            className="block text-sm font-medium text-gray-700"
          >
            Experience (Years) <span className="text-red-500">*</span>
          </Label>
          <Input
            id="experience"
            type="number"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="mt-1"
            placeholder="Enter experience"
            required
          />
        </div>

        {/* Images */}
        <div>
          <Label
            htmlFor="images"
            className="block text-sm font-medium text-gray-700"
          >
            Images <span className="text-red-500">*</span>
          </Label>
          <Input
            id="images"
            type="file"
            multiple
            onChange={handleImageChange}
            className="mt-1"
            accept="image/*"
            required
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Doctor Preview ${index + 1}`}
                  className="h-20 w-20 rounded-md object-cover"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setImages(images.filter((_, i) => i !== index))
                  }
                  className="absolute top-0 right-0 h-5 w-5 rounded-full bg-black/50 text-white hover:bg-red-500"
                >
                  <XCircle className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Hospital Association */}
        <div>
          <Label
            htmlFor="hospital"
            className="block text-sm font-medium text-gray-700"
          >
            Hospital <span className="text-red-500">*</span>
          </Label>
          <Select
            onValueChange={(value) => setHospital(value)}
            value={hospital}
          >
            <SelectTrigger className="mt-1 w-full">
              <SelectValue placeholder="Select hospital" />
            </SelectTrigger>
            <SelectContent>
              {hospitals.map((h) => (
                <SelectItem key={h.id} value={h.id}>
                  {h.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Timestamp Display */}
        {timestamp && (
          <div>
            <Label className="block text-sm font-medium text-gray-700">
              Timestamp
            </Label>
            <Input
              type="text"
              value={timestamp}
              readOnly
              className="mt-1 bg-gray-100 text-gray-600"
            />
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          className="bg-teal-600 hover:bg-teal-700 text-white w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Adding Doctor...
            </>
          ) : (
            "Add Doctor"
          )}
        </Button>

        {/* Submission Status Message */}
        {submissionStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <strong className="font-bold">Success!</strong>
            </div>
            <span className="block sm:inline">{submissionMessage}</span>
          </motion.div>
        )}
        {submissionStatus === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-500" />
              <strong className="font-bold">Error!</strong>
            </div>
            <span className="block sm:inline">{submissionMessage}</span>
          </motion.div>
        )}
      </form>
    </div>
  );
};

export default AddDoctorPage;
