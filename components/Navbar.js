// "use client";

// import { useState, useEffect, useRef } from "react";
// import { cn } from "@/lib/utils";
// import { motion, AnimatePresence } from "framer-motion";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { ChevronDown, Menu, X } from "lucide-react";

// const Navbar = () => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [exploreOpen, setExploreOpen] = useState(false);
//   const pathname = usePathname(); // Get the current route
//   const isAdminRoute = pathname.startsWith("/admin"); // Check for admin route

//   const exploreRef = useRef(null);

//   // Close explore dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (exploreRef.current && !exploreRef.current.contains(event.target)) {
//         setExploreOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [exploreRef]);

//   const navLinks = [
//     { name: "Home", to: "/" },
//     { name: "About", to: "/about" },
//     { name: "Contact", to: "/contact" },
//   ];

//   const authLinks = [
//     { name: "Login", to: "/login" },
//     { name: "Register", to: "/register" },
//   ];

//   const exploreLinks = [
//     { name: "Hospitals", to: "/hospitals" },
//     { name: "Doctors", to: "/doctors" },
//   ];

//   return (
//     <header
//       className={cn(
//         "fixed top-0 w-full z-50 py-4 bg-white shadow-sm",
//         isAdminRoute ? "hidden" : "" // Add 'hidden' class for admin routes
//       )}
//     >
//       <div className="container max-w-7xl mx-auto px-4 flex items-center justify-between">
//         {/* Logo */}
//         <Link href="/">
//           <motion.div
//             className="flex items-center gap-2"
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <span className="text-3xl font-display font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
//               Travel n Cure
//             </span>
//           </motion.div>
//         </Link>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex items-center space-x-2">
//           {/* Main Navigation Links */}
//           <div className="flex items-center mr-6">
//             {/* Explore Dropdown */}
//             <div className="relative px-2" ref={exploreRef}>
//               <button
//                 className="flex items-center gap-1 px-4 py-2.5 rounded-full text-base font-medium text-blue-600 hover:bg-blue-50 transition-colors"
//                 onClick={() => setExploreOpen(!exploreOpen)}
//               >
//                 Explore
//                 <ChevronDown
//                   size={18}
//                   className={cn(
//                     "transition-transform duration-200",
//                     exploreOpen ? "rotate-180" : ""
//                   )}
//                 />
//               </button>

//               <AnimatePresence>
//                 {exploreOpen && (
//                   <motion.div
//                     className="absolute left-0 mt-2 bg-white rounded-xl shadow-lg py-2 w-52 z-10 border border-gray-100"
//                     initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                     animate={{ opacity: 1, y: 0, scale: 1 }}
//                     exit={{ opacity: 0, y: 10, scale: 0.95 }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     {exploreLinks.map((link) => (
//                       <Link key={link.name} href={link.to}>
//                         <div className="px-4 py-3 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
//                           {link.name}
//                         </div>
//                       </Link>
//                     ))}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             {navLinks.map((link, i) => (
//               <Link key={link.name} href={link.to}>
//                 <motion.div
//                   className="px-4 py-2.5 rounded-full text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
//                   initial={{ opacity: 0, y: -20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
//                 >
//                   {link.name}
//                 </motion.div>
//               </Link>
//             ))}
//           </div>

//           {/* Auth Links with visual separation */}
//           <div className="flex items-center border-l border-gray-200 pl-6 ml-2">
//             {authLinks.map((link, i) => (
//               <Link key={link.name} href={link.to}>
//                 <motion.div
//                   className={cn(
//                     "px-5 py-2.5 mx-1.5 rounded-full text-base font-medium transition-all",
//                     link.name === "Register"
//                       ? "bg-blue-600 hover:bg-blue-700 text-white"
//                       : "text-blue-600 hover:bg-blue-50"
//                   )}
//                   initial={{ opacity: 0, y: -20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
//                 >
//                   {link.name}
//                 </motion.div>
//               </Link>
//             ))}
//           </div>
//         </nav>

