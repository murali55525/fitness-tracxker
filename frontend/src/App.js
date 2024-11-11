// src/App.js
import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import WorkoutHistory from './components/WorkoutHistory';
import WorkoutStats from './components/WorkoutStats';
import ExploreExercises from './components/ExploreExercises';
import VideoTutorials from './components/VideoTutorials';
import FindFood from './components/FindFood';
import FindCalories from './components/FindCalories';
import BMICalculator from './components/BMICalculator';
import ChatBot from './components/ChatBot';  // Updated import
import './App.css';
import motivationImage from './components/sam.jpg';

function App() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [activeTab, setActiveTab] = useState('workoutHistory');

  return (
    <div className="app">
      {isAuthenticated ? (
        <div>
          <header className="navbar">
            <h1 className="app-title">Fit Track</h1>
            <nav className="navbar-links">
              <button onClick={() => setActiveTab('findCalories')}>Log Workout</button>
              <button onClick={() => setActiveTab('workoutHistory')}>View History</button>
              <button onClick={() => setActiveTab('workoutStats')}>Statistics & Analytics</button>
              <button onClick={() => setActiveTab('exploreExercises')}>Explore Exercises</button>
              <button onClick={() => setActiveTab('videoTutorials')}>Video Tutorials</button>
              <button onClick={() => setActiveTab('findFood')}>Find Food</button>
              <button onClick={() => setActiveTab('bmiCalculator')}>BMI Calculator</button>
              <button onClick={() => setActiveTab('chatbot')}>ChatBot</button> {/* Updated Button Label */}
              <button onClick={() => logout({ returnTo: window.location.origin })}>Logout</button>
            </nav>
          </header>

          {/* Render components based on activeTab */}
          {activeTab === 'findFood' && <FindFood />}
          {activeTab === 'workoutHistory' && <WorkoutHistory />}
          {activeTab === 'workoutStats' && <WorkoutStats />}
          {activeTab === 'exploreExercises' && <ExploreExercises />}
          {activeTab === 'videoTutorials' && <VideoTutorials />}
          {activeTab === 'findCalories' && <FindCalories />}
          {activeTab === 'bmiCalculator' && <BMICalculator />}
          {activeTab === 'chatbot' && <ChatBot />} {/* Updated to render ChatBot */}
        </div>
      ) : (
        <div className="login-container">
          <div className="login-content">
            <img
              src={motivationImage}
              alt="Workout Motivation"
              className="login-image"
            />
            <div className="login-details">
              <h2>Please log in to track your workouts.</h2>
              <button onClick={loginWithRedirect} className="login-button">
                Log In
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
