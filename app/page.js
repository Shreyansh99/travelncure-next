// app/page.js
import Hero from "@/components/Hero";
import Contact from "./contact/page";
import  WhyUs from "@/components/About";
import Dept from "@/components/departmentSec";
import HowItWorks from "@/components/howItWork";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Hero />
      <WhyUs />
      <Dept />
      <HowItWorks />
      <Contact />
    </div>
  );
}
