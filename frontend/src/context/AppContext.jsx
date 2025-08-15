import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { doctorsCategories } from "../assets/assets_frontend/assets.js";
import { toast } from "react-toastify";


export const AppContext = createContext()


const AppContextProvider = (props)=> {



    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [doctors, setDoctors] = useState([])
      const [token, setToken] = useState(() => localStorage.getItem("token") || ""); //odmah ucitati token iz localStorage kad se app pokrene
   


    //API poziva za doktore
    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/list')
            if (data.success) {
                setDoctors(data.doctors)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
     const value = {
        doctors,
        doctorsCategories,
        backendUrl,
        token,
        setToken
    }

    useEffect(() => {
        getDoctorsData()
    }, [])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider 