import React, { useState } from 'react';
import './Login.css'
import ApiService from './apiService';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
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
      const response = await ApiService.register('/api/login/', formData);
      setFormData({
        username: '',
        password: '',
      });
      window.location.reload();
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', response.data.user_id);
      console.log('Successful API response:', response.data);
      console.log("localStorage.getItem('token') ", localStorage.getItem('token'))
      console.log("localStorage.getItem('user') ", localStorage.getItem('user'))

    } catch (error) {
      console.error('Error fetching data:', error);
    }

  };

  return (
    <div className='main-container'>
      <div className='container'>
        <h2 className='h2-header'>Login</h2>
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
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder='Password'
            />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
