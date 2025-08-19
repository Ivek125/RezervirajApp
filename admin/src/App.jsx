import React from 'react'
import Login from './pages/Login'
 import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import Navbar from './components/Navbar';
import { AdminContext } from './context/AdminContext';
import { DoctorContext } from './context/DoctorContext';
import Sidebar from './components/sidebar';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import DoctorList from './pages/Admin/DoctorList';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDoctor from './pages/Admin/AddDoctor';



const App = () => {

  const {aToken} = useContext(AdminContext)
  const {dToken} = useContext(DoctorContext)

  return !aToken && !dToken ? (
    <div>
      <Login />
      <ToastContainer />
    </div>
  ) : (
    <div className='bg-gray-800'>
      <ToastContainer />
        <Navbar />
        <div className='flex items-start bg-white'>
          <Sidebar />
          <Routes>
             <Route path='/' element={<></>} />
            <Route path='/admin/dashboard' element={<Dashboard />} />
            <Route path='/admin/all-doctors' element={<DoctorList />} />
            <Route path='/admin/appointments' element={<AllAppointments />} />
            <Route path='/admin/add-doctor' element={<AddDoctor />} />
          </Routes>
        </div>
    </div>
  )
}

export default App