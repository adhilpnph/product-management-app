import { useRef, useState } from "react"
import useAuth from "../hooks/useAuth.js"
import { useNavigate } from "react-router-dom"

export default function Login(){
    const navigate=useNavigate()
    const {login}=useAuth()
    const [form,setForm]=useState({
        email:"",
        emailError:"",
        password:"",
        passwordError:""
    })
    const emailRef=useRef(null)
    const handleSubmit=(e)=>{
        e.preventDefault();
        if (form.emailError || form.passwordError||!form.email || !form.password) {
            
            return;
        }
        const fakeToken="1234";
        login(fakeToken)
        alert("Logged In")
        navigate("/Dashboard")

    }
    const handleChange=(e)=>{
        const {name,value}=e.currentTarget
        setForm(prev=>(
            {
                ...prev,
                [name]:value
            }
        ))
       
        if (!emailRef.current.checkValidity()) {
            setForm(prev=>({
                ...prev,
                emailError:"Enter a valid email"
            }));
        }
        else{
            setForm(prev=>({
                ...prev,
                emailError:""
            }));
        } 
        if (form.password.length<8) {
            setForm(prev=>({
                ...prev,
                passwordError:"Password must be at least 8 characters"
            }));
        } 
        else{
            setForm(prev=>({
                ...prev,
                passwordError:""
            }));
        } 
        
    }

    return(
        <>
            <div className="page-center">
                <form className="login-form" onSubmit={handleSubmit}>
                
                    <h1>Login</h1>
                    <fieldset>
                        <legend>Email</legend>
                        <input className="email-input" type="email"
                            ref={emailRef}
                            placeholder="abcd@somemail.com"
                            name="email"
                            onChange={handleChange}
                            value={form.email} required
                        />
                    </fieldset>
                    
                    {form.emailError!=""? <div  className="error">{form.emailError}</div>:""}
                    <fieldset>
                        <legend>Password</legend>
                    <input className="password-input" type="password"
                        placeholder="*****"
                        name="password"
                        onChange={handleChange}
                        value={form.password}  required
                    />
                    </fieldset>
                    {form.passwordError!=""? <div className="error">{form.passwordError}</div>:""}
                    <button className="login-btn" type="submit">Login</button>
                    </form>
            </div>
            
            
        </>
        
    )
}