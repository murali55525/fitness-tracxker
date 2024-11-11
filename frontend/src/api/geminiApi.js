import axios from 'axios';

// Replace with the actual Gemini API URL
const GEMINI_API_URL = 'https://example-gemini-api-url.com'; 
// Your API key, ensure it's valid and not expired
const API_KEY = 'AIzaSyCp1vP56q727-0coJ3wv9i2HJwjGLoKu3k';

export const fetchGeminiData = async (parameters) => {
  try {
    const response = await axios.get(GEMINI_API_URL, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      params: parameters, // Pass any required query parameters
    });

    // If the API responds successfully, return the response data
    return response.data;
  } catch (error) {
    // Improved error logging for debugging
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('API Error Response:', error.response.data);
      console.error('Status Code:', error.response.status);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Request Error:', error.message);
    }
    throw error;  // Re-throw the error after logging it
  }
};
