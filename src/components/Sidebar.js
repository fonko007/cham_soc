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
          <h4>Quick Menu</h4>
          <ul className="sidebar-menu">
            <li className={`menu-item ${location.pathname === '/dashboard' ? 'active' : ''}`}>
              <Link to="/dashboard" className="menu-link" onClick={() => setIsMobileMenuOpen(false)}>
                <RiDashboardLine className="menu-icon" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li className={`menu-item ${location.pathname === '/services' ? 'active' : ''}`}>
              <Link to="/services" className="menu-link" onClick={() => setIsMobileMenuOpen(false)}>
                <RiShoppingBag3Line className="menu-icon" />
                <span>My Orders</span>
              </Link>
            </li>
            <li className={`menu-item ${location.pathname === '/explore' ? 'active' : ''}`}>
              <Link to="/explore" className="menu-link" onClick={() => setIsMobileMenuOpen(false)}>
                <RiCompassDiscoverLine className="menu-icon" />
                <span>Explore</span>
              </Link>
            </li>
            <li className={`menu-item ${location.pathname === '/products' ? 'active' : ''}`}>
              <Link to="/products" className="menu-link" onClick={() => setIsMobileMenuOpen(false)}>
                <RiPlantLine className="menu-icon" />
                <span>Products</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="menu-section">
          <h4>Settings</h4>
          <ul className="sidebar-menu">
            <li className={`menu-item ${location.pathname === '/charts' ? 'active' : ''}`}>
              <Link to="/charts" className="menu-link" onClick={() => setIsMobileMenuOpen(false)}>
                <IoStatsChartOutline className="menu-icon" />
                <span>Charts</span>
              </Link>
            </li>
            <li className={`menu-item ${location.pathname === '/trends' ? 'active' : ''}`}>
              <Link to="/trends" className="menu-link" onClick={() => setIsMobileMenuOpen(false)}>
                <IoTrendingUpOutline className="menu-icon" />
                <span>Trends</span>
              </Link>
            </li>
            <li className={`menu-item ${location.pathname === '/contact' ? 'active' : ''}`}>
              <Link to="/contact" className="menu-link" onClick={() => setIsMobileMenuOpen(false)}>
                <HiOutlineMail className="menu-icon" />
                <span>Contact</span>
              </Link>
            </li>
            <li className={`menu-item ${location.pathname === '/settings' ? 'active' : ''}`}>
              <Link to="/settings" className="menu-link" onClick={() => setIsMobileMenuOpen(false)}>
                <IoSettingsOutline className="menu-icon" />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="help-center">
          <BiSupport className="help-icon" />
          <h4>Help Center</h4>
          <p>Having trouble in Planti? Please contact us for more questions.</p>
          <button className="contact-btn" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;