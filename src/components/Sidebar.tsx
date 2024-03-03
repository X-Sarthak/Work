import React from 'react';
import { Link } from 'react-router-dom';

interface SidebarItem {
  label: string;
  link: string;
}

interface SidebarProps {
  onMeetingRoomClick: () => void;
  loginId: string;
}

const items: SidebarItem[] = [
  {
    label: 'Dashboard',
    link: '/adminlogin/dashboard/:loginId',
  },
  {
    label: 'Meeting Room',
    link: '/adminlogin/meetingroom/:loginId',
  },
  {
    label: 'Users',
    link: '/adminlogin/users/:loginId',
  },
];

const Sidebar: React.FC<SidebarProps> = ({ onMeetingRoomClick, loginId }) => (
  <div className='flex flex-col gap-2 my-2'>
    {items?.map((item) => (
      <Link
        key={item.label}
        to={item.link.includes(':loginId') ? item.link.replace(':loginId', loginId) : item.link}
        onClick={item.label === 'Meeting Room' ? onMeetingRoomClick : () => {}}
        className='px-4 py-2 bg-sky-600/80 text-white'
        style={{ background: '#219ebc' }}
      >
        {item.label}
      </Link>
    ))}
  </div>
);

export default Sidebar;
