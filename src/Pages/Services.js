import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import '../css/Services.css';
import axios from 'axios';

const Services = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    sdt: '',
    address: '',
    date: '',
    time: '',
    ghichu: '',
    status: 'Todo'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://cssuckhoe.xyz/api/bookings', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        alert('Data saved successfully');
      } else {
        alert('Failed to save data');
        console.error('Error saving data:', response.statusText);
      }
    } catch (error) {
      alert('Failed to save data');
      console.error('Error saving data:', error);
    }
  };

  return (
    <div className="services-page">
      <Sidebar />
      <iframe src='/servicesinfo'></iframe>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Họ và tên:
          <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Số Điện Thoại:
          <input type="tel" name="sdt" value={formData.sdt} onChange={handleChange} required />
        </label>
        <label>
          Địa chỉ:
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </label>
        <label>
          Ngày:
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </label>
        <label>
          Thời gian:
          <input type="time" name="time" value={formData.time} onChange={handleChange} required />
        </label>
        <label>
          Ghi chú:
          <textarea name="ghichu" value={formData.ghichu} onChange={handleChange} required />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Services;