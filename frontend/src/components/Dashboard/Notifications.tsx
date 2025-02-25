import React from "react";

const Notifications: React.FC = () => {
    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Notifications</h2>
            <ul className="mt-4 space-y-2">
                <li>📢 New IVAO event: ATC Academy Training</li>
                <li>⚠️ Server Maintenance scheduled for 02/20</li>
            </ul>
        </div>
    );
};

export default Notifications;
