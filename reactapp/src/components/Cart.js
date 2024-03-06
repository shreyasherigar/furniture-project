import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import cart from './images/cart.jpg';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import axios from 'axios';

const Cart = () => {
  const loc = useLocation();
  const navigate = useNavigate();

  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [month, setmonth] = useState('');

  useEffect(() => {
    if (loc && loc.state && loc.state.product && loc.state.selectedOption) {
      const name = loc.state.product;
      const price = loc.state.selectedOption.split(',')[1];
      const month = loc.state.selectedOption.split(',')[0];
      setItemName(name);
      setmonth(month);
      setItemPrice(price);
    } else {
      setItemName('');
      setmonth('');
      setItemPrice('');
    }
  }, [loc]);

  const rentHandler = async () => {
    if (itemName) {
      try {
     
        const requestBody = {
          status: "ORDERED", 
          customer: localStorage.getItem('username'), 
          items: itemName,
        };       
        const response = await axios.post('http://localhost:8000/api/invoice', requestBody);
        console.log('Invoice generated:', response.data);       
        navigate('/orders');
      } catch (error) {
        console.error('Error generating invoice:', error);
      }
    }
  };


  return (
    <div className='cart'>
      <div className="CartContainer">
        <div className="Header">
          <h3 className="Heading">Shopping Cart</h3>
          <h5 className="Action">Name</h5>
          <h5 className="Action">Price</h5>
        </div>
        {itemName && itemPrice ? (
          <div>
          <div className="Cart-Items">
            <div className="image-box">
              <h5 className='Heading'><img src={cart} alt='' /></h5>
            </div>
            <div>
              <h5 className="Action">{itemName}</h5>
            </div>
            <div>
              <h5 className="Action">{itemPrice}</h5>
              <p>/month ({month})</p>
            </div>
            </div>
            <div className="checkout">
              <div className='btnContainer'>
                <button className="button" onClick={rentHandler}>Rent</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="empty-cart">Your cart is empty</div>
        )}
      </div>
    </div>
  );
}

export default Cart;
