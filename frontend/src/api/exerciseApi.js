// src/api/exerciseApi.js
import axios from 'axios';

const API_URL = 'https://exercisedb.p.rapidapi.com/exercises';
const API_KEY = '1ff9fcb189msh69de090303e204dp191defjsn62cb0f9c8cc3'; // Replace with your actual API key

export const fetchExercises = async (limit = 10) => {
    try {
      const response = await axios.get(`${API_URL}?limit=${limit}`, {
        headers: {
          'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
          'x-rapidapi-key': API_KEY,
        },
      });
      return response.data; // This will contain the list of exercises
    } catch (error) {
      console.error('Error fetching exercises:', error);
      throw error; // Propagate the error to handle it in the component
    }
  };
  
