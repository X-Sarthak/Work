import React from 'react';
import { FaUser } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';

interface HeaderProps {
  dashboardType: string;
  onLogout: () => void; // Add the onLogout property
}

function Header(props: HeaderProps) {
  return (
    <div className='flex items-center justify-between bg-sky-600/80 px-4 py-4 text-white'>
      <h2>Dashboard</h2>
      <span>{props.dashboardType}</span>
      <div className='flex items-center justify-end cursor-pointer'>
        <FaUser /> <IoMdArrowDropdown />
        <button onClick={props.onLogout}>Logout</button> {/* Add the logout button */}
      </div>
    </div>
  );
}

export default Header;
