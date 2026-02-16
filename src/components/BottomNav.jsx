import { NavLink } from "react-router-dom";

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg flex justify-around py-3">
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/track">Track</NavLink>
      <NavLink to="/history">History</NavLink>
      <NavLink to="/profile">Profile</NavLink>
    </div>
  );
};

export default BottomNav;
