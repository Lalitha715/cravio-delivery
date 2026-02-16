// src/pages/Dashboard.jsx
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import OrderCard from "../components/OrderCard";
import {
  getAssignedOrders,
  getUnassignedOrders,
  acceptOrder,
} from "../api/hasura";

const Dashboard = () => {
  const navigate = useNavigate();
  const deliveryBoyId = localStorage.getItem("delivery_boy_id");

  const [assignedOrders, setAssignedOrders] = useState([]);
  const [unassignedOrders, setUnassignedOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    if (!deliveryBoyId) navigate("/");
  }, [deliveryBoyId, navigate]);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const [assigned, unassigned] = await Promise.all([
        getAssignedOrders(deliveryBoyId),
        getUnassignedOrders(),
      ]);

      setAssignedOrders(assigned || []);
      setUnassignedOrders(unassigned || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  }, [deliveryBoyId]);

  useEffect(() => {
    if (deliveryBoyId) fetchOrders();
  }, [deliveryBoyId, fetchOrders]);

  const handleAccept = async (orderId) => {
    const result = await acceptOrder(orderId, deliveryBoyId);
    if (result) {
      fetchOrders();
    }
  };

  // ✅ Extract unique restaurants
  const getRestaurantsFromOrder = (order) => {
    if (!order?.order_items) return [];

    const map = new Map();

    order.order_items.forEach((item) => {
      const restaurant = item?.dish?.restaurant;
      if (restaurant && !map.has(restaurant.id)) {
        map.set(restaurant.id, restaurant);
      }
    });

    return Array.from(map.values());
  };

  const getUserAddress = (order) => {
    return order?.user?.addresses?.[0] || null;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header title="Delivery Dashboard" />

      {/* Available Orders */}
      <h2 className="text-xl font-bold mb-4 mt-6">Available Orders</h2>

      {loading ? (
        <p>Loading...</p>
      ) : unassignedOrders.length === 0 ? (
        <p className="text-gray-500 mb-6">
          No available orders right now.
        </p>
      ) : (
        <div className="grid gap-4 mb-10">
          {unassignedOrders.map((order) => (
            <OrderCard
              key={order.id}
              orderNumber={order.order_number}
              userName={order?.user?.name}
              userAddress={getUserAddress(order)}
              restaurants={getRestaurantsFromOrder(order)}
              status={order.status}
              buttonText="Accept Order"
              onButtonClick={() => handleAccept(order.id)}
            />
          ))}
        </div>
      )}

      {/* My Orders */}
      <h2 className="text-xl font-bold mb-4">My Orders</h2>

      {loading ? (
        <p>Loading...</p>
      ) : assignedOrders.length === 0 ? (
        <p className="text-gray-500">
          You have no assigned orders.
        </p>
      ) : (
        <div className="grid gap-4">
          {assignedOrders.map((order) => (
            <OrderCard
              key={order.id}
              orderNumber={order.order_number}
              userName={order?.user?.name}
              userAddress={getUserAddress(order)}
              restaurants={getRestaurantsFromOrder(order)}
              status={order.status}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
