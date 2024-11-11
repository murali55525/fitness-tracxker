import React, { useState } from 'react';
import axios from 'axios';
import './FindFood.css';  // Import the CSS file

const FindFood = () => {
  const [food, setFood] = useState('');
  const [foodInfo, setFoodInfo] = useState(null);
  const [error, setError] = useState('');

  // Define your API credentials
  const apiKey = '60f0736abdb11bb951bdeb4cf660a8a6';
  const apiId = '355ea952';

  // Handle the food search
  const handleSearch = async () => {
    if (!food) {
      return;
    }

    setError('');
    setFoodInfo(null);

    try {
      // Make a POST request to Nutritionix API's natural/nutrients endpoint
      const response = await axios.post(
        'https://trackapi.nutritionix.com/v2/natural/nutrients',
        { query: food },
        {
          headers: {
            'x-app-id': apiId, // Replace with your Nutritionix App ID
            'x-app-key': apiKey, // Replace with your Nutritionix API Key
          },
        }
      );

      const data = response.data;

      // Check if any food info is found
      if (data.foods && data.foods.length > 0) {
        setFoodInfo(data.foods[0]); // Display the first result
      } else {
        setError('No food found.');
      }
    } catch (err) {
      setError('Error fetching data.');
      console.error(err);
    }
  };

  return (
    <div className="find-food-container">
      <h2>Find Food and Calculate Nutrition</h2>
      
      {/* Flexbox container for input field and button */}
      <div className="input-search-container">
        <input
          type="text"
          value={food}
          onChange={(e) => setFood(e.target.value)}
          placeholder="Enter food name"
          className="food-input"
        />
        <button onClick={handleSearch} className="food-search-button">
          Search
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {foodInfo && (
        <div className="food-info">
          <h3>{foodInfo.food_name}</h3>
          <p><strong>Calories:</strong> {foodInfo.nf_calories} kcal</p>
          <p><strong>Protein:</strong> {foodInfo.nf_protein} g</p>
          <p><strong>Carbs:</strong> {foodInfo.nf_total_carbohydrate} g</p>
          <p><strong>Fat:</strong> {foodInfo.nf_total_fat} g</p>
          <p><strong>Fiber:</strong> {foodInfo.nf_dietary_fiber} g</p>
          <p><strong>Sugars:</strong> {foodInfo.nf_sugars} g</p>
          <p><strong>Potassium:</strong> {foodInfo.nf_potassium} mg</p>
        </div>
      )}
    </div>
  );
};

export default FindFood;
