import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import './globals.css'

export const metadata = {
  title: "TravelNCure | International Medical Tourism",
  description: "Your trusted partner for international medical tourism, connecting you with world-class healthcare facilities worldwide",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}