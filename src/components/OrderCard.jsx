// src/components/OrderCard.jsx
const OrderCard = ({
  orderNumber,
  userName,
  userAddress,
  restaurants,
  status,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h3 className="font-semibold mb-2">Order #{orderNumber}</h3>

      {/* 🔥 Multi Restaurant Pickup Details */}
      {restaurants && restaurants.length > 0 ? (
        restaurants.map((rest) => (
          <div key={rest.id} className="mb-3">
            <p className="text-gray-800 font-semibold">Pickup From:</p>
            <p className="text-gray-700">{rest.name}</p>
            <p className="text-gray-600">{rest.address}</p>
            {rest.latitude && rest.longitude && (
              <p className="text-gray-500 text-sm">
                Lat: {rest.latitude}, Lng: {rest.longitude}
              </p>
            )}
          </div>
        ))
      ) : (
        <p className="text-red-500 mb-2">Restaurant not linked yet</p>
      )}

      {/* Customer Delivery Details */}
      {userName && userAddress && (
        <div className="mb-3">
          <p className="text-gray-800 font-semibold">Deliver To:</p>
          <p className="text-gray-700">{userName}</p>
          <p className="text-gray-600">
            {userAddress.address_line}, {userAddress.city}, {userAddress.state}
          </p>
          {userAddress.latitude && userAddress.longitude && (
            <p className="text-gray-500 text-sm">
              Lat: {userAddress.latitude}, Lng: {userAddress.longitude}
            </p>
          )}
        </div>
      )}

      {/* Status */}
      {status && (
        <p className="text-green-600 font-semibold mb-2">
          Status: {status}
        </p>
      )}

      {/* Accept Button */}
      {buttonText && onButtonClick && (
        <button
          onClick={onButtonClick}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default OrderCard;
