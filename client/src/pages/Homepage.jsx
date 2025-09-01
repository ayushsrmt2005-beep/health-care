import React from 'react';
import '../style/homepage.css'
import image1 from './assets/image1.png';
import Rectangle8 from './assets/Rectangle8.png';
import { Link} from 'react-router-dom';
const Homepage = () => {
  return (
    <div>
          <section class="hero is-royal-blue">
                <div class="hero-body">
                  <div class="container">
                   <br/>
                    <div class="columns">
                    <div class="column is-half">
                        <figure class="image is-4by3">
                        <img src={image1} alt="Woman with a stethoscope" /> 
                        
                        </figure>
                        <img src={Rectangle8} alt="" />
                      </div>
                      <div class="column is-half ">
                        <h1 class="title has-text-white is-1">MedPathway</h1>
                        <br/>
                        <h2 class="subtitle has-text-white">We offer tools for managing general health, predicting chronic conditions, and finding nearby hospitals. Our platform provides personalized workout and diet plans to help you stay fit and healthy.</h2>
                        
                        <button class="button is-large is-my-custom-blue"><Link to='/homepage'>Log In</Link></button> 
                      </div>
                     
                    </div>
            
                  </div>
                </div>
            </section>

    </div>
  );
};

export default Homepage;
