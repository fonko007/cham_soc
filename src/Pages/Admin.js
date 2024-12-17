import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3306/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/adminbooked');
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchUsers();
    fetchBookings();
  }, []);

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/users/${userId}`);
        setUsers(users.filter(user => user.id !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleCancelBooking = async (bookingId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
    if (confirmCancel) {
      try {
        await axios.delete(`http://localhost:5000/booking/${bookingId}`);
        setBookings(bookings.filter(booking => booking.id !== bookingId));
      } catch (error) {
        console.error('Error cancelling booking:', error);
      }
    }
  };

  return (
    <div className="admin-container">
      <div className="users-section">
        <h2>Manage Users</h2>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Display Name:</strong> {user.displayname}</p>
                <button className="delete-button" onClick={() => handleDeleteUser(user.id)}>Delete User</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="bookings-section">
        <h2>Manage Bookings</h2>
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <ul>
            {bookings.map((booking) => (
              <li key={booking.id}>
                <p><strong>Full Name:</strong> {booking.fullname}</p>
                <p><strong>Email:</strong> {booking.email}</p>
                <p><strong>Phone:</strong> {booking.sdt}</p>
                <p><strong>Address:</strong> {booking.address}</p>
                <p><strong>Date:</strong> {booking.date}</p>
                <p><strong>Time:</strong> {booking.time}</p>
                <p><strong>Status:</strong> {booking.status}</p>
                <p><strong>Notes:</strong> {booking.ghichu}</p>
                <button className="cancel-button" onClick={() => handleCancelBooking(booking.id)}>Cancel Booking</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Admin;
