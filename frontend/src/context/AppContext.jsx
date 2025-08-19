import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { doctorsCategories } from "../assets/assets_frontend/assets.js";
import { toast } from "react-toastify";


export const AppContext = createContext()


const AppContextProvider = (props) => {



    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(() => localStorage.getItem("token") || ""); //odmah ucitati token iz localStorage kad se app pokrene
    const [userData, setUserData] = useState(false); //inicijalizacija userData sa false



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
    //API poziv za ucitavanje podataka o korisniku

    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } })
            if (data.success) {
                setUserData(data.user)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

        const value = {
            doctors, getDoctorsData,
            doctorsCategories,
            backendUrl,
            token,
            setToken,
            userData,
            setUserData, loadUserProfileData
        }

        useEffect(() => {
            getDoctorsData()
        }, [])
        useEffect(() => {
            if (token) {
                loadUserProfileData()
            } else {
                setUserData(false) // Ako token nije postavljen, reset userData
            }
        }, [token])

        return (
            <AppContext.Provider value={value}>
                {props.children}
            </AppContext.Provider>
        )
    }
    export default AppContextProvider 