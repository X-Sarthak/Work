import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeDashboard from './components/EmployeeDashboard';
import MeetingDashboard from './components/MeetingDashboard';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import MeetingRoom from './components/MeetingRoom';
import SuperAdmin from './components/SuperAdmin';
import SuperAdminDashboard from './components/SuperAdminDashboard';
import Users from './components/Users';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/adminlogin' element={<Login />} />
        <Route path='/meetinglogin' element={<Login />} />
        <Route path='/employeelogin' element={<Login />} />
        <Route path='/adminlogin/dashboard/:loginId' element={<Dashboard />} />
        <Route path='/adminlogin/meetingroom/:loginId' element={<MeetingRoom />} />
        <Route path='/adminlogin/users/:loginId' element={<Users />} />
        <Route path='/login/employee-dashboard' element={<EmployeeDashboard />} />
         <Route path='/login/meeting-dashboard' element={<MeetingDashboard />} />       
        <Route path='/superadmin' element={<SuperAdmin />} />
        <Route path='/superadmindashboard' element={<SuperAdminDashboard />} />
        
      </Routes>
    </Router>
  );
}

export default App;
