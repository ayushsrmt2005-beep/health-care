
import React, { useState } from "react";

import "bulma/css/bulma.min.css";



const symptomsList = [
  "itching",
  "skin_rash",
  "nodal_skin_eruptions",
  "continuous_sneezing",
  "shivering",
  "chills",
  "joint_pain",
  "stomach_pain",
  "acidity",
  "ulcers_on_tongue",
  "muscle_wasting",
  "vomiting",
  "burning_micturition",
  "spotting_ urination",
  "fatiue",
  "weight_gain",
  "anxiety",
  "cold_hands_and_feets",
  "mood_swings",
  "weight_loss",
  "restlessness",
  "lethargy",
  "patches_in_throat",
  "irregular_sugar_level",
  "cough",
  "high_fever",
  "sunken_eyes",
  "breathlessness",
  "sweating",
  "dehydration",
  "indigestion",
  "headache",
  "yellowish_skin",
  "dark_urine",
  "nausea",
  "loss_of_appetite",
  "pain_behind_the_eyes",
  "back_pain",
  "constipation",
  "abdominal_pain",
  "diarrhoea",
  "mild_fever",
  "yellow_urine",
  "yellowing_of_eyes",
  "acute_liver_failure",
  "fluid_overload",
  "swelling_of_stomach",
  "swelled_lymph_nodes",
  "malaise",
  "blurred_and_distorted_vision",
  "phelgm",
  "throat_irritation",
  "redness_of_eyes",
  "sinus_pressure",
  "runny_nose",
  "congestion",
  "chest_pain",
  "weakness_in_limbs",
  "fast_heart_rate",
  "pain_during_bowel_movements",
  "pain_in_anal_region",
  "bloody_stool",
  "irritation_in_anus",
  "neck_pain",
  "dizziness",
  "cramps",
  "bruising",
  "obesity",
  "swollen_legs",
  "swollen_blood_vessels",
  "puffy_face_and_eyes",
  "enlarged_thyroid",
  "brittle_nails",
  "swollen_extremeties",
  "excessive_hunger",
  "extra_marital_contacts",
  "drying_and_tingling_lips",
  "slurred_speech",
  "knee_pain",
  "hip_joint_pain",
  "muscle_weakness",
  "stiff_neck",
  "swelling_joints",
  "movement_stiffness",
  "spinning_movements",
  "loss_of_balance",
  "unsteadiness",
  "weakness_of_one_body_side",
  "loss_of_smell",
  "bladder_discomfort",
  "foul_smell_of urine",
  "continuous_feel_of_urine",
  "passage_of_gases",
  "internal_itching",
  "toxic_looks_(typhos)",
  "depression",
  "irritability",
  "muscle_pain",
  "altered_sensorium",
  "red_spots_over_body",
  "belly_pain",
  "abnormal_sensorium",
  "dischromic _patches",
  "watering_from_eyes",
  "increased_appetite",
  "polyuria",
  "family_history",
  "mucoid_sputum",
  "rusty_sputum",
  "lack_of_concentration",
  "visual_disturbances",
  "receiving_blood_transfusion",
  "receiving_unsterile_injections",
  "coma",
  "stomach_bleeding",
  "distention_of_abdomen",
  "history_of_alcohol_consumption",
  "fluid_overload.1",
  "blood_in_sputum",
  "prominent_veins_on_calf",
  "palpitations",
  "painful_walking",
  "pus_filled_pimples",
  "blackheads",
  "scurring",
  "skin_peeling",
  "silver_like_dusting",
  "small_dents_in_nails",
  "inflammatory_nails",
  "blister",
  "red_sore_around_nose",
  "yellow_crust_ooze"
];

const SymptomSelection = ({ onSubmit }) => {
  const [prediction, setPrediction] = useState(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState([""]);

  const handleSymptomChange = (index, value) => {
    const newSymptoms = [...selectedSymptoms];
    newSymptoms[index] = value;
    setSelectedSymptoms(newSymptoms);
  };

  const addSymptom = () => {
    setSelectedSymptoms([...selectedSymptoms, ""]);
  };

  
    /*onSubmit(selectedSymptoms.filter((symptom) => symptom !== ""));*/
    const handleSubmit = async () => {
      const symptoms = selectedSymptoms.filter((symptom) => symptom !== "");
    
      try {
        const response = await fetch("http://127.0.0.1:5000/predict", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ symptoms }),
        });
    
        const data = await response.json();
        if (response.ok) {
          setPrediction({
            disease: data.disease,
            description: data.description,
            diet: data.diet,
            medication: data.medication,
            workout: data.workout,
          });
        } else {
          setPrediction({ error: "Error: " + data.error });
        }
      } catch (error) {
        setPrediction({ error: "Failed to fetch results. Check the backend." });
      }
    };
    

  return (
    <div className="container p-5">
      <h1 className="title">Select Your Symptoms</h1>
      {selectedSymptoms.map((symptom, index) => (
        <div className="field" key={index}>
          <div className="control">
            <div className="select">
              <select
                value={symptom}
                onChange={(e) => handleSymptomChange(index, e.target.value)}
              >
                <option value="">Select a symptom</option>
                {symptomsList.map((sym, i) => (
                  <option key={i} value={sym}>
                    {sym}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ))}
      <button className="button is-primary" onClick={addSymptom}>
        Add More Symptoms
      </button>
      <button className="button is-success ml-2" onClick={handleSubmit}>
        Submit
      </button>
      {prediction && (
        <div className="box mt-4">
          {prediction.error ? (
            <p className="has-text-danger">{prediction.error}</p>
          ) : (
            <div>
              <h3 className="title is-5">Predicted Disease: {prediction.disease}</h3>
              <p><strong>Description:</strong> {prediction.description}</p>
              <p><strong>Diets:</strong> {prediction.diet}</p>
              <p><strong>Medication:</strong> {prediction.medication}</p>
              <p><strong>Workouts:</strong> {prediction.workout}</p>
            </div>
          )}
        </div>
      )}
      
    </div>
  );
};

export default SymptomSelection;
