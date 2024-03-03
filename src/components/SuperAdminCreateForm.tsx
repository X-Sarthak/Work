import React, { useState } from 'react';

function SuperAdminCreateForm({ onCreateAdmin }: { onCreateAdmin: (userId: string, password: string) => void }): JSX.Element {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateAdmin(userId, password);
    setUserId('');
    setPassword('');
    setIsOpen(false);
  };

  return (
    <div>
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md" onClick={() => setIsOpen(true)}>
        Create Admin
      </button>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Create Admin</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="userId" className="block text-sm font-medium text-gray-700">User ID</label>
                <input type="text" id="userId" value={userId} onChange={(e) => setUserId(e.target.value)} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
              </div>
              <div className="text-right">
                <button type="button" className="text-gray-600 mr-4" onClick={() => setIsOpen(false)}>Cancel</button>
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default SuperAdminCreateForm;
