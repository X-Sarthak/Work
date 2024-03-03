import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login(): JSX.Element {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin(): void {
    // Login logic (replace with actual authentication logic)
    const correctUsername = 'admin';
    const correctPassword = 'password';

    if (username === correctUsername && password === correctPassword) {
      // Set authentication status to true in local storage
      localStorage.setItem('isAuthenticated', 'true');
      // Navigate to the dashboard upon successful login
      navigate('/superadmindashboard');
    } else {
      // Handle invalid credentials
      alert('Invalid username or password');
    }
  }

  return (
    <div className='bg-gray-100 h-screen w-full flex items-center justify-center p-4'>
      <div className='bg-white rounded-md px-6 py-10 w-full sm:w-96 shadow-lg'>
        <h3 className='text-center font-semibold font-serif text-xl'>Super Admin Login Panel</h3>
        <div className='grid gap-2 py-4'>
          <input 
            type='text' 
            className='rounded-md border-2 p-2' 
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input 
            type='password' 
            className='rounded-md border-2 p-2' 
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className='my-2 rounded-md bg-sky-600/80 text-white px-4 py-2'
            type='button'
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
