import React, { useState, useEffect } from 'react';

export interface UserData {
  id: string;
  name: string;
  division: string;
  designation: string;
  email: string;
  password: string;
}

interface UsersCreateFormProps {
  onCreateUser: (userData: UserData) => void;
  onClose: () => void;
  title: string;
  initialData?: UserData;
}

const UsersCreateForm: React.FC<UsersCreateFormProps> = ({ onCreateUser, onClose, title, initialData }) => {
  const [userData, setUserData] = useState<UserData>({
    id: '',
    name: '',
    division: '',
    designation: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (initialData) {
      setUserData(initialData);
    }
  }, [initialData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    // If the field name is 'id', validate that the value is numeric
    if (name === 'id') {
      // Check if the value is numeric
      if (!isNaN(Number(value))) {
        // Update the state only if the value is numeric
        setUserData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    } else {
      // For other fields, update the state normally
      setUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onCreateUser(userData);
    onClose();
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
              placeholder='ID'
              name='id'
              value={userData.id}
              onChange={handleInputChange}
              required
            />
            <input
              type='text'
              className='rounded-md border-2 p-2'
              placeholder='Name'
              name='name'
              value={userData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type='text'
              className='rounded-md border-2 p-2'
              placeholder='Division'
              name='division'
              value={userData.division}
              onChange={handleInputChange}
              required
            />
            <input
              type='text'
              className='rounded-md border-2 p-2'
              placeholder='Designation'
              name='designation'
              value={userData.designation}
              onChange={handleInputChange}
              required
            />
            <input
              type='email'
              className='rounded-md border-2 p-2'
              placeholder='Email'
              name='email'
              value={userData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type='password'
              className='rounded-md border-2 p-2'
              placeholder='Password'
              name='password'
              value={userData.password}
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

export default UsersCreateForm;
