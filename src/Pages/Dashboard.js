// src/Pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import '../css/Dashboard.css';
import { RiUserLine, RiCalendarLine, RiFileListLine, RiHeartLine, RiSettings4Line } from 'react-icons/ri';
import { BiDollar } from 'react-icons/bi';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('email');

      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/account', { 
          params: { email: email }
        });
        
        if (response.data && response.data.role) {
          setUserRole(response.data.role);
          // Update localStorage with the latest role
          localStorage.setItem('role', response.data.role);
        } else {
          setUserRole('user'); // Default to user if no role is found
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUserRole('user'); // Default to user on error
      }
    };

    fetchUserData();
  }, [navigate]);

  const AdminDashboard = () => (
    <>
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon">
            <RiUserLine />
          </div>
          <div className="stat-info">
            <h3>Tổng Khách Hàng</h3>
            <p className="stat-number">1,234</p>
            <span className="stat-change positive">+15.3%</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <BiDollar />
          </div>
          <div className="stat-info">
            <h3>Doanh Thu</h3>
            <p className="stat-number">$45,678</p>
            <span className="stat-change positive">+8.7%</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <RiCalendarLine />
          </div>
          <div className="stat-info">
            <h3>Tổng Lịch Hẹn</h3>
            <p className="stat-number">89</p>
            <span className="stat-change negative">-2.4%</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <RiHeartLine />
          </div>
          <div className="stat-info">
            <h3>Đánh Giá</h3>
            <p className="stat-number">4.8</p>
            <span className="stat-change positive">+0.3</span>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card activities">
          <h3>Hoạt Động Gần Đây</h3>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon">
                <RiUserLine />
              </div>
              <div className="activity-info">
                <p>Nguyễn Văn A đã đặt lịch hẹn</p>
                <span>2 phút trước</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">
                <RiFileListLine />
              </div>
              <div className="activity-info">
                <p>Cập nhật hồ sơ khách hàng</p>
                <span>1 giờ trước</span>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card appointments">
          <h3>Tất Cả Lịch Hẹn</h3>
          <div className="appointment-list">
            <div className="appointment-item">
              <div className="time">09:00</div>
              <div className="appointment-info">
                <h4>Trần Thị B</h4>
                <p>Khám định kỳ</p>
              </div>
              <div className="status pending">Đang chờ</div>
            </div>
            <div className="appointment-item">
              <div className="time">10:30</div>
              <div className="appointment-info">
                <h4>Lê Văn C</h4>
                <p>Tư vấn sức khỏe</p>
              </div>
              <div className="status completed">Hoàn thành</div>
            </div>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <button className="action-btn">
          <RiCalendarLine />
          Quản Lý Lịch Hẹn
        </button>
        <button className="action-btn">
          <RiUserLine />
          Quản Lý Người Dùng
        </button>
        <button className="action-btn">
          <RiSettings4Line />
          Cài Đặt Hệ Thống
        </button>
      </div>
    </>
  );

  const UserDashboard = () => (
    <>
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon">
            <RiCalendarLine />
          </div>
          <div className="stat-info">
            <h3>Lịch Hẹn Sắp Tới</h3>
            <p className="stat-number">2</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <RiFileListLine />
          </div>
          <div className="stat-info">
            <h3>Lịch Sử Khám</h3>
            <p className="stat-number">5</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <RiHeartLine />
          </div>
          <div className="stat-info">
            <h3>Sức Khỏe</h3>
            <p className="stat-number">Tốt</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card appointments">
          <h3>Lịch Hẹn Của Tôi</h3>
          <div className="appointment-list">
            <div className="appointment-item">
              <div className="time">15:00</div>
              <div className="appointment-info">
                <h4>Khám Định Kỳ</h4>
                <p>Bác sĩ: Nguyễn Văn X</p>
              </div>
              <div className="status upcoming">Sắp tới</div>
            </div>
          </div>
        </div>

        <div className="dashboard-card health-records">
          <h3>Hồ Sơ Sức Khỏe</h3>
          <div className="health-record-list">
            <div className="health-record-item">
              <div className="record-date">20/11/2023</div>
              <div className="record-info">
                <h4>Khám Tổng Quát</h4>
                <p>Kết quả: Sức khỏe bình thường</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <button className="action-btn">
          <RiCalendarLine />
          Đặt Lịch Hẹn
        </button>
        <button className="action-btn">
          <RiFileListLine />
          Xem Hồ Sơ
        </button>
        <button className="action-btn">
          <RiSettings4Line />
          Cài Đặt
        </button>
      </div>
    </>
  );

  return (
    <div className="dashboard">
      <Sidebar />
      {userRole === 'admin' ? <AdminDashboard /> : <UserDashboard />}
    </div>
  );
};

export default Dashboard;