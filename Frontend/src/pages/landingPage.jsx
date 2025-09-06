import React, { useState, useRef } from "react";
import { useModal } from "../context/ModalContext.jsx";
import { useAuth } from "../context/authContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import ProductDetailModal from "../components/ProductDetailModal.jsx";
import ProductFormModal from "../components/ProductFormModal";
import MessageModal from "../components/MessageModal";

const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null); // New state for selected category
  const { isModalOpen, selectedProduct, openProductModal, closeProductModal } = useModal();
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [messageModal, setMessageModal] = useState({ isOpen: false, message: '' });

  const categoryScrollRef = useRef(null);

  const products = [
    { id: 1, name: "Product Name 1", description: "Short description of product 1.", price: "123.10", image: "https://via.placeholder.com/300x200", category: "Electronics" },
    { id: 2, name: "Product Name 2", description: "Short description of product 2.", price: "123.20", image: "https://via.placeholder.com/300x200", category: "Books" },
    { id: 3, name: "Product Name 3", description: "Short description of product 3.", price: "123.30", image: "https://via.placeholder.com/300x200", category: "Home Goods" },
    { id: 4, name: "Product Name 4", description: "Short description of product 4.", price: "123.40", image: "https://via.placeholder.com/300x200", category: "Sports" },
    { id: 5, name: "Product Name 5", description: "Short description of product 5.", price: "123.50", image: "https://via.placeholder.com/300x200", category: "Fashion" },
    { id: 6, name: "Product Name 6", description: "Short description of product 6.", price: "123.60", image: "https://via.placeholder.com/300x200", category: "Electronics" },
    { id: 7, name: "Product Name 7", description: "Short description of product 7.", price: "123.70", image: "https://via.placeholder.com/300x200", category: "Books" },
    { id: 8, name: "Product Name 8", description: "Short description of product 8.", price: "123.80", image: "https://via.placeholder.com/300x200", category: "Home Goods" },
  ];

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const handleSort = () => console.log("Sort button clicked (simulated)");
  const handleFilter = () => console.log("Filter button clicked (simulated)");
  const handleGroupby = () => console.log("Groupby button clicked (simulated)");

  const handleAddProduct = () => {
    setIsFormModalOpen(true);
  };

  const handleSaveProduct = (newProduct) => {
    console.log("New product added:", newProduct);
    // In a real app, you would send this to your backend and then refresh the product list.
    // For now, we'll just show a message.
    setMessageModal({ isOpen: true, message: 'Product added successfully!' });
    setIsFormModalOpen(false);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
  };

  const scrollRight = () => {
    if (categoryScrollRef.current) {
      categoryScrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const scrollLeft = () => {
    if (categoryScrollRef.current) {
      categoryScrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

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
          {isLoggedIn && (
            <button
              onClick={handleAddProduct}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 font-semibold text-sm transition duration-300 ease-in-out flex items-center space-x-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Add New</span>
            </button>
          )}
        </form>

        {/* Banner */}
        <div className="mb-10 bg-gradient-to-r from-blue-500 to-indigo-600 h-48 flex items-center justify-center rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-500 ease-in-out">
          <p className="text-white text-3xl font-extrabold text-center leading-tight">Discover Amazing Deals <br/> on Second-Hand Treasures!</p>
        </div>

        {/* Categories */}
        <h2 className="text-2xl font-bold text-center mb-5 text-blue-700">Shop by Category</h2>
        <div className="relative">
          <div
            className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide"
            ref={categoryScrollRef}
          >
            {[
              { name: "Electronics", description: "Gadgets and gizmos" },
              { name: "Books", description: "Stories and knowledge" },
              { name: "Home Goods", description: "Essentials for your home" },
              { name: "Sports", description: "Gear for your active life" },
              { name: "Fashion", description: "Style for every occasion" },
            ].map((category, index) => (
              <div
                key={index}
                className={`flex-shrink-0 w-48 p-5 rounded-lg shadow-lg transition-shadow duration-300 cursor-pointer text-center border transform hover:-translate-y-1 ${selectedCategory === category.name ? 'bg-blue-200 border-blue-500' : 'bg-white border-gray-200 hover:shadow-xl'}`}
                onClick={() => setSelectedCategory(category.name)} // Set selected category on click
              >
                <h3 className="text-lg font-semibold mb-1 text-gray-800">{category.name}</h3>
                <p className="text-gray-500 text-xs">{category.description}</p>
              </div>
            ))}
          </div>
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-md transition-colors duration-300"
            >
              Clear Filter
            </button>
          )}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* Products */}
        <div className="flex justify-between items-center mb-5 mt-10">
          <h2 className="text-2xl font-bold text-blue-700">Featured Products</h2>
          <div className="flex flex-wrap justify-end gap-3">
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
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pb-10">
          {filteredProducts.map((product) => (
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

      {isFormModalOpen && (
        <ProductFormModal
          onClose={handleCloseFormModal}
          onSave={handleSaveProduct}
        />
      )}

      <MessageModal
        message={messageModal.message}
        onClose={() => setMessageModal({ isOpen: false, message: '' })}
      />
    </div>
  );
};

export default LandingPage;
