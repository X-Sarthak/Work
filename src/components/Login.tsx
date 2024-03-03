import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { icons } from '../constants';
import { UserData } from './UsersCreateForm';

interface AdminData {
  userId: string;
  password: string;
  disabled: boolean;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [activePanel, setActivePanel] = useState<string | null>(localStorage.getItem('lastActivePanel'));
  const [loginId, setLoginId] = useState<string>(''); // State to store the entered login ID
  
  useEffect(() => {
    localStorage.setItem('lastActivePanel', activePanel || '');
  }, [activePanel]);

  const handleLogin = () => {
    // Check if the active panel is already 'login', if not, set it to 'login'
    if (activePanel !== 'login') {
      setActivePanel('login');
      // Navigate to the admin login page
      navigate('/adminlogin'); // Change the route path as needed
    } else {
      setActivePanel(null); // If already on the admin login panel, hide it on clicking again
    }
  };

  const handleMeetingLogin = () => {
    // Check if the active panel is already 'meeting', if not, set it to 'meeting'
    if (activePanel !== 'meeting') {
      setActivePanel('meeting');
      // Navigate to the meeting login page
      navigate('/meetinglogin'); // Change the route path as needed
    } else {
      setActivePanel(null); // If already on the meeting login panel, hide it on clicking again
    }
  };

  const handleEmployeeLogin = () => {
    // Check if the active panel is already 'employee', if not, set it to 'employee'
    if (activePanel !== 'employee') {
      setActivePanel('employee');
      // Navigate to the employee login page
      navigate('/employeelogin'); // Change the route path as needed
    } else {
      setActivePanel(null); // If already on the employee login panel, hide it on clicking again
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (activePanel === 'meeting') {
      navigate('/login/meeting-dashboard');
    } else if (activePanel === 'employee') {
      const storedUsersData = localStorage.getItem('usersData');
      if (storedUsersData) {
        const usersData: UserData[] = JSON.parse(storedUsersData);
        const enteredEmail = (e.currentTarget.querySelector('input[type="text"]') as HTMLInputElement)?.value;
        const enteredPassword = (e.currentTarget.querySelector('input[type="password"]') as HTMLInputElement)?.value;
        const user = usersData.find(user => user.email === enteredEmail && user.password === enteredPassword);
  
        if (user) {
          localStorage.setItem("userData", JSON.stringify(user as UserData));
          navigate('/login/employee-dashboard');
        } else {
          alert('Invalid credentials');
        }
      } else {
        alert('No user data found');
      }
    } else {
      if (activePanel === 'meeting') {
        navigate('/login/meeting-dashboard');
      } else {
        const storedAdmins = localStorage.getItem('admins');
        if (storedAdmins) {
          const admins: AdminData[] = JSON.parse(storedAdmins);
          const userId = (e.currentTarget.querySelector('input[type="text"]') as HTMLInputElement)?.value;
          const password = (e.currentTarget.querySelector('input[type="password"]') as HTMLInputElement)?.value;
          const admin = admins.find(admin => admin.userId === userId && admin.password === password);
  
          if (admin) {
            if (admin.disabled) {
              alert('Admin account is disabled. Please contact the super admin.');
            } else {
              navigate(`/adminlogin/dashboard/${loginId}`);
            }
          } else {
            alert('Invalid credentials');
          }
        } else {
          alert('No admins found');
        }
      }
    }
  };
  

  return (
    <div className='bg-grey-200 h-screen w-full flex flex-col items-center justify-center'>
      {/* Full-Strip */}
      <div className={`bg-white p-4 mb-8 mt-5 text-center w-full ${activePanel ? 'hidden' : ''}`}>
        <h1 className='text-2xl font-semibold'>Conference Booking</h1>
      </div>

      {/* Button Containers with Space */}
      <div className='flex space-x-4'>
        {/* Admin Login Container */}
        {!activePanel && (
          <div className='bg-white rounded-lg p-10'>
            <div className="flex flex-col items-center justify-center">
              <button
                className='my-2 rounded-full bg-sky-900/100 text-white px-16 py-4'
                type='button'
                onClick={handleLogin}
              >
                <img src={icons.logo1Icon} alt="Admin Login" />
              </button>
              <span>Admin Login</span>
            </div>
          </div>
        )}

        {/* Meeting Login Container */}
        {!activePanel && (
          <div className='bg-white rounded-lg p-10'>
            <div className="flex flex-col items-center justify-center">
              <button
                className='my-2 rounded-full bg-sky-900/100 text-white px-16 py-4'
                type='button'
                onClick={handleMeetingLogin}
              >
                <img src={icons.logo1Icon} alt="Meeting Login" />
              </button>
              <span>Meeting Login</span>
            </div>
          </div>
        )}

        {/* Employee Login Container */}
        {!activePanel && (
          <div className='bg-white rounded-lg p-10'>
            <div className="flex flex-col items-center justify-center">
              <button
                className='my-2 rounded-full bg-sky-900/100 text-white px-16 py-4'
                type='button'
                onClick={handleEmployeeLogin}
              >
                <img src={icons.logo1Icon} alt="Employee Login" />
              </button>
              <span>Employee Login</span>
            </div>
          </div>
        )}
      </div>

      {/* Render the active panel */}
      {activePanel && (
        <div className='bg-white rounded-md px-6 py-10 w-full sm:w-96 shadow-lg'>
          <h3 className='text-center font-semibold font-serif text-xl'>{`${activePanel.charAt(0).toUpperCase()}${activePanel.slice(1)} Login Panel`}</h3>
          <form onSubmit={handleSubmit}>
            <div className='grid gap-2 py-4'>
              {/* Render input fields based on the active panel */}
              {/* For simplicity, you can use the same input fields for all panels */}
              <input type='text' className='rounded-md border-2 p-2' placeholder={`${activePanel} ID`} required onChange={(e) => setLoginId(e.target.value)} value={loginId} />
              <input type='password' className='rounded-md border-2 p-2' placeholder={`${activePanel} Password`} required />
              <button
                className={`my-2 rounded-md ${
                  activePanel === 'login'
                    ? 'bg-sky-600/80 text-white'
                    : activePanel === 'meeting'
                    ? 'bg-green-500 text-white'
                    : 'bg-purple-500 text-white'
                } px-6 py-3`}
                type='submit'
              >
                Login
              </button> 
            </div>
          </form>
          <div className='flex justify-center'>
             <button className='my-2 rounded-md bg-red-500 text-white px-6 py-3' type='button' onClick={() => { setActivePanel(null); navigate('/'); }}>
               Back to Login
             </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
