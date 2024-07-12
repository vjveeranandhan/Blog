import React, {useState } from 'react';
import './Signup.css'
import ApiService from './apiService';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    console.log("Change in input data")
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiService.register('/api/register/', formData);
      console.log('Successful API response:', response.data);
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className='main-container'>
      <div className='container'>
        <h2 className='h2-header'>Signup</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder='Username'
            />
          </label>
          <br />
          <label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder='Email'
            />
          </label>
          <br />
          <label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder='Password'
            />
          </label>
          <br />
          <label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder='Confirm password'
            />
          </label>
          <br />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
