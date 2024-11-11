// src/components/ExploreExercises.js

import React, { useEffect, useState } from 'react';
import { fetchExercises } from '../api/exerciseApi';
import VideoTutorials from './VideoTutorials';
import './ExploreExercises.css';

const ExploreExercises = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadExercises = async () => {
      try {
        const data = await fetchExercises();
        setExercises(data);
      } catch (error) {
        setError('Failed to load exercises. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadExercises();
  }, []);

  if (loading) return <div>Loading exercises...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Explore Exercises</h2>
      <div className="exercise-grid">
        {exercises.map((exercise) => (
          <div key={exercise.id} className="exercise-card">
            <h3>{exercise.name}</h3>
            <img src={exercise.gifUrl} alt={exercise.name} />
          </div>
        ))}
      </div>
      <h3>Find Tutorial Videos</h3>
      <input
        type="text"
        placeholder="Search for exercise videos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && <VideoTutorials exerciseName={searchTerm} />}
    </div>
  );
};

export default ExploreExercises;
