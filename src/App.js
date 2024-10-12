
import React, { useState } from 'react';
import './App.css'; // Import your CSS for styling
function App() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    height: '',
    heightUnit: 'cm',
    weight: '',
    weightUnit: 'kg',
    fitnessGoal: '',
    workoutType: '',
    exerciseFrequency: '',
    workoutTime: '',
    activityLevel: '',
    healthConditions: '',
    dietaryPreference: '',
    allergies: '',
    wearableData: '',
  });
  const [jsonOutput, setJsonOutput] = useState(null); // State to hold JSON output
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true
    setError(null); // Reset error state
    // Fetch request
    fetch('https://data.fleak.ai/api/v1/events/357a00d8-7eaf-4bf1-aa7d-b0c5e1691133/dev', {
      method: 'POST',
      headers: {
        'api-key': 'ak_n8R9NoixBdnIENeYrQq6NTOsgiFmAUf0', // Ensure to replace this with your actual API key
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([formData]), // Use the formData directly
    })
      .then((response) => {
        console.log('Response Status:', response.status); // Log the response status
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // Extract the profile content and set it as output
        const profileContent = data.outputEvents[0].profile; // Access the profile content
        setJsonOutput(profileContent); // Set the plain text output
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('There was an error submitting your data. Please try again.'); // Update error state
      })
      .finally(() => {
        setLoading(false); // Reset loading state
      });
  };
  return (
    <div className="App">
      <h1>Personalized Diet & Fitness Plan</h1>
      <form className="fitness-form" onSubmit={handleSubmit}>
        {/* Input fields and labels */}
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Age:</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="" disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Height:</label>
          <div className="input-group">
            <input type="number" name="height" value={formData.height} onChange={handleChange} required />
            <select name="heightUnit" value={formData.heightUnit} onChange={handleChange}>
              <option value="cm">cm</option>
              <option value="inches">inches</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label>Weight:</label>
          <div className="input-group">
            <input type="number" name="weight" value={formData.weight} onChange={handleChange} required />
            <select name="weightUnit" value={formData.weightUnit} onChange={handleChange}>
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label>Fitness Goals:</label>
          <select name="fitnessGoal" value={formData.fitnessGoal} onChange={handleChange} required>
            <option value="" disabled>Select Goal</option>
            <option value="Weight Loss">Weight Loss</option>
            <option value="Muscle Gain">Muscle Gain</option>
            <option value="Increase Flexibility">Increase Flexibility</option>
            <option value="Improve Endurance">Improve Endurance</option>
          </select>
        </div>
        <div className="form-group">
          <label>Preferred Workout Type:</label>
          <select name="workoutType" value={formData.workoutType} onChange={handleChange} required>
            <option value="" disabled>Select Workout Type</option>
            <option value="Strength Training">Strength Training</option>
            <option value="Cardio">Cardio</option>
            <option value="Yoga">Yoga</option>
            <option value="HIIT">HIIT</option>
            <option value="Mixed">Mixed</option>
          </select>
        </div>
        <div className="form-group">
          <label>Exercise Frequency:</label>
          <select name="exerciseFrequency" value={formData.exerciseFrequency} onChange={handleChange} required>
            <option value="" disabled>Select Frequency</option>
            <option value="3-4 times per week">3-4 times per week</option>
            <option value="5+ times per week">5+ times per week</option>
          </select>
        </div>
        <div className="form-group">
          <label>Available Time per Workout:</label>
          <select name="workoutTime" value={formData.workoutTime} onChange={handleChange} required>
            <option value="" disabled>Select Time</option>
            <option value="30-45 minutes">30-45 minutes</option>
            <option value="1 hour">1 hour</option>
          </select>
        </div>
        <div className="form-group">
          <label>Current Activity Level:</label>
          <select name="activityLevel" value={formData.activityLevel} onChange={handleChange} required>
            <option value="" disabled>Select Activity Level</option>
            <option value="Sedentary">Sedentary</option>
            <option value="Lightly Active">Lightly Active</option>
            <option value="Moderately Active">Moderately Active</option>
          </select>
        </div>
        <div className="form-group">
          <label>Previous Injuries or Health Conditions:</label>
          <input type="text" name="healthConditions" value={formData.healthConditions} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Dietary Preferences:</label>
          <select name="dietaryPreference" value={formData.dietaryPreference} onChange={handleChange} required>
            <option value="" disabled>Select Preference</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Low Carb">Low Carb</option>
            <option value="High Protein">High Protein</option>
            <option value="No Specific Diet">No Specific Diet</option>
          </select>
        </div>
        <div className="form-group">
          <label>Allergies or Food Restrictions:</label>
          <input type="text" name="allergies" value={formData.allergies} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Wearable Device Data (Optional):</label>
          <input type="text" name="wearableData" value={formData.wearableData} onChange={handleChange} />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {/* Display the JSON output after submission */}
      {jsonOutput && (
        <div className="json-output">
          <h2>Weekly Plan</h2>
          <pre>{jsonOutput}</pre> {/* Display only the profile message */}
        </div>
      )}
      {/* Display error message if any */}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}
export default App;
