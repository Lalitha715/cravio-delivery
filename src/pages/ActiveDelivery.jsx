// src/pages/ActiveDelivery.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import LocationTracker from "../utils/locationTracker.jsx";

const ActiveDelivery = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Get order info from state passed via navigate
    if (!location.state?.order) {
      navigate("/dashboard"); // redirect if no order
    } else {
      setOrder(location.state.order);
    }
  }, [location, navigate]);

  if (!order) return <p>Loading order info...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Header title={`Tracking Order #${order.order_number}`} />
      <div className="mt-4">
        <LocationTracker
          restaurant={order.restaurant}
          userAddress={order.user?.addresses[0]}
        />
      </div>
    </div>
  );
};

export default ActiveDelivery;
