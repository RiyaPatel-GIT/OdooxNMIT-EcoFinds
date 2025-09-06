import React, { useState } from "react";
import { useModal } from "../context/ModalContext.jsx";
import { useAuth } from "../context/authContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import ProductDetailModal from "../components/ProductDetailModal.jsx";

const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isModalOpen, selectedProduct, openProductModal, closeProductModal } = useModal();
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const products = [
    { id: 1, name: "Product Name 1", description: "Short description of product 1.", price: "123.10", image: "https://via.placeholder.com/300x200" },
    { id: 2, name: "Product Name 2", description: "Short description of product 2.", price: "123.20", image: "https://via.placeholder.com/300x200" },
    { id: 3, name: "Product Name 3", description: "Short description of product 3.", price: "123.30", image: "https://via.placeholder.com/300x200" },
    { id: 4, name: "Product Name 4", description: "Short description of product 4.", price: "123.40", image: "https://via.placeholder.com/300x200" },
    { id: 5, name: "Product Name 5", description: "Short description of product 5.", price: "123.50", image: "https://via.placeholder.com/300x200" },
    { id: 6, name: "Product Name 6", description: "Short description of product 6.", price: "123.60", image: "https://via.placeholder.com/300x200" },
    { id: 7, name: "Product Name 7", description: "Short description of product 7.", price: "123.70", image: "https://via.placeholder.com/300x200" },
    { id: 8, name: "Product Name 8", description: "Short description of product 8.", price: "123.80", image: "https://via.placeholder.com/300x200" },
  ];

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const handleSort = () => console.log("Sort button clicked (simulated)");
  const handleFilter = () => console.log("Filter button clicked (simulated)");
  const handleGroupby = () => console.log("Groupby button clicked (simulated)");

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-3 md:p-5 relative">
      <div className="absolute top-3 right-3 flex space-x-2">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md font-semibold text-sm transition shadow-md">
              Login
            </Link>
            <Link to="/signup" className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md font-semibold text-sm transition shadow-md">
              Sign Up
            </Link>
          </>
        ) : (
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md font-semibold text-sm transition shadow-md"
          >
            Logout
          </button>
        )}
      </div>
      <main className="container mx-auto max-w-5xl mt-10">
        {/* Title */}
        <div className="my-6 text-center">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-2 drop-shadow-sm">EcoMarketPlace</h1>
          <p className="text-lg text-gray-600">Your one-stop shop for second-hand treasures!</p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="mb-8 flex space-x-2 shadow-lg rounded-lg overflow-hidden bg-white">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="flex-grow p-3 text-gray-700 border-none focus:outline-none text-sm"
          />
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-5 py-2.5 text-white font-semibold text-sm transition duration-300 ease-in-out">
            Search
          </button>
        </form>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          <button onClick={handleSort} className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-full transition duration-300 ease-in-out text-gray-700 text-xs font-medium shadow-md">
            Sort (Simulated)
          </button>
          <button onClick={handleFilter} className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-full transition duration-300 ease-in-out text-gray-700 text-xs font-medium shadow-md">
            Filter (Simulated)
          </button>
          <button onClick={handleGroupby} className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-full transition duration-300 ease-in-out text-gray-700 text-xs font-medium shadow-md">
            Group By (Simulated)
          </button>
        </div>

        {/* Banner */}
        <div className="mb-10 bg-gradient-to-r from-blue-500 to-indigo-600 h-48 flex items-center justify-center rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-500 ease-in-out">
          <p className="text-white text-3xl font-extrabold text-center leading-tight">Discover Amazing Deals <br/> on Second-Hand Treasures!</p>
        </div>

        {/* Categories */}
        <h2 className="text-2xl font-bold text-center mb-5 text-blue-700">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-10">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer text-center border border-gray-200 transform hover:-translate-y-1"
            >
              <h3 className="text-lg font-semibold mb-1 text-gray-800">Category {i}</h3>
              <p className="text-gray-500 text-xs">Explore unique items.</p>
            </div>
          ))}
        </div>

        {/* Products */}
        <h2 className="text-2xl font-bold text-center mb-5 text-blue-700">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pb-10">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full flex flex-col border border-gray-200 transform hover:-translate-y-1"
              onClick={() => openProductModal(product)}
            >
              <img src={product.image} alt={product.name} className="w-full h-36 object-cover" />
              <div className="p-3 flex-grow">
                <h3 className="text-base font-bold mb-1 text-gray-800">{product.name}</h3>
                <p className="text-blue-600 font-extrabold mb-1 text-lg">₹ {product.price}</p>
                <p className="text-gray-500 text-xs">{product.description}</p>
              </div>
              <div className="p-3 border-t border-gray-100 bg-gray-50">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openProductModal(product);
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-1.5 rounded-md font-semibold text-sm transition duration-300 ease-in-out shadow-md"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal (context controlled) */}
      {isModalOpen && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={closeProductModal}
        />
      )}
    </div>
  );
};

export default LandingPage;
