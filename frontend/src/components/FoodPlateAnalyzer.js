// src/components/FoodPlateAnalyzer.js

import React, { useState } from 'react';
import { analyzeFoodPlate } from '../api/foodApi'; // Ensure this API call is set up correctly

const FoodPlateAnalyzer = () => {
  const [foodImage, setFoodImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event) => {
    setFoodImage(event.target.files[0]);
  };

  const handleAnalyze = async () => {
    if (!foodImage) {
      setError('Please upload an image of a food plate to begin the analysis.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await analyzeFoodPlate(foodImage);
      setAnalysisResult(result);

      const foodItems = result.foodItems || [];
      const nutritionalInfo = result.nutritionalInfo || [];

      const formattedResult = {
        foodItems: foodItems.length > 0 ? foodItems.join(', ') : 'No food items detected.',
        nutritionalInfo: nutritionalInfo.length > 0 
          ? nutritionalInfo.map(info => `${info.name}: ${info.value} ${info.unit}`).join(', ') 
          : 'No nutritional information available.'
      };

      setAnalysisResult(formattedResult);
    } catch (err) {
      setError('Failed to analyze food plate. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="food-analyzer-container">
      <h3>Food Plate Analyzer</h3>
      <p>Upload a food plate image for analysis.</p>

      <div className="image-upload-container">
        <input type="file" onChange={handleImageChange} />
        <button onClick={handleAnalyze} disabled={loading}>
          {loading ? 'Analyzing...' : 'Analyze Food Plate'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading && <div className="loading-message">Analyzing your food plate...</div>}

      {analysisResult && (
        <div className="analysis-result">
          <h4>Analysis Result:</h4>
          <div><strong>Food Items Detected:</strong> {analysisResult.foodItems}</div>
          <div><strong>Nutritional Information:</strong> {analysisResult.nutritionalInfo}</div>
        </div>
      )}
    </div>
  );
};

export default FoodPlateAnalyzer;
