import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import Jobs from './pages/Products'
import Products from './pages/Products'
import ProtectedRoute from './routes/ProtectedRoute'
import CreateProduct from './pages/CreateProduct'
import EditProduct from './pages/EditProduct'
import Header from './components/Header'
import useAuth from './hooks/useAuth'

function App() {
  const {token}=useAuth()

  return (
    <>
      
      <BrowserRouter>
      {token?<Header/> :null}
      
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Register' element={<Register/>} />

          <Route path='/Dashboard' element={
            
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
            
            } />
          
          <Route path='/Products' element={

            <ProtectedRoute>
              <Products/>
            </ProtectedRoute>
            
            } />
          <Route path='/create-product' element={

            <ProtectedRoute>
              <CreateProduct/>
            </ProtectedRoute>
          }
          
          />
          <Route path='/edit-product/:id' element={

            <ProtectedRoute>
              <EditProduct/>
            </ProtectedRoute>
          }
          
          />
        </Routes>
        
      </BrowserRouter>
    </>
  )
}

export default App
