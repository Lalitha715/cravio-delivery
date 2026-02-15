import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDeliveryBoyByPhone } from "../api/hasura";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const cleanPhone = phone.trim();

    if (!cleanPhone) {
      alert("Enter phone number");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const boy = await getDeliveryBoyByPhone(cleanPhone);

      if (boy) {
        localStorage.setItem("delivery_boy_id", boy.id);
        navigate("/dashboard");
      } else {
        setError("No delivery partner found with this phone.");
      }
    } catch (err) {
      console.error(err);
      setError("Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-blue-500 to-purple-600">
      <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-10 w-[380px] transition-all duration-300">
        <h2 className="text-xl font-bold text-center text-gray-800 mb-8">
          🚚 Delivery Partner Login
        </h2>

        <input
          type="text"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border border-gray-300 rounded-xl p-3 mb-5 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 active:scale-95 transition duration-200"
        >
          {loading ? "Checking..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;
