import React, { useState } from "react";

const Settings: React.FC = () => {
    const [darkMode, setDarkMode] = useState(true);

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Settings</h2>
            <label className="flex items-center mt-4">
                <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                    className="mr-2"
                />
                Dark Mode
            </label>
        </div>
    );
};

export default Settings;
