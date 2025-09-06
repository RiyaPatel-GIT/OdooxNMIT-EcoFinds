import React from 'react';
import { useNavigate } from 'react-router-dom';

const CartPage = ({ cartItems, removeFromCart }) => {
  const navigate = useNavigate();
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price || 0),
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-3 md:p-5 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-6 drop-shadow-sm">EcoMarketPlace</h1>
      <main className="container mx-auto max-w-2xl mt-10 p-6 bg-white rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)} // Go back to the previous page
            className="text-blue-600 hover:text-blue-800 font-semibold flex items-center space-x-1 transition-colors duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back</span>
          </button>
          <h2 className="text-4xl font-extrabold text-blue-700 text-center drop-shadow-sm">🛒 Your Cart</h2>
          <div></div> {/* For spacing */}
        </div>

        {/* Cart Items */}
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md border border-gray-200"
              >
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                  <p className="text-blue-600 font-bold text-md">₹ {item.price}</p>
                </div>
                <button
                  onClick={() => removeFromCart(index)}
                  className="text-red-600 hover:text-red-700 font-bold text-xl transition-colors duration-300"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Total Price */}
        <div className="mt-8 text-2xl font-extrabold text-right text-blue-700">
          Total: ₹ {totalPrice.toFixed(2)}
        </div>

        {/* Checkout Button */}
        <button
          disabled={cartItems.length === 0}
          onClick={() => alert("Proceeding to checkout...")}
          className={`w-full mt-6 py-3 px-4 rounded-xl font-semibold text-white text-lg transition-all duration-300 shadow-lg ${
            cartItems.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 transform hover:scale-105"
          }`}
        >
          Checkout
        </button>
      </main>
    </div>
  );
};

export default CartPage;
