import React from "react";
import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Changelog: React.FC = () => {
  useEffect(() => {
    // Redirect to the GitHub repository when the page loads
    window.location.href = "https://github.com/SpaceMikha/SkyForge-RunwayLink";
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <p className="text-xl">Redirecting...</p>
      </div>
      <Footer />
    </div>
  );
};

export default Changelog;
