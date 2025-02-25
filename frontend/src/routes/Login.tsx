import { useState } from "react";
import { login } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            await login(email, password);
            navigate("/dashboard");
        } catch (err) {
            console.error("Frontend Login Error:", err);
            setError("Login failed: " + (err as Error).message);
        }
    };

    return (
        <div
            className="flex flex-col min-h-screen bg-cover bg-center relative"
            style={{ backgroundImage: "url('https://images.pexels.com/photos/2387877/pexels-photo-2387877.jpeg')" }}
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>

            {/* Centered login box */}
            <div className="flex flex-grow justify-center items-center relative z-10">
                <div className="bg-white bg-opacity-10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-[400px] border border-white/20">
                    <h2 className="text-2xl font-semibold text-white text-center mb-6 tracking-wide">Welcome Back</h2>
                    
                    {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}
                    
                    <form onSubmit={handleLogin} className="flex flex-col space-y-4">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="p-3 rounded-md bg-black bg-opacity-20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all border border-white/30"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="p-3 rounded-md bg-black bg-opacity-20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all border border-white/30"
                        />
                        <button
                            type="submit"
                            className="p-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition-all shadow-lg"
                        >
                            Login
                        </button>
                    </form>

                    {/* Forgot password & sign up links */}
                    <div className="text-center mt-4">
                        <a href="#" className="text-gray-400 text-sm hover:text-white transition-all">Forgot password?</a>
                    </div>
                    <div className="text-center mt-2">
                        <p className="text-gray-400 text-sm">
                            Don't have an account?{" "}
                            <a href="/register" className="text-blue-400 hover:text-blue-500 transition-all">Sign up</a>
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Login;
