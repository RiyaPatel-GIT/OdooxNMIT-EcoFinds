import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    profilePicture: "https://via.placeholder.com/150",
    name: "John Doe",
    email: "john.doe@example.com",
    otherInfo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editableUser, setEditableUser] = useState({ ...user });

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    setUser(editableUser);
    setIsEditing(false);
    console.log('Profile saved:', editableUser);
  };

  const handleCancelEdit = () => {
    setEditableUser({ ...user });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMyListings = () => {
    navigate('/my-listings');
  };

  const handleMyPurchases = () => {
    navigate('/previous-purchases');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-3 md:p-5 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-6 drop-shadow-sm">EcoMarketPlace</h1>
      <main className="container mx-auto max-w-4xl mt-10 p-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-6 text-center drop-shadow-sm">User Profile / Dashboard</h1>
        <div className="flex items-center mb-6">
          <img
            src={isEditing ? editableUser.profilePicture : user.profilePicture}
            alt="Profile"
            className="w-24 h-24 rounded-full mr-6 object-cover border-2 border-blue-500"
          />
          <div className="flex-grow">
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={editableUser.name}
                onChange={handleChange}
                className="text-2xl font-semibold w-full bg-gray-100 p-2 rounded-md mb-1"
              />
            ) : (
              <h2 className="text-2xl font-semibold">{user.name}</h2>
            )}
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={editableUser.email}
                onChange={handleChange}
                className="text-gray-600 w-full bg-gray-100 p-2 rounded-md"
              />
            ) : (
              <p className="text-gray-600">{user.email}</p>
            )}
          </div>
          {!isEditing ? (
            <button
              onClick={handleEditProfile}
              className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
            >
              Edit Profile
            </button>
          ) : (
            <div className="ml-auto flex space-x-2">
              <button
                onClick={handleSaveProfile}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300 shadow-md"
              >
                Save
              </button>
              <button
                onClick={handleCancelEdit}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300 shadow-md"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-blue-700">Other Information</h3>
          {isEditing ? (
            <textarea
              name="otherInfo"
              value={editableUser.otherInfo}
              onChange={handleChange}
              rows="3"
              className="w-full bg-gray-100 p-2 rounded-md text-gray-800 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <p className="text-gray-700">{user.otherInfo}</p>
          )}
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 text-blue-700">Navigation</h3>
          <button
            onClick={handleMyListings}
            className="block w-full text-left bg-blue-100 text-blue-800 p-4 rounded-lg mb-3 hover:bg-blue-200 transition duration-300 font-medium shadow-sm"
          >
            My Listings
          </button>
          <button
            onClick={handleMyPurchases}
            className="block w-full text-left bg-blue-100 text-blue-800 p-4 rounded-lg hover:bg-blue-200 transition duration-300 font-medium shadow-sm"
          >
            My Purchases
          </button>
        </div>
      </main>
    </div>
  );
};

export default UserProfilePage;
