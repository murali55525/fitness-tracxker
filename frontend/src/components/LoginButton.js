import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import './LoginButton.css'; // Import the CSS file for styling

function LoginButton() {
  const { loginWithRedirect } = useAuth0();
  return (
    <div className="login-container">
      <img
        src="C:\Users\mmura\Downloads\FitnessTracker-main(2)\FitnessTracker-main\frontend\src\components\sam.jpg" // Placeholder image URL, replace with your actual image URL
        alt="Login"
        className="login-image"
      />
      <button onClick={() => loginWithRedirect()} className="login-button">
        Log in
      </button>
    </div>
  );
}

export default LoginButton;
