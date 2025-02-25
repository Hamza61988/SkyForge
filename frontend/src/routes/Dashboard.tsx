import { useState, useEffect } from "react";
import { fetchDashboard, logout } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPlane, FaUserCircle, FaMapMarkerAlt, FaCog, FaSignOutAlt, FaSatellite, FaComments, FaChartLine, FaBell } from "react-icons/fa";

const Dashboard = () => {
    const [user, setUser] = useState<any>(null);
    const [stats, setStats] = useState({
        activeFlights: 0,
        atcStations: 0,
        usersOnline: 0,
    });

    const navigate = useNavigate();

    useEffect(() => {
        const loadUser = async () => {
            try {
                const data = await fetchDashboard();
                setUser(data.user);
            } catch {
                navigate("/login");
            }
        };
        loadUser();

        // Simulated real-time statistics (replace with API calls)
        setStats({
            activeFlights: 5423,
            atcStations: 238,
            usersOnline: 8142,
        });

    }, [navigate]);

    return (
        <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
            
            {/* Animated Background */}
            <div className="absolute inset-0 -z-10 opacity-50 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.1),_transparent)]" />

            {/* Header */}
            <div className="max-w-7xl mx-auto p-10 text-center">
                <motion.h2 
                    className="text-5xl font-extrabold tracking-tight text-white/90 drop-shadow-lg"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Welcome, {user?.username || "Pilot"}
                </motion.h2>
                <motion.p
                    className="text-gray-400 text-md mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    Your Virtual ATC Hub
                </motion.p>
                <motion.div 
                    className="mt-4 flex justify-center items-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {user?.avatar ? (
                        <img 
                            src={user.avatar} 
                            alt="User Avatar" 
                            className="w-16 h-16 rounded-full border-2 border-white shadow-lg"
                        />
                    ) : (
                        <FaUserCircle className="text-6xl text-white/80" />
                    )}
                </motion.div>
            </div>

            {/* Live Statistics */}
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center p-4">
                <StatCard title="Active Flights" value={stats.activeFlights} icon={<FaPlane />} />
                <StatCard title="ATC Stations" value={stats.atcStations} icon={<FaMapMarkerAlt />} />
                <StatCard title="Users Online" value={stats.usersOnline} icon={<FaChartLine />} />
            </div>

            {/* Notification Panel */}
            <div className="max-w-4xl mx-auto p-6 text-center">
                <motion.div 
                    className="p-4 bg-gray-800/80 text-white rounded-lg shadow-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                >
                    <FaBell className="inline-block text-yellow-400 text-xl mr-2" />
                    <span className="text-gray-300 text-sm">Checkout our most recent news</span>
                </motion.div>
            </div>

            {/* Navigation Grid */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                <DashboardCard title="Flight Planner" description="Plan & visualize your flight routes" icon={<FaPlane />} onClick={() => navigate("/flightplanner")} />
                <DashboardCard title="IVAO Tracker" description="Monitor real-time flights and ATC" icon={<FaMapMarkerAlt />} onClick={() => navigate("/tracker")} />
                <DashboardCard title="Radar Tools" description="Advanced tools for special ops & ATC" icon={<FaSatellite />} onClick={() => navigate("/mrc")} />
                <DashboardCard title="Profile & Settings" description="Manage your account & preferences" icon={<FaCog />} onClick={() => navigate("/profile")} />
                <DashboardCard title="AeroLab Forum" description="Join our science & tech discussions" icon={<FaComments />} onClick={() => navigate("/aerolab")} />
                <DashboardCard title="Logout" description="Sign out of your account" icon={<FaSignOutAlt />} onClick={() => { logout(); navigate("/login"); }} isDanger />
            </div>

            {/* Footer */}
            <footer className="mt-10 text-center text-gray-400 text-sm pb-6">
                © 2025 SkyForge. All rights reserved.
            </footer>
        </div>
    );
};

// Statistics Card Component
const StatCard = ({ title, value, icon }: any) => (
    <motion.div className="p-4 rounded-xl bg-gray-800/80 text-white shadow-lg text-center">
        <div className="text-3xl">{icon}</div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
    </motion.div>
);

// Reusable Navigation Card
const DashboardCard = ({ title, description, icon, onClick, isDanger = false }: any) => (
    <motion.div onClick={onClick} className={`p-6 rounded-xl bg-gray-800/80 hover:bg-gray-700/80 transition cursor-pointer shadow-xl backdrop-blur-lg text-center ${isDanger ? "bg-red-700 hover:bg-red-600" : ""}`}>
        <div className="flex justify-center items-center text-4xl text-white mb-2">{icon}</div>
        <h3 className="text-2xl font-semibold text-white/90">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
    </motion.div>
);

export default Dashboard;
