import React from "react";
import { useAuth } from "../context/authContext";
import { useModal } from "../context/ModalContext";

const ProductDetailModal = ({ addToCart }) => {
  const { isModalOpen, selectedProduct, closeProductModal } = useModal();
  const { isLoggedIn } = useAuth();

  if (!isModalOpen || !selectedProduct) return null;

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      alert("Please log in to add items to the cart."); // Or navigate("/login")
      return;
    }
    addToCart(selectedProduct);
    closeProductModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-3 md:p-5">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeProductModal}
      ></div>

      {/* Modal Box */}
      <div className="relative bg-white rounded-xl shadow-xl p-6 w-full max-w-lg z-50 text-gray-800">
        {/* Close Button */}
        <button
          onClick={closeProductModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl transition-colors duration-300"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold mb-3 text-blue-700">{selectedProduct.name}</h2>
        <img
          src={selectedProduct.image}
          alt={selectedProduct.name}
          className="w-full h-64 object-cover rounded-lg mb-4 border border-gray-200"
        />
        <div className="flex justify-between items-center mb-2">
          <p className="text-2xl font-extrabold text-blue-600">₹ {selectedProduct.price}</p>
          <p className="text-sm text-gray-500">Category: <span className="font-semibold text-gray-700">{selectedProduct.category}</span></p>
        </div>
        <p className="mb-6 text-gray-700 text-base">{selectedProduct.description}</p>
        <button
          onClick={handleAddToCart}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold text-white text-lg transition-all duration-300 shadow-lg transform hover:scale-105"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetailModal;
