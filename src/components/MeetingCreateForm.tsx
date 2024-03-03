import React, { useState, useEffect } from 'react';

interface MeetingData {
  meetingRoomName: string;
  authorityName: string;
  username: string;
  password: string;
  disabled: boolean; // Add the disabled property
}

interface MeetingCreateFormProps {
  onMeetingCreate: (meeting: MeetingData) => void;
  onClose: () => void;
  title: string;
  initialData?: MeetingData; // Add initialData property
}

const MeetingCreateForm: React.FC<MeetingCreateFormProps> = ({ onMeetingCreate, onClose, title, initialData }) => {
  const [meetingData, setMeetingData] = useState<MeetingData>({
    meetingRoomName: '',
    authorityName: '',
    username: '',
    password: '',
    disabled: false, // Initialize disabled property
  });

  useEffect(() => {
    // Populate form fields with initial data when provided
    if (initialData) {
      setMeetingData(initialData);
    }
  }, [initialData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setMeetingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onMeetingCreate(meetingData);
    onClose(); // Close the form after submitting
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white rounded-md px-6 py-10 w-full sm:w-96 shadow-lg'>
        <h3 className='text-center font-semibold font-serif text-xl'>{title}</h3>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-2 py-4'>
            <input
              type='text'
              className='rounded-md border-2 p-2'
              placeholder='Meeting Room Name'
              name='meetingRoomName'
              value={meetingData.meetingRoomName}
              onChange={handleInputChange}
              required
            />
            <input
              type='text'
              className='rounded-md border-2 p-2'
              placeholder='Authority Name'
              name='authorityName'
              value={meetingData.authorityName}
              onChange={handleInputChange}
              required
            />
            <input
              type='text'
              className='rounded-md border-2 p-2'
              placeholder='Username'
              name='username'
              value={meetingData.username}
              onChange={handleInputChange}
              required
            />
            <input
              type='password'
              className='rounded-md border-2 p-2'
              placeholder='Password'
              name='password'
              value={meetingData.password}
              onChange={handleInputChange}
              required
            />
            <div className='flex justify-center'>
              <button className='my-2 rounded-md bg-green-500 text-white px-6 py-3' type='submit'>
                Submit
              </button>
              <button
                className='my-2 rounded-md bg-red-500 text-white px-6 py-3 ml-2'
                type='button'
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MeetingCreateForm;
