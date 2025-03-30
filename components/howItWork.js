"use client"; // Add this line to mark it as a client component

import React from "react";
import { motion } from 'framer-motion';

const HowItWorks = () => { // Capitalize component name to HowItWorks
  const steps = [
    {
      step: "1",
      title: "Consultation",
      description: "Schedule a free consultation with our medical experts.",
    },
    {
      step: "2",
      title: "Treatment Plan",
      description:
        "Receive a customized treatment plan and destination options.",
    },
    {
      step: "3",
      title: "Travel Arrangements",
      description: "We handle all travel logistics and appointments.",
    },
    {
      step: "4",
      title: "Treatment & Recovery",
      description: "Receive treatment and support throughout recovery.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Our simple process makes medical tourism accessible and stress-free.
          </p>
        </motion.div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <motion.div
                className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {item.step}
              </motion.div>
              <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; // Corrected component export name