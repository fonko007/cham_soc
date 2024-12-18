import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/login.css';
import {useNavigate} from 'react-router-dom';
import { FaUserShield} from "react-icons/fa";
import {FaLock} from "react-icons/fa"
import {IoIosLogIn} from "react-icons/io";
import video from '../files/login.mp4'
import logo from '../files/logo.png'

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => { 
    // Check if a token exists in local storage 
    const token = localStorage.getItem('token'); 
    if (token) { 
      navigate('/home'); 
      // Navigate to home if token exists 
      } }, [navigate]);

  const handlenavigate = () => {
    navigate('/register')
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const loginUser = async (credentials) => {
    try {
      const response = await axios.post('http://s88d104.cloudnetwork.vn:5000/login', credentials);
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
      localStorage.setItem('email', credentials.email); // Store the email in localStorage
      navigate('/home');
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
    <div className='loginPage flex'>
      <div className='container flex'>

        <div className='videoDiv'>
          <video src={video} alt="Video" autoPlay muted loop/>

          <div className='textDiv'>
            <h2 className='title'>Chăm Sóc</h2>
            <p>Chăm Sóc Sức Khỏe!</p>
          </div>

          <div className='footerDiv flex'>
            <span className='text'>Không có tài khoản?</span>
            <button className='btn' onClick={handlenavigate}>Đăng ký</button>
          </div>
        </div>
        <div className='formDiv flex'>
            <div className="headerDiv">
              <img src={logo} alt="Logo Image" />
              <h3>Chào Mừng Trở Lại!</h3>
            </div>

            <form action="" className='form grid'>
            {error && <span className='showMessage'>{error}</span>}
              <div className="inputDiv">
                <label htmlFor="email">Tài Khoản Email</label>
                <div className="input flex">
                  <FaUserShield className='icon'/>
                  <input type="email" placeholder='Nhập Email' name="email" autoComplete="nope" value={credentials.email} onChange={handleChange} required/>
                </div>
              </div>              
              <div className="inputDiv">
                <label htmlFor="password">Mật Khẩu</label>
                <div className="input flex">
                  <FaLock  className='icon'/>
                  <input type="password" placeholder='Nhập Mật Khẩu' name="password" autoComplete="new-password" value={credentials.password} onChange={handleChange} required/>
                </div>
              </div>

              <button type='submit' className='btn flex' onClick={handleSubmit}>
                <span>Đăng Nhập</span>
                <IoIosLogIn className='icon' />
              </button>

              <span className='forgotPassword'>
                Quên Mật Khẩu? <a href=''>Bấm vào đây</a>
              </span>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Login;


