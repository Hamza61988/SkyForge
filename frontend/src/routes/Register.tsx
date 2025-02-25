import { useState } from "react";
import { register } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register(username, email, password);
            navigate("/login"); // Redirect to login after successful registration
        } catch (err: any) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div
            className="flex flex-col min-h-screen bg-cover bg-center relative"
            style={{ backgroundImage: "url('https://images.pexels.com/photos/2387877/pexels-photo-2387877.jpeg')" }}
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>

            {/* Centered Register Box */}
            <div className="flex flex-grow justify-center items-center relative z-10">
                <div className="bg-white bg-opacity-10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-[400px] border border-white/20">
                    <h2 className="text-2xl font-semibold text-white text-center mb-6 tracking-wide">Create an Account</h2>
                    
                    {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}
                    
                    <form onSubmit={handleRegister} className="flex flex-col space-y-4">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="p-3 rounded-md bg-black bg-opacity-20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all border border-white/30"
                        />
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
                            Register
                        </button>
                    </form>

                    {/* Already have an account? */}
                    <div className="text-center mt-4">
                        <p className="text-gray-400 text-sm">
                            Already have an account?{" "}
                            <a href="/login" className="text-blue-400 hover:text-blue-500 transition-all">Log in</a>
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Register;
