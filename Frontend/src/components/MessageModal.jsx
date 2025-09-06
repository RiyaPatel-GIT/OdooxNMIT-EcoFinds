import React from 'react';

const MessageModal = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-3 md:p-5">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Box */}
      <div className="relative bg-white rounded-xl shadow-xl p-6 w-full max-w-sm text-gray-800 text-center z-50">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Message</h2>
        <p className="text-lg text-gray-700 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default MessageModal;
