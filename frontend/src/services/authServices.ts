const API_URL = "http://localhost:3000/api/auth"; 

// **🔹 Register Function**
export const register = async (username: string, email: string, password: string) => {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) throw new Error("Registration failed");
    return response.json();
};

// **🔹 Login Function**
export const login = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error("Login failed");

    const data = await response.json();
    localStorage.setItem("token", data.token); // Save token
    return data;
};

// **🔹 Fetch Dashboard (Protected Route)**
export const fetchDashboard = async () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await fetch(`${API_URL}/dashboard`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) throw new Error("Unauthorized");
    return response.json();
};

// **🔹 Logout Function**
export const logout = () => {
    localStorage.removeItem("token");
};
