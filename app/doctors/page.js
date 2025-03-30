import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { doctors } from '../../constants/doctors';
import Image from 'next/image'; // Import Next.js Image component

const Doctors = () => {
  return (
    <div className="container mt-10 mx-auto py-16">
      <h1 className="text-3xl font-semibold mb-8 text-center">Our Doctors</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {doctors.map((doctor) => (
          <Card key={doctor.id} className="shadow-md shadow-blue-500/50">
            <CardHeader>
              <CardTitle className="text-lg text-center">{doctor.name}</CardTitle>
              <CardDescription className="text-md text-center">{doctor.specialization}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col justify-center items-center">
              <Image // Replace img with Next.js Image
                src={doctor.image}
                alt={doctor.name}
                className="mb-4 rounded-md"
                width={160} // Adjusted width for responsiveness
                height={200} // Adjusted height for responsiveness
                layout="responsive" // Make the image responsive
                style={{ objectFit: "cover" }} // Maintain aspect ratio and cover container
              />
              <p className="mb-4 text-center">{doctor.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Doctors;