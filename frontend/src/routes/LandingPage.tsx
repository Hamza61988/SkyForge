import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-700 text-white">
      <h1 className="text-6xl font-extrabold">SkyForge</h1>
      <p className="text-2xl mt-4">Welcome to RunwayLink</p>
      <Link to="/select-airport">
        <button className="mt-6 px-6 py-3 bg-white text-blue-700 font-bold rounded-lg shadow-lg hover:bg-gray-200 transition-all">
          Enter RunwayLink
        </button>
      </Link>
    </div>
  );
}

