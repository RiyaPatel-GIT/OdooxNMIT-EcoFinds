import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import AddProductPage from "./pages/AddProductPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import UserProfilePage from "./pages/UserProfilePage.jsx"; 
import MyListingPage from "./pages/MyListingPage.jsx"; // Ensure this exists
import Navbar from "./components/Navbar.jsx"; 
import Footer from "./components/Footer.jsx"; 

import { AuthProvider } from "./context/authContext.jsx";
import { ModalProvider } from "./context/ModalContext.jsx";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  const removeFromCart = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <AuthProvider>
      <ModalProvider>
        <Router>
          <Navbar />
          {/* Main Routes */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/about" element={<div>About Page</div>} />
            <Route path="/contact" element={<div>Contact Page</div>} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route
              path="/cart"
              element={<CartPage cartItems={cartItems} removeFromCart={removeFromCart} />}
            />
            <Route path="/add-product" element={<AddProductPage />} />
            <Route path="/my-listing" element={<MyListingPage />} />
          </Routes>
          <Footer />
        </Router>
      </ModalProvider>
    </AuthProvider>
  );
}

export default App;
