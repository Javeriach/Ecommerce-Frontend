import React from "react";

const orders = [
  {
    id: "#12345",
    image: "/table.jpg",
    name: "Benington Dining Table Black",
    price: "$34.00",
    date: "12 Feb 2024",
    quantity: 1,
    status: "Delivered",
  },
  {
    id: "#12346",
    image: "/chair.jpg",
    name: "Atelier Fuji NC Chair",
    price: "$27.00",
    date: "10 Feb 2024",
    quantity: 2,
    status: "Shipped",
  },
  {
    id: "#12347",
    image: "/sofa.jpg",
    name: "Juliet Rowley Lounge Sofa",
    price: "$17.00",
    date: "08 Feb 2024",
    quantity: 1,
    status: "Processing",
  },
];

function MyOrders() {
    return (
        <div className="min-h-screen bg-gray-100 p-4">
          <h1 className="text-2xl font-bold text-center mb-4">My Order History</h1>
          <div className="max-w-2xl mx-auto space-y-4">
            {orders.map((order, index) => (
              <div
                key={index}
                className="flex items-center bg-white p-4 rounded-lg shadow-md"
              >
                <img
                  src={order.image}
                  alt={order.name}
                  className="w-20 h-20 rounded-md object-cover"
                />
                <div className="flex-1 ml-4">
                  <h2 className="text-lg font-semibold">{order.name}</h2>
                  <p className="text-sm text-gray-600">Order ID: {order.id}</p>
                  <p className="text-sm text-gray-600">Date: {order.date}</p>
                  <p className="text-sm text-gray-600">Quantity: {order.quantity}</p>
                  <p className="text-md font-bold">{order.price}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-lg ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Shipped"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
}

export default MyOrders


