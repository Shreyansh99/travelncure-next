"use client"; // Mark the component as a client component

import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Heart, Guitar as Hospital, ChevronFirst as FirstAid, Brain, Eye, Bluetooth as Tooth, Heart as Cardiology, Bone, Microscope, Baby, Syringe } from 'lucide-react';

const Services = () => {
  return (
    <div>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Medical Departments</h2>
            <p className="text-xl text-gray-600">Specialized care across multiple medical disciplines</p>
          </motion.div>

          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
            {[
              {
                icon: <Brain className="h-6 w-6" />,
                title: "Neurology",
                procedures: "Brain Surgery, Spine Treatment"
              },
              {
                icon: <Eye className="h-6 w-6" />,
                title: "Ophthalmology",
                procedures: "LASIK, Cataract Surgery"
              },
              {
                icon: <Tooth className="h-6 w-6" />,
                title: "Dental",
                procedures: "Implants, Cosmetic Dentistry"
              },
              {
                icon: <Cardiology className="h-6 w-6" />,
                title: "Cardiology",
                procedures: "Heart Surgery, Treatments"
              },
              {
                icon: <Bone className="h-6 w-6" />,
                title: "Orthopedics",
                procedures: "Joint Replacement, Sports Medicine"
              },
              {
                icon: <Microscope className="h-6 w-6" />,
                title: "Oncology",
                procedures: "Cancer Treatment, Therapy"
              },
              {
                icon: <Baby className="h-6 w-6" />,
                title: "Pediatrics",
                procedures: "Child Healthcare, Vaccinations"
              },
              {
                icon: <Syringe className="h-6 w-6" />,
                title: "Cosmetic",
                procedures: "Plastic Surgery, Aesthetics"
              }
            ].map((department, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="text-blue-600 group-hover:text-blue-700 transition-colors mb-4">
                  {department.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{department.title}</h3>
                <p className="text-sm text-gray-600">{department.procedures}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;