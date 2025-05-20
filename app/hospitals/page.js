'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';
import axios from 'axios';

const Hospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/admin/hospitals');
        setHospitals(res.data);
      } catch (error) {
        console.error('Error fetching hospitals:', error);
      }
    };

    fetchHospitals();
  }, []);

  const handleHospitalClick = (slug) => {
    router.push(`/hospitals/${slug}`);
  };

  return (
    <div className="container mt-2 mx-auto py-10 p-3">
      <h1 className="text-3xl font-semibold mb-8 text-center">Explore Hospitals</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {hospitals.map((hospital) => (
          <Card
            key={hospital._id}
            className="shadow-md shadow-blue-500/50 cursor-pointer hover:scale-105 transition-all"
            onClick={() => handleHospitalClick(hospital.slug)}
          >
            <CardHeader>
              <CardTitle className="text-lg text-center">{hospital.name}</CardTitle>
              <CardDescription className="text-md text-center">
                {hospital.location || 'Location not specified'}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col justify-center items-center">
              {hospital.images?.length > 0 ? (
                <Image
                  src={hospital.images[0]}
                  alt={hospital.name}
                  width={320}
                  height={200}
                  style={{ objectFit: "cover" }}
                  className="rounded-md"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/hospital-placeholder.jpg"; // Fallback image
                  }}
                />
              ) : (
                <div className="w-[320px] h-[200px] bg-gray-200 rounded-md flex items-center justify-center">
                  <span className="text-gray-500">No image available</span>
                </div>
              )}
              <p className="mb-4 text-center">{hospital.metaDescription}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Hospitals;
