import { createContext, useState } from "react"
import axios from 'axios'
import {toast} from 'react-toastify'

export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '')

    const  [appointments, setAppointments] = useState([])
    const [dashboardData, setDashboardData] = useState(false)
    const [doctorProfile, setDoctorProfile] = useState(false)

    const getAppointments = async () => {
      try {
        const {data} = await axios.get(backendUrl + '/api/doctor/appointments', { headers: { dToken } }) 

        if (data.success) {
          setAppointments(data.appointments.reverse());
           
        } else {
          toast.error(data.message);
        }

      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    };

    //  Prihvati termin
  const acceptAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/accept-appointment",
        { appointmentId },
        { headers: {  dToken } }
      );

      if (data.success) {
        toast.success("Termin prihvaćen");
        getAppointments(); // refresh liste
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Greška pri prihvaćanju termina");
    }
  };

  //  Otkazivanje
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/cancel-appointment",
        { appointmentId },
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success("Termin otkazan");
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Greška pri otkazivanju termina");
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/dashboard", {
        headers: { dToken },
      });

      if (data.success) {
        setDashboardData(data.dashboard);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Greška pri dobijanju podataka za kontrolnu tablu");
    }
  };

  const getDoctorProfile = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/profile", {
        headers: { dToken },
      });

      if (data.success) {
        setDoctorProfile(data.profileData);
        console.log("Doctor profile data:", data.profileData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Greška pri dobijanju profila doktora");
    }
  };

  


    const value = {
      backendUrl,
      dToken,
      setDToken,
      doctorProfile,
      setDoctorProfile,
      appointments,
      setAppointments,
      getAppointments,
      acceptAppointment,
      cancelAppointment,
      getDashData,
      dashboardData,
      getDoctorProfile,
      

    };
    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider




