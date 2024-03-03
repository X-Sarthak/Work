import React from 'react';
import { Link } from 'react-router-dom';

const items: {
  label: string;
  link: string;
}[] = [
  {
    label: 'Meeting Setup',
    link: '/Meeting Setup',
  },
  {
    label: 'Meeting Ongoing',
    link: '/Meeting Ongoing',
  },
  {
    label: 'Working',
    link: '/Working',
  },
];

function SidebarMeeting() {
  return (
    <div className='flex flex-col gap-2 my-2'>
      {items?.map((item) => (
        <Link key={item.label} to={`/${item.link}`} className='px-4 py-2 bg-sky-600/80 text-white'>
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export default SidebarMeeting;
