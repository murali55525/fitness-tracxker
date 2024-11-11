// src/api/foodApi.js

import axios from 'axios';

const AI_FOOD_API_URL = 'https://ai-workout-planner-exercise-fitness-nutrition-guide.p.rapidapi.com/analyzeFoodPlate';
const API_KEY = '7cabf4db3amsh3318170d96bae90p185322jsnd4f9f7c1d6fd';

export const analyzeFoodPlate = async (foodImageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', foodImageFile);

    const response = await axios.post(AI_FOOD_API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-rapidapi-host': 'ai-workout-planner-exercise-fitness-nutrition-guide.p.rapidapi.com',
        'x-rapidapi-key': API_KEY,
      },
      params: {
        noqueue: '1',
        lang: 'en',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error analyzing food plate:', error);
    throw error;
  }
};
