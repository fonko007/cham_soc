import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Notfound.css';
import { BiArrowBack } from 'react-icons/bi';

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1>404</h1>
        <div className="error-circle">
          <div className="error-icon">
            <span>?</span>
          </div>
        </div>
        <h2>Trang không tồn tại</h2>
        <p>Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.</p>
        <Link to="/" className="back-btn">
          <BiArrowBack className="back-icon"/>
          Trở về trang chủ
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
