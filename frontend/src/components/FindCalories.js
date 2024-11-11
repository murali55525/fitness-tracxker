import React, { useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import './FindCalories.css';

const FindCalories = () => {
  const { user } = useAuth0();
  const [exerciseQuery, setExerciseQuery] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Define your API credentials
  const apiKey = '60f0736abdb11bb951bdeb4cf660a8a6';
  const apiId = '355ea952';

  // Handle the calorie search
  const handleSearch = async () => {
    if (!exerciseQuery || !age || !weight || !gender) {
      setError('Please provide all the details');
      return;
    }

    setError('');
    setCaloriesBurned(null);

    try {
      const response = await axios.post(
        'https://trackapi.nutritionix.com/v2/natural/exercise',
        { query: exerciseQuery },
        {
          headers: {
            'x-app-id': apiId,
            'x-app-key': apiKey,
            'Content-Type': 'application/json',
          },
          params: { age, weight, gender },
        }
      );

      const data = response.data;

      if (data.exercises && data.exercises.length > 0) {
        const calculatedCalories = data.exercises[0].nf_calories;
        setCaloriesBurned(calculatedCalories);

        // Log workout in the database
        await logWorkoutInDatabase(calculatedCalories);
      } else {
        setError('No exercise data found.');
      }
    } catch (err) {
      setError('Error fetching data.');
      console.error(err);
    }
  };

  // Log workout to the database
  const logWorkoutInDatabase = async (calories) => {
    const userId = user?.email;

    try {
      const response = await axios.post('http://localhost:5000/saveWorkout', {
        userId,
        workoutType: exerciseQuery,
        duration: age,  // Use relevant field or update with another input if needed
        caloriesBurned: calories,
      });
      setMessage('Workout logged successfully!');
      console.log('Workout logged successfully:', response.data);
    } catch (error) {
      console.error('Error logging workout:', error);
      setMessage('Error logging workout. Please try again.');
    }
  };

  return (
    <div className="find-calories-container">
      <h2>Find Calories Burned</h2>
      <input
        type="text"
        placeholder="Enter your exercise (e.g., ran for 30 minutes)"
        value={exerciseQuery}
        onChange={(e) => setExerciseQuery(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter your age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter your weight (in kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <button onClick={handleSearch}>Find Calories</button>

      {error && <p className="error">{error}</p>}

      {caloriesBurned && (
        <div className="calories-result">
          <h3>Calories Burned: {caloriesBurned} kcal</h3>
        </div>
      )}

      {message && <p className="form-message">{message}</p>}
    </div>
  );
};

export default FindCalories;
