import React from 'react';

const CartPage = ({ cartItems, removeFromCart }) => {
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price || 0),
    0
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-[400px]">
        <h2 className="text-2xl font-bold mb-6 text-center">🛒 Cart Page</h2>

        {/* Cart Items */}
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-400">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-700 p-3 rounded-lg"
              >
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-300">₹ {item.price}</p>
                </div>
                <button
                  onClick={() => removeFromCart(index)}
                  className="text-red-400 hover:text-red-600 font-bold"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Total Price */}
        <div className="mt-6 text-lg font-semibold text-right">
          Total: ₹ {totalPrice.toFixed(2)}
        </div>

        {/* Checkout Button */}
        <button
          disabled={cartItems.length === 0}
          onClick={() => alert("Proceeding to checkout...")}
          className={`w-full mt-4 py-2 px-4 rounded-xl font-semibold transition ${
            cartItems.length === 0
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
