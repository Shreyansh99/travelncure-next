import { Metadata } from 'next';
import axios from 'axios';
import Image from 'next/image';

// Fetch hospital server-side
async function getHospital(slug) {
  const res = await axios.get(`http://localhost:8000/api/admin/hospitals/${slug}`);
  return res.data;
}

// SEO Metadata (dynamic per hospital)
export async function generateMetadata({ params }) {
  const hospital = await getHospital(params.slug);

  return {
    title: hospital.metaTitle || hospital.name,
    description: hospital.metaDescription,
    openGraph: {
      title: hospital.metaTitle || hospital.name,
      description: hospital.metaDescription,
      images: hospital.images?.length ? [hospital.images[0]] : [],
    },
  };
}

// Main Page Component
export default async function HospitalPage({ params }) {
  const hospital = await getHospital(params.slug);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-4">{hospital.name}</h1>

      <p className="text-center text-gray-600 mb-8">
        {hospital.location || "Location not available"}
      </p>

      {hospital.images?.length > 0 && (
        <div className="flex justify-center mb-8">
          <Image
            src={hospital.images[0]}
            alt={hospital.name}
            width={800}
            height={400}
            className="rounded-md shadow-lg"
            style={{ objectFit: "cover" }}
          />
        </div>
      )}

      <p className="text-lg text-gray-800 mb-8 text-center">{hospital.metaDescription}</p>

      {hospital.departments && hospital.departments.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Departments Available</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {hospital.departments.map((dept) => (
              <div
                key={dept}
                className="bg-blue-50 p-3 rounded-md text-center text-sm font-medium shadow-md hover:bg-blue-100 transition"
              >
                {dept.split('_').join(' ').toUpperCase()}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
