from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
import tensorflow as tf
import joblib

app = Flask(__name__)
CORS(app)

# Load the trained Keras model
model = tf.keras.models.load_model("./models/general_model.keras")
# Load the label encoder
loaded_encoder = joblib.load('./models/prognosis_label_encoder.pkl')

# Load symptom descriptions
description_df = pd.read_csv("./data/description.csv")
diets_df=pd.read_csv("./data/diets.csv")
medications_df=pd.read_csv("./data/medications.csv")
workout_df=pd.read_csv("./data/workout_df.csv")
precautions_df=pd.read_csv("./data/precautions_df.csv")

# List of all 132 symptoms (update this with actual symptom names in order)
all_symptoms = [
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
]


parkinson_model = joblib.load("./models/Parkison_disease_model.pkl")
parkinson_scaler = joblib.load("./models/p_scaler.pkl")
diabetes_model = joblib.load("./models/diabetes_disease_model.pkl")
diabetes_scaler = joblib.load("./models/d_scaler.pkl")
@app.route("/predict_diabetes", methods=["POST"])
def predict_diabetes():
    try:
        data = request.json
        input_features = data.get("features", [])

        if not input_features:
            return jsonify({"error": "No input features provided."}), 400

        # Convert input features to NumPy array and reshape
        input_array = np.array(input_features).reshape(1, -1)
        input_scaled = diabetes_scaler.transform(input_array)

        # Make prediction
        prediction = diabetes_model.predict(input_scaled)
        result = "Diabetes Detected" if prediction[0] == 1 else "No Diabetes Detected"

        return jsonify({"prediction": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
@app.route("/predict_parkinson", methods=["POST"])
def predict_parkinson():
    try:
        data = request.json
        input_features = data.get("features", [])

        if not input_features:
            return jsonify({"error": "No input features provided."}), 400

        # Convert input features to NumPy array and reshape
        input_array = np.array(input_features).reshape(1, -1)
        input_scaled = parkinson_scaler.transform(input_array)

        # Make prediction
        prediction = parkinson_model.predict(input_scaled)
        result = "Parkinson's Detected" if prediction[0] == 1 else "No Parkinson's Detected"

        return jsonify({"prediction": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

voting_clf = joblib.load('./models/voting_classifier_model_final_f.pkl')
scaler = joblib.load('./models/scaler3.pkl')
one_hot_encoder = joblib.load('./models/one_hot_encoder3.pkl')
label_encoder = joblib.load('./models/label_encoder3.pkl')

# Feature names (before encoding)
categorical_columns = ['rbc', 'pc', 'pcc', 'ba', 'htn', 'dm', 'cad', 'pe', 'ane']
ordinal_columns = ['appet']
numerical_columns = ['age', 'bp', 'sg', 'al', 'su', 'bgr', 'bu', 'sc', 'sod', 'pot', 'hemo', 'pcv', 'wbcc', 'rbcc']

@app.route('/kidney_predict', methods=['POST'])
def predict_ckd():
    try:
        # Get request data
        data = request.json
        print(data)
        features = data['features']
        print(features)
        # Convert input data to DataFrame
        input_df = pd.DataFrame([features], columns=numerical_columns + categorical_columns + ordinal_columns)
        print("t",input_df)
        # Apply One-Hot Encoding to categorical variables
        encoded_categorical = one_hot_encoder.transform(input_df[categorical_columns])

        encoded_df = pd.DataFrame(encoded_categorical, columns=one_hot_encoder.get_feature_names_out(categorical_columns))
        print(encoded_df)
        # Apply Label Encoding to ordinal variables
        input_df['appet'] = label_encoder.transform(input_df['appet'])
        
        # Drop original categorical columns and concatenate encoded data
        input_df = pd.concat([input_df.drop(columns=categorical_columns), encoded_df], axis=1)
        
        # Apply MinMax Scaling to numerical variables
        input_df[numerical_columns] = scaler.transform(input_df[numerical_columns])
        
        # Make prediction
        prediction = voting_clf.predict(input_df)[0]
        
        # Convert prediction to human-readable format
        result = 'Chronic Kidney Disease Detected' if prediction == 0 else 'No Chronic Kidney Disease'
        
        return jsonify({'prediction': result})
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        selected_symptoms = data.get("symptoms", [])

        # Create a feature vector of 132 symptoms
        symptom_vector = np.zeros(len(all_symptoms))
        for symptom in selected_symptoms:
            if symptom in all_symptoms:
                index = all_symptoms.index(symptom)
                symptom_vector[index] = 1

        # Reshape for model prediction
        input_data = np.array([symptom_vector])

        # Predict the disease
        prediction = model.predict(input_data)
        predicted_class_index = np.argmax(prediction,axis=1)
        print(predicted_class_index)
        predicted_disease = loaded_encoder.inverse_transform(predicted_class_index)
        print(predicted_disease)

        # Fetch additional information
        disease_info = description_df[description_df["Disease"] == predicted_disease[0]]
        diets_info=diets_df[diets_df["Disease"] == predicted_disease[0]]
        medications_info=medications_df[medications_df["Disease"] == predicted_disease[0]]
        precautions_info=precautions_df[precautions_df["Disease"] == predicted_disease[0]]
        workout_info=workout_df[workout_df["disease"] == predicted_disease[0]]

        if not disease_info.empty:
            description = disease_info.iloc[0]["Description"]
        else:
            description = "No additional information available."
        if not diets_info.empty:
            diets = diets_info.iloc[0]["Diet"]
        else:
            diets = "No diets information available."
        if not medications_info.empty:
            medications = medications_info.iloc[0]["Medication"]
        else:
            medications = "No medications information available."
        if not workout_info.empty:
            workouts = workout_info.iloc[0]["workout"]
        else:
            workouts = "No workouts information available."

        return jsonify({
            "disease": predicted_disease[0],
            "description": description,
            "diet": diets,
            "medication": medications,
            "workout": workouts
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
