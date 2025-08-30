import React, { useState } from "react";
import axios from "axios";
import "bulma/css/bulma.min.css";


const KidneyChronicForm = () => {
  const [prediction, setPrediction] = useState(null);
  const [formData, setFormData] = useState({
    age: "",
    bp: "",
    sg: "",
    al: "",
    su: "",
    bgr: "",
    bu: "",
    sc: "",
    sod: "",
    pot: "",
    hemo: "",
    pcv: "",
    wbcc: "",
    rbcc: "",
    rbc: "",
    pc: "",
    pcc: "",
    ba: "",
    htn: "",
    dm: "",
    cad: "",
    appet: "",
    pe: "",
    ane: "",
  });

  // Dropdown options for categorical values
  const dropdownValues = {
    rbc: ["normal", "abnormal"],
    pc: ["normal", "abnormal"],
    pcc: ["notpresent", "present"],
    ba: ["notpresent", "present"],
    htn: ["yes", "no"],
    dm: ["yes", "no"],
    cad: ["yes", "no"],
    appet: ["good", "poor", "no"],
    pe: ["no", "yes", "good"],
    ane: ["no", "yes"],
  };
  const numericalColumns = [
    "age", "bp", "sg", "al", "su", "bgr", "bu", "sc", 
    "sod", "pot", "hemo", "pcv", "wbcc", "rbcc"
  ];
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Clean feature names by removing extra quotes
    const formattedData = Object.keys(formData).reduce((acc, key) => {
      const cleanKey = key.replace(/['"]/g, ""); // Remove unnecessary quotes
  
      if (numericalColumns.includes(key)) {
        acc[cleanKey] = parseFloat(formData[key]); // Convert numerical values to float
      } else {
        acc[cleanKey] = formData[key].toString().trim(); // Keep categorical/ordinal as string
      }
      return acc;
    }, {});
  
    console.log("Formatted Data Sent to API:", formattedData); // Debugging Line
  
    try {
      const response = await axios.post("http://127.0.0.1:5000/kidney_predict", {
        features: formattedData,
      });
  
      console.log("API Response:", response.data); // Debugging Line
  
      if (response.data.prediction) {
        setPrediction(response.data.prediction); // Set state instead of alert
      } else {
        setPrediction("Prediction error: No prediction received");
      }
    } catch (error) {
      console.error("Error making prediction", error);
      setPrediction("Error making prediction. Please try again.");
    }
  };
  
  return (
    <div className="container mt-5">
    <div className="box">
      <h2 className="title is-4 has-text-centered">Chronic Kidney Disease Prediction</h2>
      <form onSubmit={handleSubmit}>
        <div className="columns is-multiline">
          {Object.keys(formData).map((key) => (
            <div key={key} className="column is-half">
              <div className="field">
                <label className="label">{key.toUpperCase()}</label>
                <div className="control">
                  {dropdownValues[key] ? (
                    <div className="select is-fullwidth">
                      <select name={key} value={formData[key]} onChange={handleChange}>
                        <option value="">Select {key}</option>
                        {dropdownValues[key].map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <input
                      type="number"
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      className="input"
                      placeholder={key}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="has-text-centered">
    <button type="submit" className="button is-primary is-fullwidth" onClick={handleSubmit}>Predict Chronic Kidney Disease</button>
     </div>
        </form>
        {prediction && (
          <div className="notification is-info has-text-centered mt-4">
            <strong>Prediction:</strong> {prediction}
          </div>
        )}
      </div>
    </div>
  );
};

export default KidneyChronicForm;
