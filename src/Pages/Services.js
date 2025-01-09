import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import '../css/Services.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Services = () => {
  const initialFormData = {
    fullname: '',
    email: '',
    sdt: '',
    address: '',
    date: '',
    ghichu: '',
    status: 'cần xác nhận',
  };

  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://cssuckhoe.xyz/api/bookings', {
        ...formData,
        create_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        toast.success('Lưu dữ liệu thành công');
        setFormData(initialFormData); // Clear the form
      } else {
        toast.error('Lưu dữ liệu thất bại');
        console.error('Lỗi khi lưu dữ liệu:', response.statusText);
      }
    } catch (error) {
      toast.error('Lưu dữ liệu thất bại');
      console.error('Lỗi khi lưu dữ liệu:', error);
    }
  };

  const handleContact = () => {
    navigate(`/contact`);
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
          Ghi chú:
          <textarea name="ghichu" value={formData.ghichu} onChange={handleChange} required />
        </label>
        <button type="submit">Gửi</button>
        <button type="button" onClick={handleContact}>Liên hệ</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Services;