import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import UsersCreateForm, { UserData } from './UsersCreateForm'; // Import the UserData interface
import { useParams } from 'react-router-dom';

function Users() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [usersData, setUsersData] = useState<UserData[]>([]);
  const { loginId } = useParams<{ loginId: string }>(); // Retrieve loginId from URL params

  useEffect(() => {
    // Retrieve user data from local storage on component mount
    const storedUserData = localStorage.getItem('usersData');
    if (storedUserData) {
      setUsersData(JSON.parse(storedUserData));
    }
  }, []);

  // Function to handle the "Add Users" button click
  const handleAddUsersClick = () => {
    setShowCreateForm(true); // Show the UsersCreateForm
  };

  // Function to handle closing the UsersCreateForm
  const handleCloseCreateForm = () => {
    setShowCreateForm(false); // Hide the UsersCreateForm
  };

  // Function to handle creating a new user
  const handleCreateUser = (userData: UserData) => {
    console.log('New user created:', userData);
    // Update the user data state
    setUsersData(prevUsersData => [...prevUsersData, userData]);
    // Store the user data in local storage
    localStorage.setItem('usersData', JSON.stringify([...usersData, userData]));
  };

  // Function to handle removing a user by email
  const handleRemoveUser = (email: string) => {
    const updatedUsersData = usersData.filter(user => user.email !== email);
    setUsersData(updatedUsersData);
    // Update local storage
    localStorage.setItem('usersData', JSON.stringify(updatedUsersData));
  };

  const handleLogout = () => {
    // Clear user session or token
    // For example, you can clear localStorage or sessionStorage
    localStorage.removeItem('userToken'); // Assuming 'userToken' is used for authentication
  
    // Redirect the user to the login page
    // You can use React Router's history object to navigate to the login page
    // Example:
    window.location.href = '/'; // Redirect to the login page
  };

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col'>
      <Header dashboardType="Admin" onLogout={handleLogout} />
      <div className='flex-1 flex gap-5 p-6'>
        {/* Pass loginId to Sidebar component */}
        <Sidebar onMeetingRoomClick={() => {
          throw new Error('Function not implemented.');
        }} loginId={loginId || ''} /> {/* Provide a default value for loginId */}
        <div className='flex-1 bg-white p-8 rounded-md shadow-md'>
          {/* Users Information */}
          <h2 className='text-3xl font-semibold mb-8'>Users Information:</h2>
          {/* Add Users button */}
          <div className='flex justify-start mb-4'>
            <button className='bg-blue-500 text-white px-20 py-3 rounded-md' onClick={handleAddUsersClick}>
              Add Users
            </button>
          </div>
          {/* Table to display user data */}
          <table className="w-full border-collapse border border-gray-400">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-400 px-4 py-2">ID</th>
                <th className="border border-gray-400 px-4 py-2">Name</th>
                <th className="border border-gray-400 px-4 py-2">Division</th>
                <th className="border border-gray-400 px-4 py-2">Designation</th>
                <th className="border border-gray-400 px-4 py-2">Email</th>
                <th className="border border-gray-400 px-4 py-2">Password</th>
                <th className="border border-gray-400 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map(user => (
                <tr key={user.id}>
                  <td className="border border-gray-400 px-4 py-2">{user.id}</td>
                  <td className="border border-gray-400 px-4 py-2">{user.name}</td>
                  <td className="border border-gray-400 px-4 py-2">{user.division}</td>
                  <td className="border border-gray-400 px-4 py-2">{user.designation}</td>
                  <td className="border border-gray-400 px-4 py-2">{user.email}</td>
                  <td className="border border-gray-400 px-4 py-2">{user.password}</td>
                  <td className="border border-gray-400 px-4 py-2">
                    <button className="bg-red-500 text-white px-4 py-1 rounded-md" onClick={() => handleRemoveUser(user.email)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <footer className='text-center px-4 py-2 bg-gray-200'>
        Copyright &copy; {new Date().getFullYear()} Concept. All rights reserved.
      </footer>
      {/* Render UsersCreateForm if showCreateForm is true */}
      {showCreateForm && (
        <UsersCreateForm onCreateUser={handleCreateUser} onClose={handleCloseCreateForm} title="Add New User" />
      )}
    </div>
  );
}

export default Users;
