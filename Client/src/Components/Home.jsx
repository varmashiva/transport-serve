import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [userRole, setUserRole] = useState(null); // "driver" or "admin"
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate user login status and role fetching
    const role = localStorage.getItem('userRole'); // e.g., "driver" or "admin"
    setUserRole(role);
  }, []);

  const handleLogin = () => {
    navigate('/login'); // Navigate to login page
  };

  const navigateToDashboard = () => {
    if (userRole === 'driver') {
      navigate('/driver-dashboard');
    } else if (userRole === 'admin') {
      navigate('/admin-dashboard');
    }
  };

  return (
    <div className="home-container">
      <header className="navbar">
        <h1>University Transport Service</h1>
        <div className="nav-links">
          {userRole ? (
            <button onClick={navigateToDashboard}>
              {userRole === 'driver' ? 'Driver Dashboard' : 'Admin Dashboard'}
            </button>
          ) : (
            <button onClick={handleLogin}>Login</button>
          )}
        </div>
      </header>

      <main className="home-main">
        <section className="intro-section">
          <h2>Welcome to the University Transport Service Portal</h2>
          <p>Manage bus repair and service requests efficiently.</p>
        </section>

        <section className="features-section">
          <h3>Our Features</h3>
          <ul>
            <li>Submit bus repair requests easily.</li>
            <li>Admins can approve or reject service requests.</li>
            <li>Upload feedback and service receipts after work completion.</li>
          </ul>
        </section>
      </main>

      <footer className="home-footer">
        <p>&copy; 2024 University Transport Service</p>
      </footer>
    </div>
  );
};

export default Home;
