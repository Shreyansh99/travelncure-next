import { Stethoscope, Heart, Guitar as Hospital, ChevronFirst as FirstAid, Brain, Eye, Bluetooth as Tooth, Heart as Cardiology, Bone, Microscope, Baby, Syringe } from 'lucide-react';

export const departments =[
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
]
    

export const treatments = {
    Neurology: ["Neurological Disorders", "Stroke", "Epilepsy"],
    Ophthalmology: ["LASIK, Cataract Surgery"],
    Dental: ["Implants, Cosmetic Dentistry"],
    Cardiology: ["Heart Diseases", "Angioplasty", "Cardiac Surgery"],
    Orthopedics: ["Joint Replacement", "Fracture Treatment", "Spinal Surgery"],
    Oncology: ["Cancer Treatment", "Radiation Therapy", "Chemotherapy"],
    Pediatrics: ["Child Healthcare, Vaccinations"],
    Cosmetic: ["Plastic Surgery, Aesthetics"],
};