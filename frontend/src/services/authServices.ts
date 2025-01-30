const API_URL = window.location.hostname === "localhost"
  ? "http://localhost:3000/api/auth"  // Local development
  : "https://skyforgehq.com/api/auth"; // Production

export { API_URL };

// ** Register Function**
export const register = async (username: string, email: string, password: string) => {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) throw new Error("Registration failed");
    return response.json();
};

// ** Login Function**
export const login = async (email: string, password: string) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        console.log("Login Response:", data);

        if (!response.ok) {
            throw new Error(data.message || "Login failed");
        }

        localStorage.setItem("token", data.token);
        return data;
    } catch (error) {
        console.error("Login Error:", error);
        throw error;
    }
};


// ** Fetch Dashboard (Protected Route)**
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

// ** Logout Function**
export const logout = () => {
    localStorage.removeItem("token");
};
