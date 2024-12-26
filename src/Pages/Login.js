import React, { useState } from 'react';
import axios from 'axios';
import '../css/Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const loginUser = async (credentials) => {
    try {
      const response = await axios.post('https://cssuckhoe.xyz/api/login', credentials);
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Đã xảy ra lỗi. Vui lòng thử lại');
      return null;
    }
  };

  const handleResponse = (data) => {
    if (data && data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', credentials.email);
      navigate('/admin/dashboard');
    } else {
      setError('Sai Email hoặc mật Khẩu. Vui lòng thử lại');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await loginUser(credentials);
    handleResponse(data);
  };

  return (
    <div className='wrapper'>
      <div className='container'>
        <div className='col-left'>
          <div className='login-text'>
            <h2>Welcome Back</h2>
          </div>
        </div>
        <div className='col-right'>
          <div className='login-form'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              {error && <span className='showMessage'>{error}</span>}
              <p>
                <label>Username or email address<span>*</span></label>
                <input type="text" name="email" placeholder="Username or Email" value={credentials.email} onChange={handleChange} required />
              </p>
              <p>
                <label>Password<span>*</span></label>
                <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChange} required />
              </p>
              <p>
                <input type="submit" value="Sign In" />
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
