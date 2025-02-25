import React from "react";
import { motion } from "framer-motion";

const StatsOverview: React.FC = () => {
    return (
        <motion.div 
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-xl font-semibold">Dashboard Overview</h2>
            <ul className="mt-4 space-y-2">
                <li>🔹 <strong>Live IVAO Users:</strong> <span className="text-blue-400">500</span></li>
                <li>🔹 <strong>SkyForge Users:</strong> <span className="text-green-400">42</span></li>
                <li>🔹 <strong>System Status:</strong> <span className="text-yellow-400">✅ All Systems Operational</span></li>
            </ul>
        </motion.div>
    );
};

export default StatsOverview; 
