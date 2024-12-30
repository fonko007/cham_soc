import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import '../css/Contact.css';

const Contact = () => {
  const location = useLocation();
  const phone = '0949936034';
  const email = 'snowfoxmc123@gmail.com';

  return (
    <div className="contact-page">
      <Sidebar />
      <div className="contact-content">
        <h1>Liên Hệ Chúng Tôi</h1>
        <p>Số Điện Thoại: {phone}</p>
        <p>Email: {email}</p>
      </div>
    </div>
  );
};

export default Contact;
