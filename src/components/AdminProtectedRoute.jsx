import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import LoginModal from "../components/loginModal";

export default function AdminProtectedRoute() {
  const [authenticated, setAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setAuthenticated(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setAuthenticated(true); // optionally validate with backend
    }
  }, []);

  return authenticated ? <Outlet /> : <LoginModal onLoginSuccess={handleLoginSuccess} />;
}
