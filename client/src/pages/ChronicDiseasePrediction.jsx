import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

const ChronicDiseasePrediction = () => {
  return (
    <div class="hero is-fullheight is-royal-blue"> 
  <section class="section">
    <div class="container">
      <div className="column has-text-centered">
        <h1 className="title has-text-white is-1">Chronic Disease </h1> 
      </div>
      <br/>
      <br/>
      <br/>
      
      <div class="columns is-multiline is-vcentered"> 

        <div class="column is-one-half"> 
        <Link class="button  is-fullwidth" to="/features/chronic-disease-prediction/diabetes">
          
            <div class="box has-text-centered">
              <figure class="image is-128x128">
                <img src="https://media.istockphoto.com/id/2157664064/vector/diabetes-line-icon-illness-sugar-type-1-diabetes-type-2-diabetes.jpg?s=1024x1024&w=is&k=20&c=xXkXxMyLNYueSeDB29dRRNdC70KHF7eCbPRGz2asj6M=" alt="Diabetes" />
              </figure>
              <p>Diabetes</p>
            </div>
          
          </Link>
        </div>

        <div class="column is-one-half"> 
        <Link class="button  is-fullwidth" to="/features/chronic-disease-prediction/kidney">
        
            <div class="box has-text-centered">
              <figure class="image is-128x128">
                <img src="https://media.istockphoto.com/id/2097464304/vector/kidney-single-line-icon.jpg?s=1024x1024&w=is&k=20&c=vw_-jL6Kuz3OkioAHYqSdE_vbSbh1ncovzaiAZ5WVrs=" alt="Kidney" />
              </figure>
              <p>Chronic Kidney Dis.</p>
            </div>
          </Link>
        </div>

        <div class="column is-one-half"> 
        <Link class="button  is-fullwidth" to="/features/chronic-disease-prediction/parkinson">
          
            <div class="box has-text-centered">
              <figure class="image is-128x128">
                <img src="https://media.istockphoto.com/id/1087181424/vector/human-brain-icon.jpg?s=1024x1024&w=is&k=20&c=NDA90YLGXWxxxkhWGbV-xjm7PkiJszGolbwEr47-cl4=" alt="Parkinson's" />
              </figure>
              <p>Parkinson's</p>
            </div>
        
          </Link>
        </div>
      </div>

    </div>
  </section>
</div>
  );
};

export default ChronicDiseasePrediction;
