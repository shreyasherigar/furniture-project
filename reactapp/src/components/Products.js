import React, { useState, useEffect } from 'react';
import './Products.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const loc = useLocation();

    useEffect(() => {
        async function getAllProducts() {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/${loc.state.type}/`);
                console.log("API Response:", response.data); 
                if (response.data && response.data.data) {
                    setProducts(response.data.data); 
                } else {
                    console.log("No products available for the category");
                }
            } catch (error) {
                console.log("Error:", error);
            }
        }
        getAllProducts();
    }, [loc]);

    return (
        <div>
            <section className="product" id="product">
                <h1 className="heading" id="heading"><span>Products</span></h1>
                <div className="box-container">
                    {products.length > 0 ? (
                        products.map(product => (
                            <div className="box" key={product.id}>
                                <div className="image">
                                <img src={product.options.imageurl} alt=""/>

                                </div>
                                <div className="content">
                                    <h3>{product.name}</h3>
                                    <p>{product.description}</p>
                                    <button className="btn" onClick={() => navigate(`/productDetails/${product.name}`, { state: { product } })}>Details</button>
                                    {product.rentalOptions.length > 0 && (
                                    <div className="icons">
                                         <span key="tenure">Tenure: {product.rentalOptions[0].tenure}</span>
                                        <span key="rate">Rate per month: {product.rentalOptions[0].ratepermonth}</span>
                                    </div>
                                )}
                                    </div>
                                </div>
                          
                        ))
                    ) : (
                        <h2>No products available in this Category for now</h2>
                    )}
                </div>
            </section>
        </div>
    );
}

export default Products;
