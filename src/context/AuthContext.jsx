import {createContext, useState } from "react";


export const AuthContext=createContext()
export function AuthProvider({children}){
   
    const [token,setToken]=useState(localStorage.getItem("token")||null)

    const login=(newToken)=>{
        localStorage.setItem("token",newToken)
        setToken(newToken)
    }
    const logOut=()=>{
        localStorage.removeItem("token")
        setToken(null)
    }

    return(
        <AuthContext.Provider value={{token,logOut,login}}>
            {children}

        </AuthContext.Provider>
    )

}
