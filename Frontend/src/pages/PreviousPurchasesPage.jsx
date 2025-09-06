import React from 'react';
import { useNavigate } from 'react-router-dom';

const PreviousPurchasesPage = () => {
  const navigate = useNavigate();

  const previousPurchases = [
    {
      id: 1,
      name: "Vintage Camera",
      price: 15000,
      category: "Electronics",
      image: "https://via.placeholder.com/100",
      purchasedOn: "2023-01-15"
    },
    {
      id: 2,
      name: "Antique Watch",
      price: 25000,
      category: "Accessories",
      image: "https://via.placeholder.com/100",
      purchasedOn: "2023-02-20"
    },
    {
      id: 3,
      name: "Rare Comic Book",
      price: 5000,
      category: "Books",
      image: "https://via.placeholder.com/100",
      purchasedOn: "2023-03-10"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-3 md:p-5 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-6 drop-shadow-sm">EcoMarketPlace</h1>
      <main className="container mx-auto max-w-5xl mt-10 p-6 bg-white rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:text-blue-800 font-semibold flex items-center space-x-1 transition-colors duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back</span>
          </button>
          <h2 className="text-4xl font-extrabold text-blue-700 text-center drop-shadow-sm">Previous Purchases</h2>
          <div></div> {/* For spacing */}
        </div>

        {previousPurchases.length === 0 ? (
          <p className="text-center text-gray-500">No previous purchases found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pb-10">
            {previousPurchases.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 h-full flex flex-col"
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
                  <p className="text-gray-500 text-xs">Purchased On: {item.purchasedOn}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default PreviousPurchasesPage;
