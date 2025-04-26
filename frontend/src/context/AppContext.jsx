import { createContext } from "react";
import { doctors } from "../assets/assets_frontend/assets.js";

import { doctorsCategories } from "../assets/assets_frontend/assets.js";

export const AppContext = createContext()
const AppContextProvider = (props)=> {
    const value = {
        doctors,
        doctorsCategories,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider 