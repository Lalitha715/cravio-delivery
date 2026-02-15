import { useNavigate } from "react-router-dom";

const Header = ({ title }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("delivery_boy_id");
    navigate("/");
  };

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-blue-600 shadow-lg rounded-2xl p-5 mb-6 flex justify-between items-center">
      
      {/* Left Side */}
      <div className="flex items-center gap-3">
        <div className="bg-white text-indigo-600 p-2 rounded-xl text-xl">
          🚚
        </div>
        <h1 className="text-white text-2xl font-bold tracking-wide">
          {title}
        </h1>
      </div>

      {/* Right Side */}
      <button
        onClick={handleLogout}
        className="bg-white text-indigo-600 px-5 py-2 rounded-xl font-semibold hover:bg-gray-100 active:scale-95 transition duration-200"
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
