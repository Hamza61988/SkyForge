import { useState } from "react";
import { login } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer"; // Importing the Footer component

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await login(email, password);
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (err: any) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div
            className="flex flex-col min-h-screen bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.pexels.com/photos/2387877/pexels-photo-2387877.jpeg')" }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {/* Login Box Centered */}
            <div className="flex flex-grow justify-center items-center relative z-10">
                <div className="bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-2xl shadow-lg w-96">
                    <h2 className="text-2xl font-semibold text-white text-center mb-4">Login</h2>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <form onSubmit={handleLogin} className="flex flex-col">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="p-3 mb-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="p-3 mb-4 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            type="submit"
                            className="p-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
