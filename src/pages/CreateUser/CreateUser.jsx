import React, { useState } from 'react';
import axios from 'axios';

export default function CreateUser() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user' // By default, the user will be a "user", but you can change this if needed
  });

  const [error, setError] = useState(null); // To display errors if they occur
  const [success, setSuccess] = useState(null); // To display a success message

  // Function to handle changes in the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Function to submit the form and create a new user
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Form submitted:', formData);

    try {
      const response = await axios.post('http://localhost:3000/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      // Check if the response is correct (status 201 for creation)
      if (response.status === 201) {
        console.log('User created:', response.data);
        setSuccess('Sign-up successful!');
        setError(null);  // Reset any errors if present
      } else {
        // If not status 201, show the error message
        setError(response.data.message || 'Unknown error');
        setSuccess(null);  // Reset success message if present
      }
    } catch (error) {
      // If the error is related to the server response
      if (error.response) {
        console.error('Error during sign-up:', error.response.data);
        setError(error.response.data || 'Error during sign-up. Please try again.');
      } else if (error.request) {
        // If the request was sent but no response from the server
        console.error('No response from server:', error.request);
        setError('No response from server. Please try again later.');
      } else {
        // If another type of error occurred
        console.error('Error in setting up request:', error.message);
        setError('Error during sign-up. Please try again.');
      }
      setSuccess(null);  // Reset success message if present
    }
  };

  return (
    <div className="signup-container">
      <h1>Create an Account</h1>

      {/* Display success or error messages */}
      {success && <div className="success">{success}</div>}
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit">Confirm Order</button>
      </form>
    </div>
  );
}
