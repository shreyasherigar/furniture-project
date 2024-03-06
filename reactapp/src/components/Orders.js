import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Orders.css';

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);
  const [customerNames, setCustomerNames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/invoice');
        if (response.data) {
          setInvoices(response.data.Invoice);
          const names = response.data.Invoice
            .filter(order => order.customer !== null && order.customer !== undefined)
            .map(order => order.customer)
            .filter(customer => customer !== undefined);
          setCustomerNames(names);
        } else {
          console.error('Invalid data format for invoices:', response.data);
        }
        setLoading(false); 
      } catch (error) {
        console.error('Error generating invoice:', error);
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [navigate]);

  const currentUserInvoices = invoices.filter(
    invoice => invoice.customer === localStorage.getItem('username')
  );

  return (
    <div className='ordersHeading'>
      <h1>Order details</h1>
      <div className="ordersContainer">
        {currentUserInvoices.length > 0 ? (
          currentUserInvoices.map((invoice, index) => (
            <div className="orderItem" key={index}>
              <div className="title">Status: {invoice.status}</div>
              <div className="content">Item: {invoice.items}</div>
            </div>
          ))
        ) : (
          <p>No orders</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
