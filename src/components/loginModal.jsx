import { useState } from "react";
import axios from "@/services/axiosInstance";
import { Dialog } from "@/components/ui/dialog"; 
import { Button } from "@/components/ui/button";

export default function LoginModal({ onLoginSuccess }) {
  const [open, setOpen] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("/login", { username, password });
      localStorage.setItem("adminToken", res.data.token); 
      setOpen(false);
      onLoginSuccess();
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-sm mx-auto mt-40">
        <h2 className=" text-xl font-bold mb-4">Admin Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-2 p-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className="w-full text-red-500" onClick={handleLogin}>
          Login
        </Button>
      </div>
    </Dialog>
  );
}
