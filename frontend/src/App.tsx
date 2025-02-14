import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LandingPage from "./routes/LandingPage"; //  Fix import

import About from "./routes/About";
import Changelog from "./routes/Changelog";
import Products from "./routes/Products";
import Join from "./routes/Join";
import SkyForgeLanding from "./routes/SkyForge";
import Development from "./routes/Development"; 
import Career from "./routes/Career";
import Register from "./routes/Register";
import Login from "./routes/Login";
import Dashboard from "./routes/Dashboard";



import { useEffect } from "react";

export default function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <RoutesWithTransition />
      </AnimatePresence>
    </Router>
  );
}

function RoutesWithTransition() {
  const location = useLocation();

  useEffect(() => {
    document.title = "SkyForge"; 
    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) {
      favicon.setAttribute("href", "/sflogo.png"); 
    }
  }, []);

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<SkyForgeLanding />} />
      <Route path="/landingpage" element={<LandingPage />} />
      <Route path="/career" element={<Career />} />
      <Route path="/register" element={<Register />} />
     
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
  
     
     
      <Route path="/changelog" element={<Changelog />} />
      <Route path="/products" element={<Products />} />
      <Route path="/join" element={<Join />} />
      <Route path="/about" element={<About />} />
      <Route path="/skyforge" element={<SkyForgeLanding />} />
      <Route path="/development" element={<Development />} /> {/*  Fixed Case */}
    </Routes>
  );
}
