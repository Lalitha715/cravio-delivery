import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ActiveDelivery from "./pages/ActiveDelivery";
import LocationTracker from "./utils/locationTracker";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/active-delivery" element={<ActiveDelivery />} />
        <Route path="/location-tracker" element={<LocationTracker />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
