import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Products: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <p className="text-2xl font-semibold">🚧 Under Development 🚧</p>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
