import React, { useState } from "react";
import axios from "axios";
import "bulma/css/bulma.min.css";

const ParkinsonForm = () => {
  const [formData, setFormData] = useState({});
  const [prediction, setPrediction] = useState(null);

  const featureNames = [
    "MDVP:Fo(Hz)", "MDVP:Fhi(Hz)", "MDVP:Flo(Hz)", "MDVP:Jitter(%)", "MDVP:Jitter(Abs)",
    "MDVP:RAP", "MDVP:PPQ", "Jitter:DDP", "MDVP:Shimmer", "MDVP:Shimmer(dB)",
    "Shimmer:APQ3", "Shimmer:APQ5", "MDVP:APQ", "Shimmer:DDA", "NHR",
    "HNR", "RPDE", "DFA", "spread1", "spread2", "D2", "PPE"
  ];

  const handleChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value === "" ? "" : parseFloat(value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict_parkinson", {
        features: Object.values(formData),
      });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error making prediction", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="box has-background-light p-5">
        <h2 className="title is-4 has-text-centered">Parkinson's Disease Prediction</h2>
        <form onSubmit={handleSubmit}>
          {featureNames.map((feature, index) => (
            <div key={index} className="field">
              <label className="label">{feature}</label>
              <div className="control">
                <input
                  type="number"
                  step="any"
                  name={feature}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
            </div>
          ))}
          <div className="control mt-4 has-text-centered">
            <button type="submit" className="button is-primary is-fullwidth">
              Predict Parkinson's
            </button>
          </div>
        </form>
        {prediction && (
          <div className="notification is-info mt-4">
            <h3 className="subtitle is-5">Prediction:</h3>
            <p className="has-text-weight-bold">{prediction}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParkinsonForm;
