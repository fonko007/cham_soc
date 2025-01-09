import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Sidebar.css';
import { RiDashboardLine, RiShoppingBag3Line, RiCompassDiscoverLine, RiPlantLine, RiMenuLine, RiCloseLine } from 'react-icons/ri';
import { BiSupport } from 'react-icons/bi';
import axios from 'axios';

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Add state for admin
  const location = useLocation();

  // Close sidebar when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    // Check if user has admin permissions using API
    const checkAdmin = async () => {
      const email = localStorage.getItem('email');
      try {
        const response = await axios.post('https://cssuckhoe.xyz/api/check-permission', { email });
        if (response.data.isAdmin === 'admin') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Error checking permissions:', error);
        setIsAdmin(false);
      }
    };

    checkAdmin();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : '';
    const containers = document.querySelectorAll('.services-container, .main-content, .home');
    containers.forEach(container => {
      container.style.marginLeft = !isMobileMenuOpen && window.innerWidth <= 768 ? '0' : '';
    });
  };

  return (
    <>
      <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? (
          <RiCloseLine className="mobile-menu-icon" />
        ) : (
          <RiMenuLine className="mobile-menu-icon" />
        )}
      </button>

      <div className={`overlay ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}></div>
      
      <div className={`sidebar ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="sidebar-header">
          <RiPlantLine className="logo-icon" />
          <h2>Cham Soc</h2>
        </div>

        <div className="menu-section">
          <h4>Dịch Vụ</h4>
          <ul className="sidebar-menu">
            <li className={`menu-item ${location.pathname === '/' ? 'active' : ''}`}>
              <Link to="/" className="menu-link" onClick={() => setIsMobileMenuOpen(false)}>
                <RiDashboardLine className="menu-icon" />
                <span>Trang Chủ</span>
              </Link>
            </li>
            <li className={`menu-item ${location.pathname === '/services' ? 'active' : ''}`}>
              <Link to="/services" className="menu-link" onClick={() => setIsMobileMenuOpen(false)}>
                <RiShoppingBag3Line className="menu-icon" />
                <span>Dịch vụ chăm sóc người cao tuổi</span>
              </Link>
            </li>
            <li className={`menu-item ${/^\/news(\/\d+)?$/.test(location.pathname) ? 'active' : ''}`}>
              <Link to="/news" className="menu-link" onClick={() => setIsMobileMenuOpen(false)}>
                <RiCompassDiscoverLine className="menu-icon" />
                <span>Tin tức về sức khỏe</span>
              </Link>
            </li>
            <li className={`menu-item ${location.pathname === '/camera' ? 'active' : ''}`}>
              <Link to="/camera" className="menu-link" onClick={() => setIsMobileMenuOpen(false)}>
                <RiPlantLine className="menu-icon" />
                <span>Quan sát người thân</span>
              </Link>
            </li>
          </ul>
        </div>

        {isAdmin && (
          <div className="menu-section">
            <h4>Admin</h4>
            <ul className="sidebar-menu">
              <li className={`menu-item ${location.pathname === '/admin/dashboard' ? 'active' : ''}`}>
                <Link to="/admin/dashboard" className="menu-link" onClick={() => setIsMobileMenuOpen(false)}>
                  <RiDashboardLine className="menu-icon" />
                  <span>Quản lí lịch hẹn</span>
                </Link>
              </li>
              <li className={`menu-item ${location.pathname === '/admin/articles' ? 'active' : ''}`}>
                <Link to="/admin/articles" className="menu-link" onClick={() => setIsMobileMenuOpen(false)}>
                  <RiPlantLine className="menu-icon" />
                  <span>Tạo bài viết</span>
                </Link>
              </li>
              <li className={`menu-item ${location.pathname === '/admin/articlesmanage' ? 'active' : ''}`}>
                <Link to="/admin/articlesmanage" className="menu-link" onClick={() => setIsMobileMenuOpen(false)}>
                  <RiPlantLine className="menu-icon" />
                  <span>Quản lý bài viết</span>
                </Link>
              </li>
            </ul>
          </div>
        )}

        <div className="help-center">
          <BiSupport className="help-icon" />
          <h4>Help Center</h4>
          <p>Có vấn đề về dịch vụ? Liên hê cho chúng tôi</p>
          <button className="contact-btn" onClick={() => setIsMobileMenuOpen(false)}>Liên Hệ</button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;