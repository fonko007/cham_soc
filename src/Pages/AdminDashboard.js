import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import '../css/AdminDashboard.css';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkPermission = async () => {
      const email = localStorage.getItem('email');
      if (!email) {
        navigate('/admin/login');
        return;
      }
      try {
        const response = await axios.post('https://cssuckhoe.xyz/api/check-permission', { email });
        if (response.data.isAdmin !== 'admin') {
          navigate('/admin/login');
        }
      } catch (error) {
        console.error('Error checking permissions:', error);
        navigate('/admin/login');
      }
    };

    const fetchBookings = async () => {
      try {
        const response = await axios.get('https://cssuckhoe.xyz/api/bookings');
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    checkPermission();
    fetchBookings();
  }, [navigate]);

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <h1>Admin Dashboard</h1>
        <table>
          <thead>
            <tr>
              <th>Họ và tên</th>
              <th>Email</th>
              <th>Số Điện Thoại</th>
              <th>Địa chỉ</th>
              <th>Ngày</th>
              <th>Thời gian</th>
              <th>Ghi chú</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.fullname}</td>
                <td>{booking.email}</td>
                <td>{booking.sdt}</td>
                <td>{booking.address}</td>
                <td>{booking.date}</td>
                <td>{booking.time}</td>
                <td>{booking.ghichu}</td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
