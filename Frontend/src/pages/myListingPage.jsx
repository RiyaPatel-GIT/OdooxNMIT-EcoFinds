import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate, useLocation } from "react-router-dom";
import ProductFormModal from "../components/ProductFormModal";
import MessageModal from "../components/MessageModal";

const MyListingsPage = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [messageModal, setMessageModal] = useState({ isOpen: false, message: '' });

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

  // Handlers for edit and delete
  const handleEdit = (id) => {
    const productToEdit = listings.find(item => item.id === id);
    setEditingProduct(productToEdit);
    setIsFormModalOpen(true);
  };

  const handleSaveProduct = (updatedProduct) => {
    if (updatedProduct.id) {
      // Editing existing product
      setListings(listings.map(item => item.id === updatedProduct.id ? updatedProduct : item));
    } else {
      // Adding new product
      const newId = Math.max(...listings.map(item => item.id)) + 1;
      setListings([...listings, { ...updatedProduct, id: newId, status: "Available", seller: "Current User" }]);
    }
    setIsFormModalOpen(false);
    setEditingProduct(null);
    setMessageModal({ isOpen: true, message: updatedProduct.id ? 'Product updated successfully!' : 'Product added successfully!' });
  };

  const handleCloseModal = () => {
    setIsFormModalOpen(false);
    setEditingProduct(null);
  };

  const handleDelete = (id) => {
    setListings(listings.filter(item => item.id !== id));
    setMessageModal({ isOpen: true, message: 'Listing deleted successfully!' });
  };

  // Filter by search
  const filteredListings = listings.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-3 md:p-5 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-6 drop-shadow-sm">EcoMarketPlace</h1>
      <main className="container mx-auto max-w-5xl mt-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-extrabold text-blue-700 mb-2 drop-shadow-sm">My Listings</h2>
          <div className="flex space-x-3">
            <button
              onClick={() => { setEditingProduct(null); setIsFormModalOpen(true); }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md font-semibold text-sm transition shadow-md"
            >
              + Add New
            </button>
            <button
              onClick={() => navigate("/cart")}
              className="relative bg-gray-200 hover:bg-gray-300 p-2 rounded-full text-gray-700 text-sm transition shadow-md"
            >
              🛒
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs px-1 rounded-full text-white">
                2
              </span>
            </button>
          </div>
        </div>

        {/* Search & Actions */}
        <div className="space-y-2 mb-4 flex space-x-2 shadow-lg rounded-lg overflow-hidden bg-white">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-grow p-3 text-gray-700 border-none focus:outline-none text-sm"
          />
          <button className="bg-blue-600 hover:bg-blue-700 px-5 py-2.5 text-white font-semibold text-sm transition duration-300 ease-in-out">
            Search
          </button>
        </div>
        <div className="mb-8 flex flex-wrap justify-start gap-3">
          <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-full transition duration-300 ease-in-out text-gray-700 text-xs font-medium shadow-md">
            Sort
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-full transition duration-300 ease-in-out text-gray-700 text-xs font-medium shadow-md">
            Filter
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-full transition duration-300 ease-in-out text-gray-700 text-xs font-medium shadow-md">
            Group By
          </button>
        </div>

        {/* Listings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pb-10">
          {filteredListings.length > 0 ? (
            filteredListings.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full flex flex-col border border-gray-200 transform hover:-translate-y-1"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-36 object-cover"
                />
                <div className="p-3 flex-grow">
                  <h3 className="text-base font-bold mb-1 text-gray-800">{item.name}</h3>
                  <p className="text-blue-600 font-extrabold mb-1 text-lg">₹ {item.price}</p>
                  <p className="text-gray-500 text-xs">Category: {item.category}</p>
                  <p className="text-gray-500 text-xs">
                    Status:{" "}
                    <span
                      className={`${
                        item.status === "Available"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </p>
                  <p className="text-gray-500 text-xs">Seller: {item.seller}</p>
                </div>
                <div className="p-3 border-t border-gray-100 bg-gray-50 flex justify-end space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(item.id);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-3 rounded-md font-semibold text-sm transition duration-300 ease-in-out shadow-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item.id);
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white py-1.5 px-3 rounded-md font-semibold text-sm transition duration-300 ease-in-out shadow-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No products found.</p>
          )}
        </div>
      </main>
      {/* Modal (context controlled) */}
      {isFormModalOpen && (
        <ProductFormModal
          key={editingProduct ? editingProduct.id : 'add-new'} // Force remount on product change or add new
          initialData={editingProduct || {}}
          onClose={handleCloseModal}
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

export default MyListingsPage;
