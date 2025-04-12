import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { hospitals } from '../../constants/hospitals.js';
import Image from 'next/image'; // Import Next.js Image component

const Hospitals = () => {
  return (
    <div className="container mt-2 mx-auto py-30 p-3">
      <h1 className="text-3xl font-semibold mb-8 text-center">Explore Hospitals</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {hospitals.map((hospital) => (
          <Card key={hospital.id} className="shadow-md shadow-blue-500/50">
            <CardHeader>
              <CardTitle className="text-lg text-center">{hospital.name}</CardTitle>
              <CardDescription className="text-md text-center">{hospital.location}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col justify-center items-center">
              <Image // Replace img with Next.js Image
                src={hospital.image}
                alt={hospital.name}
                className="mb-4 rounded-md"
                width={320} // Adjusted width for responsiveness
                height={200} // Adjusted height for responsiveness
                responsive // Make the image responsive
                style={{ objectFit: "cover" }} // Maintain aspect ratio and cover container
              />
              <p className="mb-4 text-center">{hospital.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Hospitals;