// src/utils/locationTracker.jsx
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = "YOUR_MAPBOX_ACCESS_TOKEN";

const LocationTracker = ({ restaurant, userAddress }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [currentLocation, setCurrentLocation] = useState([0, 0]);

  // Track delivery partner location
  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        setCurrentLocation([longitude, latitude]);
      },
      (err) => console.error(err),
      { enableHighAccuracy: true, maximumAge: 1000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // Initialize map
  useEffect(() => {
    if (map.current || !restaurant || !userAddress) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [
        restaurant.longitude || 78.133196,
        restaurant.latitude || 8.803822,
      ],
      zoom: 12,
    });

    // Add markers
    const restaurantMarker = new mapboxgl.Marker({ color: "red" })
      .setLngLat([restaurant.longitude, restaurant.latitude])
      .setPopup(new mapboxgl.Popup().setText("Restaurant"))
      .addTo(map.current);

    const userMarker = new mapboxgl.Marker({ color: "green" })
      .setLngLat([userAddress.longitude, userAddress.latitude])
      .setPopup(new mapboxgl.Popup().setText("Customer"))
      .addTo(map.current);

    const deliveryMarker = new mapboxgl.Marker({ color: "blue" })
      .setLngLat(currentLocation)
      .setPopup(new mapboxgl.Popup().setText("You"))
      .addTo(map.current);

    // Update delivery marker as current location changes
    const interval = setInterval(() => {
      if (deliveryMarker && currentLocation) {
        deliveryMarker.setLngLat(currentLocation);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [restaurant, userAddress, currentLocation]);

  return (
    <div
      ref={mapContainer}
      style={{ width: "100%", height: "500px", borderRadius: "10px" }}
    />
  );
};

export default LocationTracker;
