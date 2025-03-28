// app/page.js
import Hero from "@/components/Hero";
import  WhyUs from "@/components/About";
import ContactInfo from "@/components/contactSection";
import Dept from "@/components/departmentSec";
import HowItWorks from "./howItWork";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Hero />
      <WhyUs />
      {/* <Dept />
      <HowItWorks />
      <ContactInfo /> */}
    </div>
  );
}
