import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./routes/LandingPage";
import AirportSelection from "./routes/AirportSelection";
import CallsignInput from "./routes/CallsignInput";
import GateAssignment from "./routes/GateAssignment";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/select-airport" element={<AirportSelection />} />
                <Route path="/callsign" element={<CallsignInput />} />
                <Route path="/gate-assignment" element={<GateAssignment />} />
            </Routes>
        </Router>
    );
}
