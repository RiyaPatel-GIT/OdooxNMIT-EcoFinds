import React, { createContext, useState, useContext } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openProductModal = (product) => {
    if (!product) {
      console.error("ModalContext: Tried to open modal with undefined product");
      return;
    }
    console.log("ModalContext: Opening modal for product:", product.name);
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeProductModal = () => {
    console.log("ModalContext: Closing modal.");
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{ isModalOpen, selectedProduct, openProductModal, closeProductModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
