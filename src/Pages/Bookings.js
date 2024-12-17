import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Bookings = () => {
  const [account, setAccount] = useState({});
  const [bookings, setBookings] = useState([]);
  const email = localStorage.getItem('email');
  
  const navigate = useNavigate();

  useEffect(() => { 
    // Check if a token exists in local storage 
    const token = localStorage.getItem('token'); 
    if (!token) { 
      navigate('/login'); 
      // Navigate to home if token exists 
      } }, [navigate]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/booked', { params: { email: email }});
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    const fetchAccountData = async () => { 
      try { 
        const response = await axios.get('http://localhost:3306/account', { params: { email: email } });
        setAccount(response.data); 
      } catch (error) { 
        console.error('Error fetching account data:', error); 
      } 
    };

    if (email) {
      fetchBookings();
      fetchAccountData();
    }
  }, [email]);

  const handleCancel = async (bookingId) => {
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
    <div className="container">
      <div className="account-section">
        <p><strong>Username:</strong> {account.username}</p> 
        <p><strong>Email:</strong> {account.email}</p>  
        <p><strong>Role:</strong> {account.role}</p>
      </div>
      <div className="bookings-section">
        <h2>Booked Appointments</h2>
        {bookings.length === 0 ? (
          <p>No appointments booked.</p>
        ) : (
          <ul>
            {bookings.map((booking) => (
              <li key={booking.id} className="booking-item">
                <p><strong>Full Name:</strong> {booking.fullname}</p>
                <p><strong>Email:</strong> {booking.email}</p> 
                <p><strong>Phone:</strong> {booking.sdt}</p> 
                <p><strong>Address:</strong> {booking.address}</p> 
                <p><strong>Date:</strong> {booking.date}</p> 
                <p><strong>Time:</strong> {booking.time}</p> 
                <p><strong>Status:</strong> {booking.status}</p> 
                <p><strong>Notes:</strong> {booking.ghichu}</p>
                <p><strong>Created Time:</strong> {booking.create_at}</p>
                <button className="cancel-button" onClick={() => handleCancel(booking.id)}>Cancel Booking</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Bookings;