//         {/* Mobile Menu Button */}
//         <div className="md:hidden z-10">
//           <button
//             className="p-2 rounded-full hover:bg-gray-100 text-gray-700 focus:outline-none"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             aria-label="Toggle menu"
//           >
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={mobileMenuOpen ? "close" : "menu"}
//                 initial={{ opacity: 0, rotate: -90 }}
//                 animate={{ opacity: 1, rotate: 0 }}
//                 exit={{ opacity: 0, rotate: 90 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
//               </motion.div>
//             </AnimatePresence>
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         <AnimatePresence>
//           {mobileMenuOpen && (
//             <motion.div
//               className="fixed inset-0 bg-white md:hidden flex flex-col pt-24 px-6"
//               initial={{ opacity: 0, x: "100%" }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: "100%" }}
//               transition={{ duration: 0.3, ease: "easeInOut" }}
//             >
//               <div className="flex flex-col space-y-3">
//                 <div className="border-b border-gray-100 pb-5 mb-4">
//                   <div
//                     className="flex items-center justify-between px-5 py-4 rounded-lg bg-blue-50 text-blue-600 font-medium text-lg mb-3"
//                     onClick={() => setExploreOpen(!exploreOpen)}
//                   >
//                     Explore
//                     <ChevronDown
//                       size={20}
//                       className={cn(
//                         "transition-transform duration-200",
//                         exploreOpen ? "rotate-180" : ""
//                       )}
//                     />
//                   </div>

//                   <AnimatePresence>
//                     {exploreOpen && (
//                       <motion.div
//                         initial={{ height: 0, opacity: 0 }}
//                         animate={{ height: "auto", opacity: 1 }}
//                         exit={{ height: 0, opacity: 0 }}
//                         transition={{ duration: 0.2 }}
//                         className="overflow-hidden"
//                       >
//                         <div className="bg-gray-50 rounded-lg py-2 px-3">
//                           {exploreLinks.map((link) => (
//                             <Link key={link.name} href={link.to}>
//                               <div className="px-4 py-3.5 text-base font-medium text-gray-700 hover:text-blue-600 transition-colors">
//                                 {link.name}
//                               </div>
//                             </Link>
//                           ))}
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>

//                 {/* Main Nav Links */}
//                 {navLinks.map((link) => (
//                   <Link key={link.name} href={link.to}>
//                     <div
//                       className="px-5 py-4 text-xl font-medium text-gray-700 hover:text-blue-600 transition-colors"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                       {link.name}
//                     </div>
//                   </Link>
//                 ))}

//                 {/* Auth Links */}
//                 <div className="border-t border-gray-100 pt-5 mt-4">
//                   {authLinks.map((link, i) => (
//                     <Link key={link.name} href={link.to}>
//                       <div
//                         className={cn(
//                           "px-5 py-4 my-3 text-xl font-medium rounded-lg text-center transition-colors",
//                           link.name === "Register"
//                             ? "bg-blue-600 text-white"
//                             : "bg-gray-100 text-gray-700"
//                         )}
//                         onClick={() => setMobileMenuOpen(false)}
//                       >
//                         {link.name}
//                       </div>
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </header>
//   );
// };

// export default Navbar;

