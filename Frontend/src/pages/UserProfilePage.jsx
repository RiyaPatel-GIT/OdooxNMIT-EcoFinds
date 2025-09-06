import React from 'react';

const UserProfilePage = () => {
  const user = {
    profilePicture: "https://via.placeholder.com/150",
    name: "John Doe",
    email: "john.doe@example.com",
    otherInfo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  };

  const handleEditProfile = () => {
    console.log('Edit Profile button clicked (simulated)');
  };

  const handleMyListings = () => {
    console.log('My Listings button clicked (simulated)');
    // Navigate to my listings page
  };

  const handleMyPurchases = () => {
    console.log('My Purchases button clicked (simulated)');
    // Navigate to my purchases page
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">User Profile / Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-6">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="w-24 h-24 rounded-full mr-6 object-cover"
          />
          <div>
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
          <button
            onClick={handleEditProfile}
            className="ml-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Edit Profile (Simulated)
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Other Information</h3>
          <p className="text-gray-700">{user.otherInfo}</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Navigation</h3>
          <button
            onClick={handleMyListings}
            className="block w-full text-left bg-gray-100 p-3 rounded-lg mb-2 hover:bg-gray-200 transition duration-300"
          >
            My Listings (Simulated)
          </button>
          <button
            onClick={handleMyPurchases}
            className="block w-full text-left bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition duration-300"
          >
            My Purchases (Simulated)
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
