import axios from "axios";

const API_URL = "http://localhost:3000/api/auth"; // Change this for production

// ✅ Register User
export const register = async (username: string, email: string, password: string) => {
    return axios.post(`${API_URL}/register`, { username, email, password });
};

// ✅ Login User
export const login = async (email: string, password: string) => {
    return axios.post(`${API_URL}/login`, { email, password });
};

// ✅ Fetch Dashboard Data (Protected Route)
export const fetchDashboard = async (token: string) => {
    return axios.get(`${API_URL}/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};
