import React, { useState } from "react";
import axios from "axios";
import "bulma/css/bulma.min.css";

const DiabetesForm = () => {
  const [formData, setFormData] = useState({});
  const [prediction, setPrediction] = useState(null);

  const featureNames = [
    "Pregnancies", "Glucose", "BloodPressure", "SkinThickness", "Insulin",
    "BMI", "DiabetesPedigreeFunction", "Age"
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
      const response = await axios.post("http://127.0.0.1:5000/predict_diabetes", {
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
        <h2 className="title is-4 has-text-centered">Diabetes Prediction</h2>
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
              Predict Diabetes
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

export default DiabetesForm;
