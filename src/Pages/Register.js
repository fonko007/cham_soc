import React, { useState } from 'react';
import axios from 'axios';
import '../css/login.css';
import { useNavigate } from 'react-router-dom';
import { FaUserShield, FaLock } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import { MdAttachEmail } from "react-icons/md";
import video from '../files/login.mp4';
import logo from '../files/logo.png';

const Register = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
  });

  const navigate = useNavigate();
  const handlenavigate = () => {
    navigate('/login');
  };

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await axios.post('http://localhost:5000/register', user);
      if (response.data.success) {
        setSuccess('Registration successful!');
        setUser({ username: '', email: '', password: '', role: 'user' });
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className='registerPage flex'>
      <div className='container flex'>
        <div className='videoDiv'>
          <video src={video} alt="Video" autoPlay muted loop />
          <div className='textDiv'>
            <h2 className='title'>Chăm Sóc</h2>
            <p>Chăm Sóc Sức Khỏe!</p>
          </div>
          <div className='footerDiv flex'>
            <span className='text'>Đã có tài khoản?</span>
            <button className='btn' onClick={handlenavigate}>Đăng Nhập</button>
          </div>
        </div>
        <div className='formDiv flex'>
          <div className="headerDiv">
            <img src={logo} alt="Logo Image" />
            <h3>Chào Mừng Trở Lại!</h3>
          </div>
          <form action="" className='form grid' onSubmit={handleSubmit}>
            {error && <span className='showMessage'>{error}</span>}
            {success && <span className='showMessage'>{success}</span>}
            <div className="inputDiv">
              <label htmlFor="username">Tên Tài Khoản</label>
              <div className="input flex">
                <MdAttachEmail className='icon' />
                <input
                  type="text"
                  placeholder='Nhập tên tài khoản'
                  name="username"
                  autoComplete="nope"
                  value={user.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>   
            <div className="inputDiv">
              <label htmlFor="email">Tài Khoản Email</label>
              <div className="input flex">
                <FaUserShield className='icon' />
                <input
                  type="email"
                  placeholder='Nhập Email'
                  name="email"
                  autoComplete="nope"
                  value={user.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>              
            <div className="inputDiv">
              <label htmlFor="password">Mật Khẩu</label>
              <div className="input flex">
                <FaLock className='icon' />
                <input
                  type="password"
                  placeholder='Nhập Mật Khẩu'
                  name="password"
                  autoComplete="new-password"
                  value={user.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <button type='submit' className='btn flex'>
              <span>Đăng ký</span>
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

export default Register;
