import React from 'react';
import './navbar.css';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Category from './Category';
import Orders from './Orders';
import Cart from './Cart';
import Products from './Products';
import ProductDetails from './ProductDetails';
import { useState } from 'react';


const Navbar = () => {
 
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();

  let user=(localStorage.getItem('username'))
  // console.log(user)


  function logout(){
    localStorage.clear();
    navigate('/home')
  }

  return (
  <div>
      <div className='main'>
        <section className="header">
          <Link to="/" className="logo"> <i className="fas fa-couch"></i> RENTFURLAX</Link>
          
          <nav className="navbar">
            {user? (
              <>
                <Link to="/">Dashboard</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/cart">Cart</Link>
                <div id="cart-btn" className="fas fa-shopping-cart"></div>
                <Link onClick={logout}>Logout</Link>
              </>
            ) : (
              <>
                <Link to="/">Home</Link>
                
                <Link to="/cart">Cart</Link>
                <div id="cart-btn" className="fas fa-shopping-cart"></div>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
              </>
            )}
          </nav>
        </section>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
       <Route path="/productDetails/:id" element={<ProductDetails/>}/>
        <Route path='/product/:id' element={<Products />} />
      </Routes>
    </div>
   
  );
}

export default Navbar;
