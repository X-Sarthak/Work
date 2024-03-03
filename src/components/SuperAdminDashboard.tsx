import React, { useState, useEffect } from 'react';
import Header from './SuperAdminHeader';
import SuperAdminSidebar from './SuperAdminSidebar';
import SuperAdminCreateForm from './SuperAdminCreateForm';

interface AdminData {
  userId: string;
  password: string;
  disabled: boolean;
}

function SuperAdminDashboard(): JSX.Element {
  const [admins, setAdmins] = useState<AdminData[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editUserId, setEditUserId] = useState<string>('');
  const [editPassword, setEditPassword] = useState<string>('');

  useEffect(() => {
    // Fetch stored admin data from localStorage when component mounts
    const storedAdmins = localStorage.getItem('admins');
    if (storedAdmins) {
      setAdmins(JSON.parse(storedAdmins));
    }
  }, []);

  function handleCreateAdmin(userId: string, password: string): void {
    const isAdminExist = admins.some(admin => admin.userId === userId);
    if (isAdminExist) {
      window.alert('Admin with User ID: ' + userId + ' already exists.');
      return;
    }

    const newAdmin: AdminData = { userId, password, disabled: false };
    const updatedAdmins = [...admins, newAdmin];
    setAdmins(updatedAdmins);
    localStorage.setItem('admins', JSON.stringify(updatedAdmins));
  }

  function handleRemoveAdmin(index: number): void {
    const updatedAdmins = [...admins];
    updatedAdmins.splice(index, 1);
    setAdmins(updatedAdmins);
    localStorage.setItem('admins', JSON.stringify(updatedAdmins));
  }

  function handleEditAdmin(index: number, admin: AdminData): void {
    setEditIndex(index);
    setEditUserId(admin.userId);
    setEditPassword(admin.password);
  }

  function handleSaveEdit(): void {
    if (editIndex !== null) {
      const updatedAdmins = [...admins];
      updatedAdmins[editIndex] = { userId: editUserId, password: editPassword, disabled: false };
      setAdmins(updatedAdmins);
      setEditIndex(null);
      setEditUserId('');
      setEditPassword('');
      localStorage.setItem('admins', JSON.stringify(updatedAdmins));
    }
  }

  function handleToggleDisable(index: number): void {
    const updatedAdmins = [...admins];
    updatedAdmins[index].disabled = !updatedAdmins[index].disabled;
    setAdmins(updatedAdmins);
    localStorage.setItem('admins', JSON.stringify(updatedAdmins));
  }

  function handleLogout() {
    // Clear any authentication token or session data
    // For example, you can remove any token stored in localStorage
    localStorage.removeItem('authToken');

    // Redirect the user to the login page or any appropriate landing page
    // For example, assuming your login page is at '/login', you can redirect like this:
    window.location.href = '/';
  }

  return (
    <div className='px-4'>
      <Header dashboardType="Super Admin" />
      <div className='flex gap-5 min-h-screen'>
        <SuperAdminSidebar />
        <div className='flex-1 bg-gray-100 rounded-md p-6 flex flex-col gap-6'>
          <div className="flex justify-between items-center">
            <SuperAdminCreateForm onCreateAdmin={handleCreateAdmin} />
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md" onClick={handleLogout}>Logout</button>
          </div>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Serial No.</th>
                <th className="border border-gray-300 px-4 py-2">User ID</th>
                <th className="border border-gray-300 px-4 py-2">Password</th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{admin.userId}</td>
                  <td className="border border-gray-300 px-4 py-2">{admin.password}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md mr-2" onClick={() => handleRemoveAdmin(index)}>Remove</button>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md mr-2" onClick={() => handleEditAdmin(index, admin)}>Edit</button>
                    <button className={`bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded-md ${admin.disabled ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => handleToggleDisable(index)}>{admin.disabled ? 'Enable' : 'Disable'}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {editIndex !== null && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-md flex flex-col">
                <h2 className="text-xl font-semibold mb-4">Edit Admin</h2>
                <input type="text" className="border border-gray-300 px-2 py-1 rounded-md mb-2" value={editUserId} onChange={(e) => setEditUserId(e.target.value)} />
                <input type="password" className="border border-gray-300 px-2 py-1 rounded-md mb-2" value={editPassword} onChange={(e) => setEditPassword(e.target.value)} />
                <div className="flex justify-end">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2" onClick={handleSaveEdit}>Save</button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md" onClick={() => setEditIndex(null)}>Cancel</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <footer className='text-center px-4 py-2 text-gray-600'>
        &copy; {new Date().getFullYear()} Concept. All rights reserved.
      </footer>
    </div>
  );
}

export default SuperAdminDashboard;
