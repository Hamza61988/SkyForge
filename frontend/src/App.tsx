import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import SplashScreen from "./components/SplashScreen";

import LandingPage from "./routes/LandingPage";
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

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Keep the splash screen fully visible for 4 seconds before fading out
    setTimeout(() => setFadeOut(true), 4000);

    // Hide splash and show main content after 5 seconds
    setTimeout(() => setShowSplash(false), 5000);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-[#010101] flex flex-col"> {/* Persistent dark background */}
        <AnimatePresence mode="wait">
          {showSplash && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: fadeOut ? 0 : 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
            >
              <SplashScreen onFinish={() => setShowSplash(false)} />
            </motion.div>
          )}
          
          {!showSplash && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="flex-1"
            >
              <RoutesWithTransition />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
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
      <Route path="/development" element={<Development />} />
    </Routes>
  );
}
