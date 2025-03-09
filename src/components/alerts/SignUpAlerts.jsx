import React, { useState } from "react";

export default function SignupAlert() {
  const [showAlert, setShowAlert] = useState(false);

  const handleCheckUser = () => {
    setShowAlert(true);
  };

  return (
    <div>
      <button onClick={handleCheckUser}>Proceed</button>

      {showAlert && (
        <div className="alert">
          <p>You need to sign up before proceeding.</p>
          <button onClick={() => (window.location.href = "/Register")}>Sign Up</button>
          <button onClick={() => setShowAlert(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}