import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Sidebar.css';
import { RiDashboardLine, RiShoppingBag3Line, RiCompassDiscoverLine, RiPlantLine, RiMenuLine, RiCloseLine } from 'react-icons/ri';
import { IoSettingsOutline, IoStatsChartOutline, IoTrendingUpOutline } from 'react-icons/io5';
import { BiSupport } from 'react-icons/bi';
import { HiOutlineMail } from 'react-icons/hi';

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
            <li className={`menu-item ${location.pathname === '/dashboard' ? 'active' : ''}`}>
              <Link to="/dashboard" className="menu-link" onClick={() => setIsMobileMenuOpen(false)}>
                <RiDashboardLine className="menu-icon" />
                <span>Trang Chính</span>
              </Link>
            </li>
            <li className={`menu-item ${location.pathname === '/services' ? 'active' : ''}`}>
              <Link to="/services" className="menu-link" onClick={() => setIsMobileMenuOpen(false)}>
                <RiShoppingBag3Line className="menu-icon" />
                <span>Đặt Lịch</span>
              </Link>
            </li>
            <li className={`menu-item ${location.pathname === '/news' ? 'active' : ''}`}>
              <Link to="/news" className="menu-link" onClick={() => setIsMobileMenuOpen(false)}>
                <RiCompassDiscoverLine className="menu-icon" />
                <span>Bài Viết</span>
              </Link>
            </li>
            <li className={`menu-item ${location.pathname === '/dichvu' ? 'active' : ''}`}>
              <Link to="/products" className="menu-link" onClick={() => setIsMobileMenuOpen(false)}>
                <RiPlantLine className="menu-icon" />
                <span>Dịch vụ</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="menu-section">
          <h4>Hỗ Trợ</h4>
          <ul className="sidebar-menu">
            <li className={`menu-item ${location.pathname === '/contact' ? 'active' : ''}`}>
              <Link to="/contact" className="menu-link" onClick={() => setIsMobileMenuOpen(false)}>
                <HiOutlineMail className="menu-icon" />
                <span>Liên Hệ</span>
              </Link>
            </li>
            <li className={`menu-item ${location.pathname === '/settings' ? 'active' : ''}`}>
              <Link to="/settings" className="menu-link" onClick={() => setIsMobileMenuOpen(false)}>
                <IoSettingsOutline className="menu-icon" />
                <span>Cài Đặt</span>
              </Link>
            </li>
          </ul>
        </div>

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