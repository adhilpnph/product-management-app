import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Header(){
    const {logOut}=useAuth()
    return(
        <header>
            
        <nav>
            <div>
                 <div>
                <Link to={'/Dashboard'} className="nav-link">
                    My Store
                </Link>
                </div>
            
                <div>
                <Link to={'/Products'} className="nav-link">
                    Products
                </Link>
                </div>
            </div>
           
            
            <div className="logout" onClick={logOut}>
                 
                Logout
                
            </div>
            

        </nav>
        
        </header>
    )
    
}