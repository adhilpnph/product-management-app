import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/axios";
import { useEffect, useRef, useState } from "react";

export default function EditProduct(){
    const navigate=useNavigate()
    const api=axiosInstance
    const {id}=useParams()
    const [form,setForm]=useState({
        title:"",
        price:"",
        titleError:""
    })
    const titleRef=useRef(null)
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(null)
    const [success,setSuccess]=useState(null)
    const handleChange=(e)=>{
        const {name,value}=e.currentTarget
        setForm(prev=>({
            ...prev,
            [name]:value
        }))
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
    useEffect( ()=>{
        const fetchProduct=async ()=>{
            try{
                const res= await api.get(`products/${id}`)
                setForm(res.data)

            }catch(error){
                setError(error)
            }finally{
                setLoading(false)
            }
        }
        
        fetchProduct();
    },[id])
    const handleSubmit=async (e)=>{
        e.preventDefault()
        if(!isNaN(titleRef.current.value)){
            alert("Title cannot have numbers alone")
        return;
                

        
        }
        const formData={
            ...form,
            price:Number(form.price)
        }
        try{
            await api.put(`/products/${id}`,formData)
            
            setSuccess("Edited Product Successfully")
            setTimeout(()=>setSuccess("Returning to products"),1000)
            
            setTimeout(()=>navigate("/Products"),2000)

        }catch(error){
            setError(error)
            
        }
    }
    if(loading) return <p className="state-message"> Loading...</p>
    if(error) return <p className="state-message">{error.message}</p>
    return(
        <>
            
            
                <form onSubmit={handleSubmit}>
                <h1>Edit Product</h1>
                <label>Title:</label>
                <input type="text"   ref={titleRef} value={form.title} name="title" onChange={handleChange} required/>
                {form.titleError!=""?<div className="error">{form.titleError}</div>:""}
                <label>Price:</label>
                <input type="number"   value={form.price} name="price" onChange={handleChange}required/>
                <button className="submit" type="submit">Edit</button>
                <Link  to={"/Products"}><button>Back</button></Link>
                {success && <p className="success">{success}</p>}
                </form>
            
            
        </>
    )
}