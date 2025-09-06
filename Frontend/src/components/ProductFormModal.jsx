import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductFormModal = ({ initialData = {}, onClose, onSave }) => {
  const [formData, setFormData] = useState(() => ({
    name: initialData.name || '',
    description: initialData.description || '',
    price: initialData.price || '',
    category: initialData.category || '',
    image: initialData.image || '',
  }));
  const [errors, setErrors] = useState({});

  const categories = ["Electronics", "Books", "Home Goods", "Sports", "Fashion"];

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name || formData.name.length < 3) {
      newErrors.name = "Product name must be at least 3 characters long.";
    }
    if (!formData.description || formData.description.split(' ').filter(word => word !== '').length < 10) {
      newErrors.description = "Product description must be at least 10 words long.";
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = "Price must be a positive number.";
    }
    if (!formData.category) {
      newErrors.category = "Please select a category.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear specific error when field changes
    if (errors[name]) {
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[name];
        return updatedErrors;
      });
    }
  };

  const handlePriceChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9.]/g, ''); // Remove non-numeric except dot
    setFormData((prevData) => ({ ...prevData, price: rawValue }));
    if (errors.price) {
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors.price;
        return updatedErrors;
      });
    }
  };

  const formatPrice = (value) => {
    if (!value) return '';
    const numberValue = parseFloat(value);
    if (isNaN(numberValue)) return value;
    return `₹ ${numberValue.toLocaleString('en-IN')}`;
  };

  const handlePriceBlur = () => {
    const formattedPrice = formatPrice(formData.price);
    setFormData((prevData) => ({ ...prevData, price: formattedPrice }));
  };

  const handlePriceFocus = () => {
    // Remove formatting when focusing to make editing easier
    const rawValue = String(formData.price).replace(/[^0-9.]/g, '');
    setFormData((prevData) => ({ ...prevData, price: rawValue }));
  };

  const handleImageUpload = () => {
    // This would ideally open a file picker or camera.
    // For now, we'll just simulate by setting a placeholder image.
    setFormData((prevData) => ({
      ...prevData,
      image: "https://via.placeholder.com/150", // Dummy image URL
    }));
    console.log('Image upload simulated');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-3 md:p-5">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Box */}
      <main className="relative container mx-auto max-w-2xl p-6 bg-white rounded-xl shadow-lg z-50 text-gray-800">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onClose} // Close button for the modal
            className="text-blue-600 hover:text-blue-800 font-semibold flex items-center space-x-1 transition-colors duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back</span>
          </button>
          <h2 className="text-4xl font-extrabold text-blue-700 text-center drop-shadow-sm">{initialData.id ? "Edit Product" : "Add New Product"}</h2>
          <div></div> {/* For spacing */}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <input
              type="text"
              name="name"
              placeholder="Product Title"
              value={formData.name}
              onChange={handleChange}
              required
              className={`w-full px-4 py-3 rounded-lg bg-gray-100 border ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800`}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div className="space-y-1">
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className={`w-full px-4 py-3 rounded-lg bg-gray-100 border ${errors.category ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800`}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
          </div>
          <div className="space-y-1">
            <textarea
              name="description"
              placeholder="Product Description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className={`w-full px-4 py-3 rounded-lg bg-gray-100 border ${errors.description ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800`}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>
          <div className="space-y-1">
            <input
              type="text"
              name="price"
              placeholder="Price in ₹"
              value={formData.price}
              onChange={handlePriceChange}
              onBlur={handlePriceBlur}
              onFocus={handlePriceFocus}
              required
              className={`w-full px-4 py-3 rounded-lg bg-gray-100 border ${errors.price ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800`}
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
          </div>
          {/* Image Upload Button */}
          <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-100 cursor-pointer hover:border-blue-500 transition-colors duration-300"
               onClick={handleImageUpload}>
            {formData.image ? (
              <img src={formData.image} alt="Product Preview" className="max-h-48 object-contain mb-3 rounded-md" />
            ) : (
              <div className="flex flex-col items-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 0115.9 6L16 6a5 5 0 014 4v2a3 3 0 00-3 3H6.5a4.5 4.5 0 00-4.5 4.5v.5a.5.5 0 00.5.5h15a.5.5 0 00.5-.5V19a4 4 0 01-4 4H7a4 4 0 01-4-4v-.5a.5.5 0 00.5-.5z" />
                </svg>
                <p className="text-lg font-semibold">+ Add Image (Placeholder)</p>
                <p className="text-sm">Click to add a product image</p>
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={Object.keys(errors).length > 0}
            className={`w-full py-3 px-4 rounded-xl font-semibold text-white text-lg transition-all duration-300 shadow-lg ${
              Object.keys(errors).length > 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 transform hover:scale-105'
            }`}
          >
            {initialData.id ? "Save Changes" : "Submit Listing"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default ProductFormModal;
