import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import '../../css/AdminDashboard.css';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [recentBooking, setRecentBooking] = useState(null);
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
        console.error('Lỗi kiểm tra quyền:', error);
        navigate('/admin/login');
      }
    };

    const fetchBookings = async () => {
      try {
        const response = await axios.get('https://cssuckhoe.xyz/api/bookings');
        const sortedBookings = response.data
          .sort((a, b) => {
            if (a.status === 'cần xác nhận' && b.status !== 'cần xác nhận') return -1;
            if (a.status !== 'cần xác nhận' && b.status === 'cần xác nhận') return 1;
            if (a.status === 'đang xử lí' && b.status !== 'đang xử lí') return -1;
            if (a.status !== 'đang xử lí' && b.status === 'đang xử lí') return 1;
            if (a.status === 'đã xử lí' && b.status !== 'đã xử lí') return 1;
            if (a.status !== 'đã xử lí' && b.status === 'đã xử lí') return -1;
            return new Date(b.create_at) - new Date(a.create_at);
          });
        setBookings(sortedBookings);
        setRecentBooking(sortedBookings[0]);
      } catch (error) {
        console.error('Lỗi lấy lịch hẹn:', error);
      }
    };

    checkPermission();
    fetchBookings();
  }, [navigate]);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`https://cssuckhoe.xyz/api/bookings/${id}`, { status });
      setBookings(bookings.map(booking => booking.id === id ? { ...booking, status } : booking));
    } catch (error) {
      console.error('Lỗi cập nhật trạng thái:', error);
    }
  };

  const removeBooking = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa lịch hẹn này không?')) {
      try {
        await axios.delete(`https://cssuckhoe.xyz/api/bookings/${id}`);
        setBookings(bookings.filter(booking => booking.id !== id));
      } catch (error) {
        console.error('Lỗi xóa lịch hẹn:', error);
      }
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'cần xác nhận':
        return 'status-red';
      case 'đang xử lí':
        return 'status-yellow';
      case 'đã xử lí':
        return 'status-green';
      default:
        return '';
    }
  };

  const getTimeDifference = (date) => {
    const now = new Date();
    const bookingDate = new Date(date);
    const diffInSeconds = Math.floor((now - bookingDate) / 1000);
    if (diffInSeconds < 60) {
      return `${diffInSeconds} giây trước`;
    }
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    return `${diffInMinutes} phút trước`;
  };

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <h1>Quản lí lịch hẹn</h1>
        {recentBooking && (
          <div className="notification">
            {recentBooking.fullname} Vừa đặt lịch {getTimeDifference(recentBooking.create_at)}
          </div>
        )}
        <div className="status-blocks">
          <div className="status-block status-red">
            <h2>Cần xác nhận</h2>
            <p>{bookings.filter(booking => booking.status === 'cần xác nhận').length} lịch hẹn</p>
          </div>
          <div className="status-block status-yellow">
            <h2>Đang xử lí</h2>
            <p>{bookings.filter(booking => booking.status === 'đang xử lí').length} lịch hẹn</p>
          </div>
          <div className="status-block status-green">
            <h2>Đã xử lí</h2>
            <p>{bookings.filter(booking => booking.status === 'đã xử lí').length} lịch hẹn</p>
          </div>
          <div className="status-block">
            <h2>Tất cả lịch hẹn</h2>
            <p>{bookings.length} lịch hẹn</p>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Họ và tên</th>
              <th>Email</th>
              <th>Số Điện Thoại</th>
              <th>Địa chỉ</th>
              <th>Ngày</th>
              <th>Ghi chú</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.fullname}</td>
                <td>{booking.email}</td>
                <td>{booking.sdt}</td>
                <td>{booking.address}</td>
                <td>{new Date(booking.date).toLocaleDateString()}</td>
                <td>{booking.ghichu}</td>
                <td className={getStatusClass(booking.status)}>{booking.status}</td>
                <td>
                  <select value={booking.status} onChange={(e) => updateStatus(booking.id, e.target.value)}>
                    <option value="cần xác nhận">Cần xác nhận</option>
                    <option value="đang xử lí">Đang xử lí</option>
                    <option value="đã xử lí">Đã xử lí</option>
                  </select>
                  {booking.status === 'đã xử lí' && (
                    <button className="button" onClick={() => removeBooking(booking.id)}>Xóa</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