"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, UserCircle, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [exploreOpen, setExploreOpen] = useState(false);
    const pathname = usePathname();
    const isAdminRoute = pathname.startsWith("/admin");
    const exploreRef = useRef(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null); // State to hold error message

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await fetch('https://medical-tourism-lqcu.onrender.com/api/patient/login');
                if (response.ok) {
                    const data = await response.json();
                    setIsLoggedIn(data.isLoggedIn);
                    if (data.isLoggedIn && data.user) {
                        setUser(data.user);
                    }
                } else {
                    const errorData = await response.json();
                    setError(errorData.message || `Failed to check login status: ${response.statusText}`);
                }
            } catch (error) {
                setError(error.message || "An unexpected error occurred while checking login status.");
            }
        };
        checkLoginStatus();

    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (exploreRef.current && !exploreRef.current.contains(event.target)) {
                setExploreOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [exploreRef]);

    const navLinks = [
        { name: "Home", to: "/" },
        { name: "About", to: "/about" },
        { name: "Contact", to: "/contact" },
    ];

    const authLinks = [
        { name: "Login", to: "/login" },
        { name: "Register", to: "/register" },
    ];

    const exploreLinks = [
        { name: "Hospitals", to: "/hospitals" },
        { name: "Doctors", to: "/doctors" },
    ];

    return (
        <header
            className={cn(
                "fixed top-0 w-full z-50 py-4 bg-white shadow-sm",
                isAdminRoute ? "hidden" : ""
            )}
        >
            <div className="container max-w-7xl mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/">
                    <motion.div
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="text-3xl font-display font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                            Travel n Cure
                        </span>
                    </motion.div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-2">
                    {/* Main Navigation Links */}
                    <div className="flex items-center mr-6">
                        {/* Explore Dropdown */}
                        <div className="relative px-2" ref={exploreRef}>
                            <button
                                className="flex items-center gap-1 px-4 py-2.5 rounded-full text-base font-medium text-blue-600 hover:bg-blue-50 transition-colors"
                                onClick={() => setExploreOpen(!exploreOpen)}
                            >
                                Explore
                                <ChevronDown
                                    size={18}
                                    className={cn(
                                        "transition-transform duration-200",
                                        exploreOpen ? "rotate-180" : ""
                                    )}
                                />
                            </button>

                            <AnimatePresence>
                                {exploreOpen && (
                                    <motion.div
                                        className="absolute left-0 mt-2 bg-white rounded-xl shadow-lg py-2 w-52 z-10 border border-gray-100"
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {exploreLinks.map((link) => (
                                            <Link key={link.name} href={link.to}>
                                                <div className="px-4 py-3 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                                    {link.name}
                                                </div>
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {navLinks.map((link, i) => (
                            <Link key={link.name} href={link.to}>
                                <motion.div
                                    className="px-4 py-2.5 rounded-full text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                                >
                                    {link.name}
                                </motion.div>
                            </Link>
                        ))}
                    </div>

                    {/* Auth Links with visual separation */}
                    <div className="flex items-center border-l border-gray-200 pl-6 ml-2">
                        {isLoggedIn ? (
                            <>
                                <div className="relative group">
                                    <UserCircle size={36} className="text-blue-600 cursor-pointer" />
                                    <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-800 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap">
                                        {user?.name}
                                    </div>
                                </div>
                            </>
                        ) : (
                            authLinks.map((link, i) => (
                                <Link key={link.name} href={link.to}>
                                    <motion.div
                                        className={cn(
                                            "px-5 py-2.5 mx-1.5 rounded-full text-base font-medium transition-all",
                                            link.name === "Register"
                                                ? "bg-blue-600 hover:bg-blue-700 text-white"
                                                : "text-blue-600 hover:bg-blue-50"
                                        )}
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                                    >
                                        {link.name}
                                    </motion.div>
                                </Link>
                            ))
                        )}
                    </div>
                </nav>

                {/* Mobile Menu Button */}
                <div className="md:hidden z-10">
                    <button
                        className="p-2 rounded-full hover:bg-gray-100 text-gray-700 focus:outline-none"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={mobileMenuOpen ? "close" : "menu"}
                                initial={{ opacity: 0, rotate: -90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: 90 }}
                                transition={{ duration: 0.2 }}
                            >
                                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                            </motion.div>
                        </AnimatePresence>
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            className="fixed inset-0 bg-white md:hidden flex flex-col pt-24 px-6"
                            initial={{ opacity: 0, x: "100%" }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: "100%" }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <div className="flex flex-col space-y-3">
                                <div className="border-b border-gray-100 pb-5 mb-4">
                                    <div
                                        className="flex items-center justify-between px-5 py-4 rounded-lg bg-blue-50 text-blue-600 font-medium text-lg mb-3"
                                        onClick={() => setExploreOpen(!exploreOpen)}
                                    >
                                        Explore
                                        <ChevronDown
                                            size={20}
                                            className={cn(
                                                "transition-transform duration-200",
                                                exploreOpen ? "rotate-180" : ""
                                            )}
                                        />
                                    </div>

                                    <AnimatePresence>
                                        {exploreOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="bg-gray-50 rounded-lg py-2 px-3">
                                                    {exploreLinks.map((link) => (
                                                        <Link key={link.name} href={link.to}>
                                                            <div
                                                                className="px-4 py-3.5 text-base font-medium text-gray-700 hover:text-blue-600 transition-colors"
                                                                onClick={() => setMobileMenuOpen(false)}
                                                            >
                                                                {link.name}
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Main Nav Links */}
                                {navLinks.map((link) => (
                                    <Link key={link.name} href={link.to}>
                                        <div
                                            className="px-5 py-4 text-xl font-medium text-gray-700 hover:text-blue-600 transition-colors"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {link.name}
                                        </div>
                                    </Link>
                                ))}

                                {/* Auth Links */}
                                <div className="border-t border-gray-100 pt-5 mt-4">
                                    {isLoggedIn ? (
                                        <div
                                            className="px-5 py-4 my-3 text-xl font-medium rounded-lg text-center bg-gray-100 text-gray-700"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Profile
                                        </div>
                                    ) : (
                                        authLinks.map((link, i) => (
                                            <Link key={link.name} href={link.to}>
                                                <div
                                                    className={cn(
                                                        "px-5 py-4 my-3 text-xl font-medium rounded-lg text-center transition-colors",
                                                        link.name === "Register"
                                                            ? "bg-blue-600 text-white"
                                                            : "bg-gray-100 text-gray-700"
                                                    )}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    {link.name}
                                                </div>
                                            </Link>
                                        ))
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            {/* Global Error Alert */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md"
                    >
                        <Alert variant="destructive">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                {error}
                            </AlertDescription>
                        </Alert>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;





