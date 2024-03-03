import React, { useState, useEffect } from 'react';
import MeetingCreateForm from './MeetingCreateForm';
import Header from './Header';
import Sidebar from './Sidebar';
import { useParams } from 'react-router-dom';

interface MeetingRoomProps {}

interface MeetingData {
  meetingRoomName: string;
  authorityName: string;
  username: string;
  password: string;
  disabled: boolean;
}

function MeetingRoom(_props: MeetingRoomProps) {
  const [showMeetingForm, setShowMeetingForm] = useState(false);
  const [submittedMeetingData, setSubmittedMeetingData] = useState<MeetingData[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const { loginId } = useParams<{ loginId?: string }>(); // Make loginId optional

  useEffect(() => {
    // Load data from localStorage on component mount
    const  storedData = localStorage.getItem('submittedMeetingData');
    if (storedData) {
      setSubmittedMeetingData(JSON.parse(storedData));
    }
  }, []);

  const handleMeetingCreate = (meetingData: MeetingData) => {
    // Add new meeting
    const updatedMeetingData = [...submittedMeetingData, meetingData];
    setSubmittedMeetingData(updatedMeetingData);

    localStorage.getItem("admins")

    // Save data to localStorage
    localStorage.setItem('submittedMeetingData', JSON.stringify(updatedMeetingData));
  };

  const handleDeleteMeeting = (index: number) => {
    // Remove meeting at specified index
    const updatedMeetingData = submittedMeetingData.filter((_, i) => i !== index);
    setSubmittedMeetingData(updatedMeetingData);

    // Update localStorage
    localStorage.setItem('submittedMeetingData', JSON.stringify(updatedMeetingData));
  };

  const handleCancelEdit = () => {
    setShowMeetingForm(false);
    setEditingIndex(null);
  };

  const handleEditClick = (index: number) => {
    // Set editing index to the clicked meeting index
    setShowMeetingForm(true);
    setEditingIndex(index);
  };

  const handleDisableEnableClick = (index: number) => {
    // Toggle the disabled state of the meeting at the specified index
    const updatedMeetingData = [...submittedMeetingData];
    updatedMeetingData[index].disabled = !updatedMeetingData[index].disabled;
    setSubmittedMeetingData(updatedMeetingData);
    localStorage.setItem('submittedMeetingData', JSON.stringify(updatedMeetingData));
  };

  const handleAddMeetingClick = () => {
    setShowMeetingForm(true);
    setEditingIndex(null);
  };

  const handleMeetingRoomClick = () => {
    // Function to handle clicking on the meeting room in the sidebar
    // Add your implementation here
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
        <Sidebar onMeetingRoomClick={handleMeetingRoomClick} loginId={loginId || ''} /> {/* Provide a default value */}
        <div className='flex-1 bg-white p-8 rounded-md shadow-md'>
          <div className='mb-8'>
            <h2 className='text-3xl font-semibold mb-4'>Meeting Room Information:</h2>
            <div className='grid grid-cols-5 gap-4'>
              {showMeetingForm ? (
                <MeetingCreateForm
                  onMeetingCreate={handleMeetingCreate}
                  onClose={handleCancelEdit}
                  title={'Meeting Create Form'}
                />
              ) : (
                <>
                  {submittedMeetingData.map((data, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-md mb-4 ${data.disabled ? 'opacity-50' : ''} ${editingIndex === index ? 'bg-red-200' : 'bg-green-200'}`}
                    >
                      <div className='flex justify-between items-center mb-2'>
                        <h4 className='font-semibold text-lg'>Meeting {index + 1}:</h4>
                        <div className='flex space-x-2'>
                          <span
                            className={`cursor-pointer ${data.disabled ? 'text-green-500' : 'text-yellow-500'}`}
                            onClick={() => handleDisableEnableClick(index)}
                          >
                            {data.disabled ? 'Ena' : 'Dis'}{' '}
                            <i className='fas fa-power-off'></i>
                          </span>
                          <span
                            className='cursor-pointer text-blue-500'
                            onClick={() => handleEditClick(index)}
                          >
                            Edit <i className='fas fa-pencil-alt'></i>
                          </span>
                          <span
                            className='cursor-pointer text-red-500'
                            onClick={() => handleDeleteMeeting(index)}
                          >
                            Del <i className='fas fa-trash'></i>
                          </span>
                        </div>
                      </div>
                      <p className='mb-2'>
                        <span className='font-semibold'>Meeting Room Name:</span> {data.meetingRoomName}
                      </p>
                      <p className='mb-2'>
                        <span className='font-semibold'>Authority Name:</span> {data.authorityName}
                      </p>
                      <p className='mb-2'>
                        <span className='font-semibold'>Username:</span> {data.username}
                      </p>
                      <p>
                        <span className='font-semibold'>Password:</span> {data.password}
                      </p>
                    </div>
                  ))}
                  <button
                    className='my-4 rounded-md bg-blue-500 text-white px-6 py-3'
                    onClick={handleAddMeetingClick}
                  >
                    Add Meeting
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <footer className='text-center px-4 py-2 bg-gray-200'>
        Copyright &copy; {new Date().getFullYear()} Concept. All rights reserved.
      </footer>
    </div>
  );
}

export default MeetingRoom;
