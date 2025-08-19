import React from 'react'
import { Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import MyProfile from './pages/MyProfile'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import NavigationBar from './components/NavigationBar'
import RelatedDoctors from './components/RelatedDoctors'
import {Footer} from './components/Footer'
import { ToastContainer, toast } from 'react-toastify'





const App = () => {
  return (
    <div className="w-full lg:w-[80%] mx-auto">
      <ToastContainer />
      <NavigationBar />

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lijecnici" element={<Doctors />} />
      <Route path="/lijecnici/:speciality" element={<Doctors />} />
      <Route path="/login" element={<Login />} />
      <Route path="/myProfile" element={<MyProfile />} />
      <Route path="/o-nama" element={<About />} />
      <Route path="/kontakt" element={<Contact />} />
      <Route path="/myProfile" element={<MyProfile />} />
      <Route path="/mojiTermini" element={<MyAppointments />} />
    
      <Route path="/termini/:docId" element={<Appointment />} />

    </Routes>
    <Footer>

    </Footer>
    </div>
  )
}

export default App