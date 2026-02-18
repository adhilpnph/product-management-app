import { useRef, useState } from "react";
import axiosInstance from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

export default function CreateProduct(){
    const [form,setForm]=useState({
        title:"",
        price:"",
        titleError:""
    })
    const titleRef=useRef(null)
    const [success,setSuccess]=useState(null)
    
    const navigate=useNavigate()
    const handleChange=(e)=>{
        const {name,value}=e.currentTarget
        setForm(prev=>({
            ...prev,
            [name]:value
        }));
        
        
        if(!isNaN(titleRef.current.value)){
            setForm(prev=>({
            ...prev,
            titleError:"Title cannot have numbers alone"
        }));
        }
        else{
            setForm(prev=>({
            ...prev,
            titleError:""
        }));
        }
        

        
        
    }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        if(!isNaN(titleRef.current.value)){
            alert("Title cannot have numbers alone")
            return;
                

        
        }
        const formData={
            ...form,
            price:Number(form.price)
        }
        try{
            await axiosInstance.post("/products",
                formData
            );
            setSuccess("Product created Successfully")
            setTimeout(()=>setSuccess("Returning to products"),1000)
            
            setTimeout(()=>navigate("/Products"),2000)
            
        }catch(err){
            console.log("Error Creating Product",err);
            
        }
    }
    
    return(
        <>
        
            <div className="page-center">

                <form onSubmit={handleSubmit}>
                    <h1>Create product</h1>
                    <label>Title</label>
                    <input type="text"  ref={titleRef} name="title" placeholder="pen"
                    value={form.title} onChange={handleChange} required/>
                    {form.titleError!=""?<div className="error">{form.titleError}</div>:""} 
                    <label>Price</label>
                    <input type="number"   name="price" placeholder="10.5" value={form.price}  onChange={handleChange} required/>
                    
                    <button  className="submit" type="submit"> Add</button>
                    <Link to={"/Products"}><button >Back</button></Link>
                    {success && <p className="success">{success}</p>}
                </form>
            </div>
            
        

        
            
        
        
        </>
    )
}