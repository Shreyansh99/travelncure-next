"use client"; // Mark the component as a client component

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Heart, Activity, Bone, Beaker, Baby, Stethoscope, Scissors, Leaf, Pill, Dna, Microscope } from 'lucide-react';
import Link from 'next/link';

const Services = () => {
  const specialties = [
    {
      icon: <Brain className="h-8 w-8 text-blue-500" />,
      title: "Neurosurgery",
      description: "The complexity of neurosurgical care requires utmost skill and precision for patients."
    },
    {
      icon: <Heart className="h-8 w-8 text-blue-500" />,
      title: "Cardiology",
      description: "World class expertise for adults and children."
    },
    {
      icon: <Bone className="h-8 w-8 text-blue-500" />,
      title: "Orthopedics",
      description: "Expert solutions for joint and bone deformities solutions."
    },
    {
      icon: <Beaker className="h-8 w-8 text-blue-500" />,
      title: "IVF",
      description: "Leading fertility treatments with high success rates."
    },
    {
      icon: <Stethoscope className="h-8 w-8 text-blue-500" />,
      title: "Oncology",
      description: "Advanced cancer treatments with proven results."
    },
    {
      icon: <Scissors className="h-8 w-8 text-blue-500" />,
      title: "Cosmetic",
      description: "Aesthetic procedures for a new you."
    },
    {
      icon: <Pill className="h-8 w-8 text-blue-500" />,
      title: "Kidney Transplant",
      description: "Expert resources and transplants."
    },
    {
      icon: <Leaf className="h-8 w-8 text-blue-500" />,
      title: "Liver Transplant",
      description: "Liver transplant procedures of varying complexity."
    },
    {
      icon: <Baby className="h-8 w-8 text-blue-500" />,
      title: "Gynecology",
      description: "Excellent women's health services."
    },
    {
      icon: <Dna className="h-8 w-8 text-blue-500" />,
      title: "Spine Surgery",
      description: "Precision spine surgeries for better mobility."
    },
    {
      icon: <Activity className="h-8 w-8 text-blue-500" />,
      title: "Weight Loss",
      description: "Effective and safe weight loss options."
    },
    {
      icon: <Microscope className="h-8 w-8 text-blue-500" />,
      title: "Bone Marrow",
      description: "Bone marrow transplant options for numerous and non-malignant diseases."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Multi-Specialty Focus</h2>
          <p className="text-lg text-gray-600">We cover all medical needs, from hair transplants to heart transplants.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
          {specialties.map((specialty, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-4 group"
            >
              <div className="flex-shrink-0 bg-white p-3 rounded-lg shadow-sm">
                {specialty.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {specialty.title}
                </h3>
                <p className="text-sm text-gray-600">{specialty.description}</p>
                <Link href={`/hospitals?specialty=${specialty.title.toLowerCase()}`}>
                  <span className="inline-flex items-center mt-2 text-xs font-medium text-red-500 hover:text-red-700">
                    <span className="mr-1">+</span> Learn more
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link href="/consultation">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-full shadow-md flex items-center gap-2"
            >
              Need Assistance?
            </motion.button>
          </Link>
          <Link href="https://wa.me/919927328682">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-4 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-full shadow-md flex items-center gap-2"
            >
              Chat!
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;