import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Category.css';
import axios from 'axios';
import Bedroom from './images/hom4.jpg';



const Category = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/categories/");
        setCategories(response.data.Categories); 
        console.log(response.data); 
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);



  return (
    <div>
      <section className="category" id="category">
        <h2 className="heading" id="heading">Browse by<span> Category</span></h2>
        <div className="box-container">
          {categories.map(category => (
            //  <Link to={`/product/${category.type}` } key={category.id} >
            <div className="box" key={category.id} onClick={() => navigate(`/product/${category.type}`, { state: { type: category.type } })}>
              <img src={(Bedroom)} alt={category.type}  />
              <h3>{category.type}</h3>
            </div>
            // </Link>
            
          ))}
        </div>
      </section>
    </div>
  );
}

export default Category;
