import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './ProductDetails.css'
import { useState } from 'react';


const ProductDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const product = location.state.product;
    console.log(location.state.product)

    const handlerAddToCart=()=>{
        if(isLoggedIn){
            navigate(`/cart`, { state: { product: product.name, selectedOption: document.querySelector('.renOptions').value } })
        }
        } 
    const displayrmsg=()=>{
        setErrorMessage('Please login to add item to cart.');
    }  

   

    return (
        <div className='details'>
          <div className="container">
            <div className="producat_wrapper">
                <div className="producat_image">
                    <div className="img_thumbnail">
                        <img src={product.options.imageurl} alt=" " />
                    </div>
                </div>
                <div className="product_content">
                    
                    {product && (
                        <div>
                            <h2>{product.name}</h2>
                            <p><span>Description :</span>{product.description}</p>
                            <p><span>nodofdays :</span>{product.noofdays}</p>
                            <p><span>size :</span>{product.options.size}</p>
                            <p><span>color:</span>{product.options.color}</p>
                            <p><span>Rental options :</span></p>
                            <select className='renOptions'>
                                {product.rentalOptions.map((option, index) => (
                                    <option key={index} value={`${option.tenure}, ${option.ratepermonth}`}>
                                    {`${option.tenure}, ${option.ratepermonth}`}
                                    </option>
                                ))}
                            </select>
                                    {localStorage.getItem('username') ? (
                                        <button className="btn" onClick={handlerAddToCart}>Add to cart</button>                                   
                                        ):(
                                            <div>
                                        <button className="btn" onClick={displayrmsg}>Add to cart</button>
                                            {errorMessage && <p>{errorMessage}</p>}
                                    </div>
                                    )}
                        </div>
                    
                     )}
                </div>
            </div>
         </div>   
        </div>
    );
}

export default ProductDetails;


