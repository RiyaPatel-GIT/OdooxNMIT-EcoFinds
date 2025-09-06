import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate, useLocation } from "react-router-dom";

const MyListingsPage = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to login if not logged in
  if (!isLoggedIn) {
    navigate("/login", { state: { from: location.pathname } });
    return null;
  }

  // Dummy data for listings
  const [listings, setListings] = useState([
    {
      id: 1,
      name: "iPhone 12",
      price: 45000,
      category: "Electronics",
      status: "Available",
      seller: "John Doe",
      image: "https://via.placeholder.com/100"
    },
    {
      id: 2,
      name: "Gaming Laptop",
      price: 75000,
      category: "Computers",
      status: "Sold",
      seller: "Alice",
      image: "https://via.placeholder.com/100"
    },
    {
      id: 3,
      name: "Books Collection",
      price: 1200,
      category: "Books",
      status: "Available",
      seller: "Mark",
      image: "https://via.placeholder.com/100"
    }
  ]);

  const [search, setSearch] = useState("");

  // Filter by search
  const filteredListings = listings.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-[450px]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">My Listings</h2>
          <div className="flex space-x-3">
            <button
              onClick={() => navigate("/add-product")}
              className="bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded-lg text-sm"
            >
              + Add New
            </button>
            <button
              onClick={() => navigate("/cart")}
              className="relative bg-gray-700 p-2 rounded-full hover:bg-gray-600"
            >
              🛒
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs px-1 rounded-full">
                2
              </span>
            </button>
          </div>
        </div>

        {/* Search & Actions */}
        <div className="space-y-2 mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex space-x-2">
            <button className="flex-1 bg-gray-700 px-2 py-1 rounded-lg hover:bg-gray-600">
              Sort
            </button>
            <button className="flex-1 bg-gray-700 px-2 py-1 rounded-lg hover:bg-gray-600">
              Filter
            </button>
            <button className="flex-1 bg-gray-700 px-2 py-1 rounded-lg hover:bg-gray-600">
              Group By
            </button>
          </div>
        </div>

        {/* Listings */}
        <div className="space-y-4">
          {filteredListings.length > 0 ? (
            filteredListings.map((item) => (
              <div
                key={item.id}
                className="flex items-center bg-gray-700 p-3 rounded-lg"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-300">₹ {item.price}</p>
                  <p className="text-sm">Category: {item.category}</p>
                  <p className="text-sm">
                    Status:{" "}
                    <span
                      className={`${
                        item.status === "Available"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {item.status}
                    </span>
                  </p>
                  <p className="text-sm text-gray-400">Seller: {item.seller}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyListingsPage;
