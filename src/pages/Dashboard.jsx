import { Link, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth.js"
import { useEffect } from "react";
import axiosInstance from "../api/axios";

import RevenueCharts from "../components/RevenueChart.jsx";
import StatCard from "../components/StatCard.jsx";

export default function Dashboard(){


    const {products,setProducts}=useAuth()
    
    const api=axiosInstance
    useEffect(()=>{
        const fetchProducts=async ()=>{
            try{
                const res=await api.get("/products")
                setProducts(res.data)
                
                
                
            }catch(err){
                setError("Error fetching products")
                console.log("Error fetching products");
                
            }
        }
        fetchProducts();
    },[])
    const stats = [
        { title: "Total Revenue", value: "$58,420" },
        { title: "Revenue This Month", value: "$6,390" }, 
        { title: "Monthly Growth", value: "+8.4%" },
        { title: "Total Orders", value: "742" },
        { title: "Pending Orders", value: "36" },
        { title: "Total Products", value: products.length },
        { title: "Out of Stock", value: "18" },
        { title: "Active Users", value: "1,120" }
    ];
    return(
        <>
                
               <div className="dashboard-layout">
                    
                    
                    <div className="dashboard-main">
                        <div className="dashboard-actions">
                            
                            
                            <Link to={"/Products"}><button className="dashboard-products" >View Products ({products.length})</button></Link>
                            <Link to={"/create-product"}><button className="dashboard-products" >Add Product +</button></Link>
                            
            
                        </div>
                        
                        <div className="stat-grid">
                            {stats.map((statCard,index)=>(
                                <StatCard key={index} value={statCard.value} title={statCard.title} />
                            ))}
                        </div>
                        <RevenueCharts/>
                        
                        
                        
                    </div>
                    
                    
                    
                </div>
                
                
                
            
        </>
        
    )
}