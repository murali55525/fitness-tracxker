import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchExercises } from '../api/exerciseApi';
import { useAuth0 } from '@auth0/auth0-react';
import './WorkoutForm.css';

const WorkoutForm = () => {
  const { user } = useAuth0();
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState('');
  const [duration, setDuration] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  // Define calorie burn rates for exercises
  const exerciseCalorieRates = {
    'Running': 10,
    'Cycling': 8,
    'Jogging': 7,
    'Walking': 4,
    '3/4 Sit-up': 5,
    '45° Side Bend': 4,
    'Air Bike': 12,
    'All Fours Squat Stretch': 2,
    'Alternate Heel Touchers': 3,
    'Alternate Lateral Pulldown': 6,
    'Ankle Circles': 2,
    'Archer Pull Up': 9,
    'Archer Push Up': 8,
    'Arm Slingers Hanging Bent Knee Legs': 7,
  };

  useEffect(() => {
    const loadExercises = async () => {
      try {
        const data = await fetchExercises();
        console.log("Fetched exercises:", data);

        // Custom exercises to add to the list
        const customExercises = [
          { id: 'custom1', name: 'Cycling' },
          { id: 'custom2', name: 'Walking' },
          { id: 'custom3', name: 'Jogging' },
          { id: 'custom4', name: 'Running' }
        ];

        // Combine fetched exercises with custom ones
        const allExercises = Array.isArray(data) ? [...data, ...customExercises] : customExercises;
        console.log("Combined exercises:", allExercises);

        setExercises(allExercises);
      } catch (error) {
        console.error('Failed to fetch exercises:', error);
        setError('Failed to load exercises. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadExercises();
  }, []);

  // Handle changes in exercise selection
  const handleExerciseChange = (e) => {
    const exercise = e.target.value;
    setSelectedExercise(exercise);

    // Recalculate calories when exercise is selected
    if (exercise) {
      const caloriesPerMinute = exerciseCalorieRates[exercise] || 0;
      setCaloriesBurned(caloriesPerMinute * duration);
    }
  };

  // Handle changes in duration
  const handleDurationChange = (e) => {
    const minutes = Number(e.target.value);
    setDuration(minutes);

    // Recalculate calories when duration is updated
    if (selectedExercise) {
      const caloriesPerMinute = exerciseCalorieRates[selectedExercise] || 0;
      setCaloriesBurned(caloriesPerMinute * minutes);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const userId = user.email;

    try {
      const response = await axios.post('http://localhost:5000/saveWorkout', {
        userId,
        workoutType: selectedExercise,
        duration,
        caloriesBurned,
      });

      console.log('Workout logged successfully:', response.data);
      setMessage('Workout logged successfully!');
    } catch (error) {
      console.error('Error logging workout:', error);
      setMessage('Error logging workout. Please try again.');
    }
  };

  if (loading) return <div>Loading exercises...</div>;
  if (error) return <div>{error}</div>;

  return (
    <form className="workout-form" onSubmit={handleSubmit}>
      <label className="form-label">
        Select Exercise:
        <select 
          className="form-select"
          value={selectedExercise} 
          onChange={handleExerciseChange}
        >
          <option value="">Select an exercise</option>
          {exercises.map(exercise => (
            <option key={exercise.id} value={exercise.name}>
              {exercise.name}
            </option>
          ))}
        </select>
      </label>

      <label className="form-label">
        Duration (minutes):
        <input 
          className="form-input"
          type="number" 
          value={duration} 
          onChange={handleDurationChange} 
        />
      </label>

      <label className="form-label">
        Calories Burned:
        <input 
          className="form-input"
          type="number" 
          value={caloriesBurned} 
          readOnly 
        />
      </label>

      <button className="form-button" type="submit">Log Workout</button>
      {message && <div className="form-message">{message}</div>}
    </form>
  );
};

export default WorkoutForm;