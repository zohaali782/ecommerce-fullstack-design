import { createContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("nexmart_user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        Promise.resolve().then(() => setUser(parsed));
      } catch {
        localStorage.removeItem("nexmart_user");
      }
    }
    Promise.resolve().then(() => setLoading(false));
  }, []);
  const login = async (email, password) => {
    const res = await fetch("${import.meta.env.VITE_API_URL}/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");
    localStorage.setItem("nexmart_user", JSON.stringify(data.user));
    localStorage.setItem("nexmart_token", data.token);
    setUser(data.user);
    return data.user;
  };

  const register = async (name, email, password) => {
    const res = await fetch(
      "${import.meta.env.VITE_API_URL}/api/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      },
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Registration failed");
    localStorage.setItem("nexmart_user", JSON.stringify(data.user));
    localStorage.setItem("nexmart_token", data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem("nexmart_user");
    localStorage.removeItem("nexmart_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
