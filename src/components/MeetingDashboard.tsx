import React from 'react';
import Header from './MeetingHeader';
import SidebarMeeting from './SidebarMeeting'; // Import the appropriate Sidebar
import InfoCard from './MeetingInfoCard';

const infoData = ['Meeting Details', 'Agenda'];

function MeetingDashboard() {
  return (
    <div className='px-2'>
      <Header dashboardType="Meeting" />
      <div className='flex gap-5 min-h-screen'>
        <SidebarMeeting /> {/* Use SidebarMeeting instead of Sidebar */}
        <div className='flex-1 bg-gray-400/50 my-2 flex flex-col gap-2'>
          {infoData?.map((info) => (
            <InfoCard key={info} info={info} />
          ))}
        </div>
      </div>

      <footer className='text-center px-4 py-2'>
        Copyright &copy; {new Date().getFullYear()} Concept. All rights reserved.
      </footer>
    </div>
  );
}

export default MeetingDashboard;