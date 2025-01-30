import { useState, useEffect } from "react";
import { fetchDashboard, logout } from "../services/authServices";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [user, setUser] = useState<any>(null);
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
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h2 className="text-3xl font-bold">Welcome, {user?.username}</h2>
            <button onClick={() => { logout(); navigate("/login"); }} className="mt-4 bg-red-600 hover:bg-red-700 p-2 rounded">Logout</button>
        </div>
    );
};

export default Dashboard;
