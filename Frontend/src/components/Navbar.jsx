import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart } from "lucide-react"; // Import icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger icon for all screen sizes */}
      <div className="fixed top-4 left-4 z-50">
        <button onClick={toggleSidebar} className="text-gray-800 focus:outline-none">
          {isOpen ? <div> </div>  : <Menu size={28} />}
        </button>
      </div>

      {/* Sidebar */}
      <nav className={`fixed top-0 left-0 h-full bg-white text-gray-800 w-64 p-5 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-40 shadow-lg`}>
        <div className="flex justify-between items-center mb-6">
          <Link to="/" className="text-2xl font-bold text-blue-700">EcoMarketPlace</Link>
          <button onClick={toggleSidebar} className="text-gray-800 focus:outline-none">
            <X size={28} />
          </button>
        </div>
        <ul className="space-y-4">
          <li><Link to="/" className="block py-2 px-3 rounded hover:bg-gray-100 hover:text-blue-600 transition-colors" onClick={() => { console.log('Home clicked'); toggleSidebar(); }}>Home</Link></li>
          <li><Link to="/my-listing" className="block py-2 px-3 rounded hover:bg-gray-100 hover:text-blue-600 transition-colors" onClick={() => { console.log('My Listings clicked'); toggleSidebar(); }}>My Listings</Link></li>
          <li><Link to="/add-product" className="block py-2 px-3 rounded hover:bg-gray-100 hover:text-blue-600 transition-colors" onClick={() => { console.log('Add Product clicked'); toggleSidebar(); }}>Add Product</Link></li>
          <li><Link to="/profile" className="block py-2 px-3 rounded hover:bg-gray-100 hover:text-blue-600 transition-colors" onClick={() => { console.log('Profile clicked'); toggleSidebar(); }}>Profile</Link></li>
          <li><Link to="/cart" className="block py-2 px-3 rounded hover:bg-gray-100 hover:text-blue-600 transition-colors" onClick={() => { console.log('Cart clicked'); toggleSidebar(); }}>
            <div className="flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2" /> Cart
              <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">0</span>
            </div>
          </Link></li>
          
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
