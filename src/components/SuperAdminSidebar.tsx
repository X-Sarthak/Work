import React from 'react';
import { Link } from 'react-router-dom';

interface SidebarItem {
  label: string;
  link: string;
}

const items: SidebarItem[] = [
  {
    label: 'Dashboard',
    link: '',
  },
  // Add additional items for Super Admin dashboard if needed
];

function SuperAdminSidebar(): JSX.Element {
  return (
    <div className='flex flex-col gap-2 my-2'>
      {items?.map((item: SidebarItem) => (
        <Link key={item.label} to={item.link} className='px-4 py-2 bg-sky-600/80 text-white'>
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export default SuperAdminSidebar;
