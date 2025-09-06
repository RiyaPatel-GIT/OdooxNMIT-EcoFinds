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
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={closeProductModal}
      ></div>

      {/* Modal Box */}
      <div className="relative bg-gray-800 rounded-2xl shadow-xl p-6 w-[400px] z-50">
        {/* Close Button */}
        <button
          onClick={closeProductModal}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">{selectedProduct.name}</h2>
        <img
          src={selectedProduct.image}
          alt={selectedProduct.name}
          className="rounded-xl mb-4"
        />
        <p className="mb-6 text-gray-300">{selectedProduct.description}</p>
        <p className="text-lg font-semibold text-indigo-400 mb-6">
          ₹ {selectedProduct.price}
        </p>
        <button
          onClick={handleAddToCart}
          className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-semibold transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetailModal;
