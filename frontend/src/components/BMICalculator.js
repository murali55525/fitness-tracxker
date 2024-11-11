// src/components/BMICalculator.js
import React, { useState } from 'react';
import './BMICalculator.css';

function BMICalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');

  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    setBmi(bmiValue);
    determineCategory(bmiValue);
  };

  const determineCategory = (bmiValue) => {
    if (bmiValue < 18.5) {
      setCategory('Underweight');
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      setCategory('Normal');
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      setCategory('Overweight');
    } else {
      setCategory('Obese');
    }
  };

  return (
    <div className="bmi-calculator">
      <h2>BMI Calculator</h2>
      <div className="input-group">
        <label>Height (cm):</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Enter height"
        />
      </div>
      <div className="input-group">
        <label>Weight (kg):</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Enter weight"
        />
      </div>
      <button onClick={calculateBMI} className="calculate-button">
        Calculate BMI
      </button>
      {bmi && (
        <div className={`bmi-result ${category.toLowerCase()}`}>
          <p>Your BMI: {bmi}</p>
          <p>Category: {category}</p>
        </div>
      )}
    </div>
  );
}

export default BMICalculator;
