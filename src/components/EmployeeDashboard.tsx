import React, { useState, useEffect } from 'react';
import Header from './EmployeeHeader';
import SidebarEmployee from './SidebarEmployee';

// Define an interface for user data
interface UserData {
  name: string;
  id: string;
  division: string;
  designation: string;
  email: string;
  password: string;
}

function EmployeeDashboard() {
  const [userData, setUserData] = useState<UserData | null>(null); // Set type explicitly or use type assertion

  useEffect(() => {
    // Retrieve user data from localStorage or API endpoint
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData) as UserData); // Type assertion
    }
    // If using API call, fetch user data here
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    window.location.href = '/';
  };

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col'>
      <Header dashboardType="Employee" onLogout={handleLogout} />
      <div className='flex gap-5 p-6'>
        <SidebarEmployee />
        <div className='flex-1 bg-white p-8 rounded-md shadow-md'>
          <div className='mb-8'>
            <h2 className='text-3xl font-semibold mb-4'>Employee Information:</h2>
            <div className='grid grid-cols-2 gap-4'>
              <div className='bg-gray-200 p-4 rounded-md mb-4'>
                {/* Render user data if available */}
                {userData && (
                  <>
                    <p className='mb-2'>
                      <span className='font-semibold text-lg'>Name:</span> {userData.name}
                    </p>
                    <p className='mb-2'>
                      <span className='font-semibold text-lg'>Employee ID:</span> {userData.id}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
          <div>
            <h2 className='text-3xl font-semibold mb-4'>Employee Profile:</h2>
            {/* Grey box below Employee Profile */}
            <div className='bg-gray-200 p-4 rounded-md mb-4'>
              {/* Render user data if available */}
              {userData && (
                <>
                  <p className='mb-2'>
                    <span className='font-semibold text-lg'>Name:</span> {userData.name}
                  </p>
                  <p className='mb-2'>
                    <span className='font-semibold text-lg'>Division:</span> {userData.division}
                  </p>
                  <p className='mb-2'>
                    <span className='font-semibold text-lg'>Designation:</span> {userData.designation}
                  </p>
                  <p className='mb-2'>
                    <span className='font-semibold text-lg'>Email:</span> {userData.email}
                  </p>
                  <p className='mb-2'>
                    <span className='font-semibold text-lg'>Password:</span> {userData.password}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <footer className='text-center px-4 py-2 bg-gray-200'>
        &copy; {new Date().getFullYear()} Concept. All rights reserved.
      </footer>
    </div>
  );
}

export default EmployeeDashboard;
