import { useEffect, useState } from "react";
import { fetchDashboard } from "../services/authServices";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [user, setUser] = useState<any>(null);
    const [error] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login"); // Redirect if not logged in
            return;
        }

        fetchDashboard(token)
            .then((res) => setUser(res.data.user))
            .catch(() => {
                localStorage.removeItem("token"); // Clear invalid token
                navigate("/login");
            });
    }, [navigate]);

    return (
        <div>
            <h2>Dashboard</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {user ? <p>Welcome, {user.username}!</p> : <p>Loading...</p>}
            <button onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}>
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
