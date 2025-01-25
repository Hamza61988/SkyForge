import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaPlane, FaUsers, FaCogs, FaChartLine, FaRocket, FaHeadset, FaGlobe, FaHandshake, FaShieldAlt } from "react-icons/fa";

const Products: React.FC = () => {
  const products = [
    {
      title: "Brand New Flight Dispatch",
      description:
        "An improved dispatch system that integrates real-time flight data, automated gate assignments, and a modern UI for a seamless experience.",
      icon: <FaPlane className="text-blue-400 text-5xl mb-4" />,
    },
    {
      title: "Pilot's Dashboard - The Ultimate Tracking Hub",
      description:
        "A personalized hub for pilots to track flight history, review statistics, and compete globally with other virtual aviators.",
      icon: <FaUsers className="text-blue-400 text-5xl mb-4" />,
    },
    {
      title: "Advanced Airbus Performance Suite",
      description:
        "Realistic takeoff, landing, and in-flight performance calculations for high-fidelity Airbus aircraft, designed for precision.",
      icon: <FaCogs className="text-blue-400 text-5xl mb-4" />,
    },
    {
      title: "SkyForge: AeroLab Forum",
      description:
        "A community hub for aviation, engineering, and science discussions among pilots, controllers, and enthusiasts worldwide.",
      icon: <FaUsers className="text-blue-400 text-5xl mb-4" />,
    },
    {
      title: "ATC Training Hub",
      description:
        "A progressive learning system for aspiring virtual and real-world ATC controllers, covering everything from basics to advanced radar control.",
      icon: <FaCogs className="text-blue-400 text-5xl mb-4" />,
    },
  ];

  return (
    <div className="relative flex flex-col min-h-screen bg-black text-white overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/2387877/pexels-photo-2387877.jpeg')",
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 w-full h-full bg-black bg-opacity-60"></div>

      {/* Content */}
      <Header />
      <div className="relative flex-grow container mx-auto px-6 py-24">
        <h1 className="text-6xl font-extrabold text-center mb-12 leading-[1.4] text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-400">
          Our Upcoming Innovations
        </h1>
        <p className="text-2xl text-center mb-16 text-gray-300">
          Explore our cutting-edge developments that will redefine the virtual aviation experience.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-gray-900 bg-opacity-90 rounded-2xl p-8 shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <div className="flex flex-col items-center">
                {product.icon}
                <h2 className="text-3xl font-bold mb-3 text-blue-400 text-center">{product.title}</h2>
                <p className="text-gray-300 text-center">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Additional Sections to Increase Scrolling */}
      <div className="relative py-24 bg-gray-900 bg-opacity-80 text-white text-center">
        <h2 className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
          Why Choose Us?
        </h2>
        <p className="text-xl mb-12 text-gray-300">We are committed to revolutionizing virtual aviation with smart, intuitive, and powerful tools.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
            <FaChartLine className="text-blue-400 text-6xl mb-4" />
            <h3 className="text-3xl font-bold mb-2">Data-Driven</h3>
            <p className="text-gray-300">Our tools leverage real-time data to provide accurate insights.</p>
          </div>
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
            <FaRocket className="text-blue-400 text-6xl mb-4" />
            <h3 className="text-3xl font-bold mb-2">Innovative</h3>
            <p className="text-gray-300">We push the boundaries of flight technology to the next level.</p>
          </div>
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
            <FaHeadset className="text-blue-400 text-6xl mb-4" />
            <h3 className="text-3xl font-bold mb-2">24/7 Support</h3>
            <p className="text-gray-300">Our team is always available to assist with your aviation needs.</p>
          </div>
        </div>
      </div>

      {/* New Section: Global Reach & Collaboration */}
      <div className="relative py-24 bg-black bg-opacity-90 text-white text-center">
        <h2 className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-400">
          Global Reach & Collaboration
        </h2>
        <p className="text-xl mb-12 text-gray-300">We connect aviation enthusiasts, professionals, and developers worldwide.</p>
        <div className="flex justify-center items-center gap-12">
          <div className="flex flex-col items-center">
            <FaGlobe className="text-blue-400 text-7xl mb-4" />
            <h3 className="text-3xl font-bold mb-2">Worldwide Community</h3>
            <p className="text-gray-300">Bringing together aviation experts globally.</p>
          </div>
          <div className="flex flex-col items-center">
            <FaHandshake className="text-blue-400 text-7xl mb-4" />
            <h3 className="text-3xl font-bold mb-2">Partnerships</h3>
            <p className="text-gray-300">We collaborate with major aviation networks.</p>
          </div>
          <div className="flex flex-col items-center">
            <FaShieldAlt className="text-blue-400 text-7xl mb-4" />
            <h3 className="text-3xl font-bold mb-2">Security & Trust</h3>
            <p className="text-gray-300">Ensuring a safe and reliable platform for aviation users.</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Products;
