import { useEffect, useState } from "react"
import axiosInstance from "../api/axios";
import { Link } from "react-router-dom";
export default function Products(){
    const [products,setProducts]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null)
    const api=axiosInstance
    useEffect(()=>{
        const fetchProducts=async ()=>{
            try{
                const res=await api.get("/products")
                setProducts(res.data)
            }catch(err){
                setError("Error fetching products")
                console.log("Error fetching products");
                
            }finally{
                setLoading(false);
            }
        }
        fetchProducts();
    },[])
    const handleDelete=async (id)=>{
        const confirmDelete=window.confirm("Are you sure you want to delete this product")
        if(!confirmDelete){
            return
        }
        try{
            await api.delete(`products/${id}`)
            setProducts(products.filter((p)=>p.id!==id))
        }catch(error){
            console.log("Error Deleting");
            
        }
    }
    if(loading) return <p className="state-message">Loading...</p>;
    if(error) return <p className="state-message">{error}</p>
    return(
        <>
            <div className="page">
                <h1>Products</h1>
                <Link to={"/create-product"}>
                    <button className="add-btn">Add Product +</button>
                </Link>
                {products.map(
                        (product)=>
                        (
                            <div className="product-card" key={product.id}>
                                <h4>{product.title}</h4>
                                <h4>{product.price} AED</h4>
                                <div className="actions">

                                
                                    <Link to={`/edit-product/${product.id}`}>
                                    <button className="update-btn">Update Product</button>
                                    </Link>
                                    
                                    <button className="delete-btn"  onClick={()=>handleDelete(product.id)}>Delete Product</button>
                                </div>
                            </div>
                    
                        )
                    )
                }
            </div>
            
        </>
        
    )
}