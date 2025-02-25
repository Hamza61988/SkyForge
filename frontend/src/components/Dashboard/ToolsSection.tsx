import React from "react";

const ToolsSection: React.FC = () => {
    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Quick Access Tools</h2>
            <ul className="mt-4 space-y-2">
                <li>🛠 <a href="/runwaylink" className="text-blue-400 hover:underline">RunwayLink</a></li>
                <li>🛰 <a href="/mrc" className="text-blue-400 hover:underline">MRC (Radar Tool)</a></li>
                <li>🗺 <a href="/tracker" className="text-blue-400 hover:underline">IVAO Tracker</a></li>
            </ul>
        </div>
    );
};

export default ToolsSection;
