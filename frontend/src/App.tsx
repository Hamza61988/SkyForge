import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LandingPage from "./routes/LandingPage";
import AirportSelection from "./routes/AirportSelection";
import CallsignInput from "./routes/CallsignInput";
import GateAssignment from "./routes/GateAssignment";
import About from "./routes/About";

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

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<LandingPage />} />
      <Route path="/select-airport" element={<AirportSelection />} />
      <Route path="/callsign" element={<CallsignInput />} />
      <Route path="/gate-assignment" element={<GateAssignment />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
