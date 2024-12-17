// src/Pages/Home.jsx
import React from 'react';
import '../css/Home.css';
import { RiLeafLine, RiHeartLine, RiShieldStarLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import  Sidebar  from '../components/Sidebar';

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Chăm Sóc Sức Khỏe Người Cao Tuổi</h1>
          <p>Chúng tôi cung cấp dịch vụ chăm sóc chuyên nghiệp và tận tâm</p>
          <Link to="/services" className="cta-button">
            Khám phá dịch vụ
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Dịch Vụ Của Chúng Tôi</h2>
        <div className="features-grid">
          <div className="feature-card">
            <RiHeartLine className="feature-icon" />
            <h3>Chăm Sóc Sức Khỏe</h3>
            <p>Dịch vụ chăm sóc sức khỏe toàn diện 24/7</p>
          </div>
          <div className="feature-card">
            <RiShieldStarLine className="feature-icon" />
            <h3>An Toàn & Tin Cậy</h3>
            <p>Đội ngũ y tá chuyên nghiệp, giàu kinh nghiệm</p>
          </div>
          <div className="feature-card">
            <RiLeafLine className="feature-icon" />
            <h3>Môi Trường Sống</h3>
            <p>Không gian sống thoải mái, an toàn</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-content">
          <h2>Về Chúng Tôi</h2>
          <p>
            Với hơn 10 năm kinh nghiệm trong lĩnh vực chăm sóc người cao tuổi, 
            chúng tôi tự hào mang đến dịch vụ chất lượng cao và đáng tin cậy.
          </p>
          <Link to="/about" className="learn-more-btn">
            Tìm hiểu thêm
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <h2>Liên Hệ Với Chúng Tôi</h2>
        <div className="contact-grid">
          <div className="contact-info">
            <h3>Thông Tin Liên Hệ</h3>
            <p>Email: contact@healthcare.com</p>
            <p>Phone: (84) 123-456-789</p>
            <p>Địa chỉ: 123 Đường ABC, Thành phố XYZ</p>
          </div>
          <form className="contact-form">
            <input type="text" placeholder="Họ và tên" />
            <input type="email" placeholder="Email" />
            <textarea placeholder="Tin nhắn"></textarea>
            <button type="submit">Gửi</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;