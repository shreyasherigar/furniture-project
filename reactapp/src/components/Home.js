import React from 'react';
import './Home.css';
import Category from './Category';


const Home = () => {
  return (
    <div>
       <section className="home" id="home">
            <div className="swiper home-slider">
                <div className="swiper-wrapper">
                    <div className="swiper-slide slide" >
                        <div className="content">
                            <h1>Rent Furniture </h1>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Category/>
     
    </div>
  )
}

export default Home;
