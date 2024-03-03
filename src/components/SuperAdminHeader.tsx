import React from 'react';
import { FaUser } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';

function SuperAdminHeader({ dashboardType }: { dashboardType: string }) { // Rename the function to SuperAdminHeader
  return (
    <div className='flex items-center justify-between bg-sky-600/80 px-4 py-4 text-white'>
      <h2>Dashboard</h2>
      <span>{dashboardType} Dashboard</span> {/* Add space between dashboardType and "Dashboard" */}
      <div className='flex items-center justify-end cursor-pointer'>
        <FaUser /> <IoMdArrowDropdown />
      </div>
    </div>
  );
}

export default SuperAdminHeader; // Export SuperAdminHeader component
