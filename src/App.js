import React, { useState } from 'react';
import './App.css';

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
    fetch('API_ENDPOINT', {
      method: 'POST',
      headers: {
        'api-key': 'API_KEY', // Ensure to replace this with your actual API key
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
        const profileContent = data.outputEvents[0].chunk; // Access the profile content
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
      <h1>Create Your Personalized Fitness & Nutrition Plan</h1>
      <p>Tell us a bit about yourself to get a plan tailored just for you.</p>
      
      <form className="fitness-form" onSubmit={handleSubmit}>
        {/* Input fields and labels */}
        <div className="form-group">
          <label>What's your Name:</label>
          <input type="text" name="name" placeholder="e.g., John Doe" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>How old are you?</label>
          <input type="number" name="age" placeholder="e.g., 30" value={formData.age} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>What's your gender?</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="" disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>
        <div className="form-group">
          <label>How tall are you?</label>
          <div className="input-group">
            <input type="number" name="height" value={formData.height} onChange={handleChange} required />
            <select name="heightUnit" value={formData.heightUnit} onChange={handleChange}>
              <option value="cm">cm</option>
              <option value="inches">inches</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label>How much do you weigh?</label>
          <div className="input-group">
            <input type="number" name="weight" value={formData.weight} onChange={handleChange} required />
            <select name="weightUnit" value={formData.weightUnit} onChange={handleChange}>
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label>What's your fitness goal?</label>
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
          <label>How often do you exercise?</label>
          <select name="exerciseFrequency" value={formData.exerciseFrequency} onChange={handleChange} required>
            <option value="" disabled>Select Frequency</option>
            <option value="1-2 times per week">1-2 times per week</option>
            <option value="2-3 times per week">2-3 times per week</option>
            <option value="3-4 times per week">3-4 times per week</option>
            <option value="5+ times per week">5+ times per week</option>
          </select>
        </div>
        <div className="form-group">
          <label>How much time do you have for each workout?</label>
          <select name="workoutTime" value={formData.workoutTime} onChange={handleChange} required>
            <option value="" disabled>Select Time</option>
            <option value="15-30 minutes">15-30 minutes</option>
            <option value="30-45 minutes">30-45 minutes</option>
            <option value="1 hour">1 hour</option>
            <option value="More than 1 hour">More than 1 hour</option>
          </select>
        </div>
        <div className="form-group">
          <label>What’s your current activity level?</label>
          <select name="activityLevel" value={formData.activityLevel} onChange={handleChange} required>
            <option value="" disabled>Select Activity Level</option>
            <option value="Sedentary">Sedentary</option>
            <option value="Lightly Active">Lightly Active</option>
            <option value="Moderately Active">Moderately Active</option>
            <option value="Highly Active">Highly Active</option>
          </select>
        </div>
        <div className="form-group">
          <label>Any past injuries or health concerns?</label>
          <input type="text" name="healthConditions" value={formData.healthConditions} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Do you have any dietary preferences?</label>
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
          <label>Any allergies or food restrictions?</label>
          <input type="text" name="allergies" placeholder="e.g., Peanuts, dairy" value={formData.allergies} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Wearable Device Data (Optional):</label>
          <input type="text" name="wearableData" placeholder="Optional data from fitness trackers" value={formData.wearableData} onChange={handleChange} />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating your plan...' : 'Get My Plan'}
        </button>
      </form>

      {/* Display the JSON output after submission */}
      {jsonOutput && (
        <div className="json-output">
          <h2>Your Personalized Plan</h2>
          <pre>{jsonOutput}</pre> {/* Display only the profile message */}
        </div>
      )}

      {/* Display error message if any */}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default App;
