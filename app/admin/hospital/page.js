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
import {
  Plus,
  ImagePlus,
  User,
  CheckCircle,
  XCircle,
  ArrowLeft,
} from "lucide-react";
import { motion } from "framer-motion";

const AddHospitalPage = () => {
  const [hospitalName, setHospitalName] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState("");
  const [isActive, setIsActive] = useState("");
  const [images, setImages] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [newTreatmentName, setNewTreatmentName] = useState("");
  const [newDoctorName, setNewDoctorName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState("idle");
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [timestamp, setTimestamp] = useState(""); // Added timestamp state

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

  // Function to add a treatment to the list
  const handleAddTreatment = () => {
    if (newTreatmentName.trim() !== "") {
      const newTreatment = {
        id: `treatment-${Date.now()}`, // Simple ID generation
        name: newTreatmentName,
      };
      setTreatments([...treatments, newTreatment]);
      setNewTreatmentName(""); // Clear the input
    }
  };

  // Function to remove a treatment from the list
  const handleRemoveTreatment = (id) => {
    setTreatments(treatments.filter((treatment) => treatment.id !== id));
  };

  // Function to add a doctor to the list
  const handleAddDoctor = () => {
    if (newDoctorName.trim() !== "") {
      const newDoctor = {
        id: `doctor-${Date.now()}`, // Simple ID generation
        name: newDoctorName,
      };
      setDoctors([...doctors, newDoctor]);
      setNewDoctorName(""); // Clear the input
    }
  };

  // Function to remove a doctor from the list
  const handleRemoveDoctor = (id) => {
    setDoctors(doctors.filter((doctor) => doctor.id !== id));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus("idle");
    setSubmissionMessage("");

    // Basic validation
    if (!hospitalName || !location || !rating || !isActive) {
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

    // Simulate an API call (replace with your actual API endpoint)
    try {
      // Construct the data object to send
      const hospitalData = {
        hospitalName,
        location,
        rating,
        isActive,
        images,
        treatments,
        doctors,
        timestamp: formattedTimestamp, // Include timestamp in data
      };

      console.log("Hospital Data:", hospitalData);

      // Simulate a network request (replace with your actual fetch or axios call)
      // await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate 2-second delay

      // In a real application, you would send this data to your backend API:
      // const response = await fetch('/api/hospitals', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(hospitalData),
      // });
      // if (!response.ok) {
      //   throw new Error('Failed to add hospital');
      // }

      // Reset the form
      setHospitalName("");
      setLocation("");
      setRating("");
      setIsActive("");
      setImages([]);
      setTreatments([]);
      setDoctors([]);
      setSubmissionStatus("success");
      setSubmissionMessage("Hospital data logged to console.");
    } catch (error) {
      setSubmissionStatus("error");
      setSubmissionMessage(
        `Failed to process hospital data: ${
          error.message || "An error occurred."
        }`
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
        <h1 className="text-3xl font-bold text-gray-800">Add Hospital</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Hospital Name */}
        <div>
          <Label
            htmlFor="hospitalName"
            className="block text-sm font-medium text-gray-700"
          >
            Hospital Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="hospitalName"
            type="text"
            value={hospitalName}
            onChange={(e) => setHospitalName(e.target.value)}
            className="mt-1"
            placeholder="Enter hospital name"
            required
          />
        </div>

        {/* Location */}
        <div>
          <Label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location <span className="text-red-500">*</span>
          </Label>
          <Input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1"
            placeholder="Enter location"
            required
          />
        </div>

        {/* Rating */}
        <div>
          <Label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-700"
          >
            Rating (out of 5) <span className="text-red-500">*</span>
          </Label>
          <Select onValueChange={(value) => setRating(value)} value={rating}>
            <SelectTrigger className="mt-1 w-full">
              <SelectValue placeholder="Select rating" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Is Active */}
        <div>
          <Label
            htmlFor="isActive"
            className="block text-sm font-medium text-gray-700"
          >
            Is Active <span className="text-red-500">*</span>
          </Label>
          <Select
            onValueChange={(value) => setIsActive(value === "true")}
            value={isActive}
          >
            <SelectTrigger className="mt-1 w-full">
              <SelectValue placeholder="Select active status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Yes</SelectItem>
              <SelectItem value="false">No</SelectItem>
            </SelectContent>
          </Select>
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
                  alt={`Hospital Preview ${index + 1}`}
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

        {/* Treatments */}
        <div>
          <Label className="block text-sm font-medium text-gray-700">
            Treatments
          </Label>
          <div className="mt-2 space-y-2">
            {treatments.map((treatment) => (
              <div key={treatment.id} className="flex items-center gap-2">
                <Input value={treatment.name} readOnly className="w-full" />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveTreatment(treatment.id)}
                  className="h-8 w-8 rounded-full bg-red-500/20 text-red-500 hover:bg-red-500/30"
                >
                  <XCircle className="h-5 w-5" />
                </Button>
              </div>
            ))}
            <div className="flex items-end gap-2">
              <Input
                type="text"
                placeholder="Treatment Name"
                value={newTreatmentName}
                onChange={(e) => setNewTreatmentName(e.target.value)}
                className="flex-1"
              />
              <Button
                type="button"
                onClick={handleAddTreatment}
                className="bg-teal-500 hover:bg-teal-600 text-white"
                disabled={!newTreatmentName.trim()}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Treatment
              </Button>
            </div>
          </div>
        </div>

        {/* Doctors */}
        <div>
          <Label className="block text-sm font-medium text-gray-700">
            Doctors
          </Label>
          <div className="mt-2 space-y-2">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="flex items-center gap-2">
                <Input value={doctor.name} readOnly className="w-full" />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveDoctor(doctor.id)}
                  className="h-8 w-8 rounded-full bg-red-500/20 text-red-500 hover:bg-red-500/30"
                >
                  <XCircle className="h-5 w-5" />
                </Button>
              </div>
            ))}
            <div className="flex items-end gap-2">
              <Input
                type="text"
                placeholder="Doctor Name"
                value={newDoctorName}
                onChange={(e) => setNewDoctorName(e.target.value)}
                className="flex-1"
              />
              <Button
                type="button"
                onClick={handleAddDoctor}
                className="bg-teal-500 hover:bg-teal-600 text-white"
                disabled={!newDoctorName.trim()}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Doctor
              </Button>
            </div>
          </div>
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
              Adding Hospital...
            </>
          ) : (
            "Add Hospital"
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

export default AddHospitalPage;
