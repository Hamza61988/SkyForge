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
        <div className="flex flex-col justify-between min-h-screen bg-cover bg-center text-white" style={{ backgroundImage: "url('https://images.pexels.com/photos/2387877/pexels-photo-2387877.jpeg')" }}>
            <div className="flex-grow flex items-center justify-center">
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                    <h2 className="text-2xl font-semibold text-center mb-4">Create an Account</h2>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <form onSubmit={handleRegister} className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="p-2 rounded bg-gray-700 text-white"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="p-2 rounded bg-gray-700 text-white"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="p-2 rounded bg-gray-700 text-white"
                        />
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 p-2 rounded text-white font-semibold">
                            Register
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Register;
