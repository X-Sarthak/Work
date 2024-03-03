import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

interface DashboardProps {}

interface MeetingData {
  meetingRoomName: string;
  authorityName: string;
  username: string;
  password: string;
}

function Dashboard(_props: DashboardProps) {
  const [meetings, setMeetings] = useState<MeetingData[]>([]);
  const [adminName] = useState('ADMINISTRATOR'); // Fixed "Admin" name
  const { loginId } = useParams<{ loginId?: string }>(); // Extract login ID from URL parameters with possible undefined

  useEffect(() => {
    // Retrieve data from localStorage on component mount
    const storedData = localStorage.getItem('submittedMeetingData');
    if (storedData) {
      setMeetings(JSON.parse(storedData));
    }
  }, []);

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
        <Sidebar onMeetingRoomClick={() => {}} loginId={loginId || ''} /> {/* Provide a default value for loginId */}
        <div className='flex-1 bg-white p-8 rounded-md shadow-md'>
          <div className='mb-8'>
            <h2 className='text-3xl font-semibold mb-4'>Admin Information:</h2>
            <div className='grid grid-cols-2 gap-4'>
              <div className='bg-gray-200 p-4 rounded-md mb-4'> 
                <p className='mb-2'>
                  <span className='font-semibold text-lg'>Login ID:</span> {loginId || 'N/A'} {/* Display login ID or fallback to 'N/A' */}
                </p>
                <p className='mb-2'>
                  <span className='font-semibold'>Name:</span> {adminName}
                </p>
              </div>
            </div>
          </div>
          <div className='mb-8'>
            <h2 className='text-3xl font-semibold mb-4'>Meeting Information:</h2>
            <div className='grid grid-cols-2 gap-4'>
              {meetings.map((meeting, index) => (
                <div key={index} className='bg-gray-200 p-4 rounded-md mb-4'>
                  <h4 className='font-semibold text-lg'>Meeting {index + 1}:</h4>
                  <p className='mb-2'>
                    <span className='font-semibold'>Meeting Room Name:</span> {meeting.meetingRoomName}
                  </p>
                  <p className='mb-2'>
                    <span className='font-semibold'>Authority Name:</span> {meeting.authorityName}
                  </p>
                  <p className='mb-2'>
                    <span className='font-semibold'>Username:</span> {meeting.username}
                  </p>
                  <p className='mb-2'>
                    <span className='font-semibold'>Password:</span> {meeting.password}
                  </p>
                </div>
              ))}
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

export default Dashboard;
