import { Link, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth.js"
import { useEffect } from "react";
import axiosInstance from "../api/axios";

export default function Dashboard(){



    const navigate=useNavigate();
    const {logOut}=useAuth()

    const handleLogout=()=>{
        logOut();
        navigate("/")
    }
    return(
        <>
               <div className="page-center">
                    <div className="dashboard-container">
                        <h1>Dashboard</h1>
                        <Link to={"/Products"}><button className="dashboard-products" >View Products</button></Link>
                        <Link to={"/create-product"}><button className="dashboard-products" >Add Product +</button></Link>
                        <button className="logout-btn" onClick={handleLogout}>Logout</button>
        
                    </div>
                </div> 
                
                
            
        </>
        
    )
}