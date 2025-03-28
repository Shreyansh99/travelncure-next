'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

const features = [
  {
    title: "AI-Powered",
    description: "Our AI-powered platform streamlines your medical journey, analyzing global healthcare options to provide personalized recommendations.",
    icon: "/icons/ai.svg"
  },
  {
    title: "Expert Diagnostic Evaluation",
    description: "We understand the critical importance of accurate diagnoses. Misdiagnoses can lead to inappropriate treatments and prolonged health issues.",
    icon: "/icons/diagnosis.svg"
  },
  {
    title: "Patient's Peace of Mind",
    description: "We release patient's stress and anxiety by providing them with the right medical opinion from the right doctor.",
    icon: "/icons/peace.svg"
  },
  {
    title: "Second Perspective",
    description: "With our Second Opinion from the right doctor, you gain a new perspective on your treatment plan.",
    icon: "/icons/second-opinion.svg"
  }
];

const WhyUs = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section 
      id="why-us" 
      ref={ref}
      className="py-20 md:py-32 bg-gradient-to-b from-white to-[#E3F2FD]"
    >
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 mb-4 text-lg font-medium bg-[#E3F2FD] rounded-full text-[#1E67A8]"
          >
            Why Choose Us
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4 text-[#153448]"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Designed for Your Medical Journey
          </motion.h2>
          
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            We offer an AI-powered solution for global healthcare. We address the complexities of medical tourism by providing clear information, transparent pricing, and end-to-end support for a smooth medical care experience.
          </motion.p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ staggerChildren: 0.2, delayChildren: 0.3 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="rounded-xl p-6 lg:p-8 flex flex-col items-start shadow-lg shadow-[#1E67A8]/10 bg-white hover:shadow-xl hover:shadow-[#1E67A8]/20 transition-shadow duration-300 h-auto"
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="p-3 rounded-lg bg-[#E3F2FD] text-[#1E67A8] mb-5">
                <Image src={feature.icon} alt={feature.title} width={32} height={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#153448]">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUs;
