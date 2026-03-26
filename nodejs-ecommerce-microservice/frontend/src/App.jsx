import React from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Register from './pages/Register';
import Login from './pages/Login';
import Doctors from './pages/Doctors';
import MyAppointments from './pages/MyAppointments';
import BookAppointment from './pages/BookAppointment';
import Profile from './pages/Profile';
import './index.css';
import DoctorLogin from './pages/DoctorLogin';
import DoctorDashboard from './pages/DoctorDashboard';
import DoctorAppointments from './pages/DoctorAppointments';

function Home() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <span className="badge">Trusted Healthcare Platform</span>
          <h1>Smart Healthcare Appointment System</h1>
          <p>
            Book appointments with expert doctors, manage your consultations,
            and access healthcare services through a modern microservices-based platform.
          </p>

          <div className="hero-buttons">
            <Link to="/doctors" className="btn btn-primary">Find Doctors</Link>
            <Link to="/register" className="btn btn-secondary">Get Started</Link>
          </div>
        </div>

        <div className="hero-panel">
          <div className="hero-stat-card">
            <h3>500+</h3>
            <p>Appointments Managed</p>
          </div>
          <div className="hero-stat-card">
            <h3>50+</h3>
            <p>Qualified Specialists</p>
          </div>
          <div className="hero-stat-card">
            <h3>24/7</h3>
            <p>Service Access</p>
          </div>
        </div>
      </section>

      <section className="feature-section">
        <div className="section-header">
          <h2>Why Choose Our Platform?</h2>
          <p>Designed for convenience, trust, and smooth healthcare management.</p>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">🩺</div>
            <h3>Expert Doctors</h3>
            <p>Access experienced specialists across multiple departments.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Easy Booking</h3>
            <p>Schedule appointments quickly with a clean and simple process.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure Access</h3>
            <p>Your account and appointment data stay safe and organized.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="brand-block">
          <div className="brand-logo">+</div>
          <div>
            <div className="brand">SmartHealthcare</div>
            <div className="brand-subtitle">Professional Care Platform</div>
          </div>
        </div>

        <div className="nav-links">
          <Link className={isActive('/') ? 'nav-link active-link' : 'nav-link'} to="/">Home</Link>
          <Link className={isActive('/register') ? 'nav-link active-link' : 'nav-link'} to="/register">Register</Link>
          <Link className={isActive('/login') ? 'nav-link active-link' : 'nav-link'} to="/login">Login</Link>
          <Link className={isActive('/doctors') ? 'nav-link active-link' : 'nav-link'} to="/doctors">Doctors</Link>
          <Link className={isActive('/appointments') ? 'nav-link active-link' : 'nav-link'} to="/appointments">My Appointments</Link>
          <Link className={isActive('/profile') ? 'nav-link active-link' : 'nav-link'} to="/profile">Profile</Link>
        </div>

        <div className="nav-right">
          <div className="user-chip">
            {user?.name ? `Hi, ${user.name}` : 'Guest User'}
          </div>
          {user?.name && (
            <button className="btn btn-danger nav-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div>
          <h3>SmartHealthcare</h3>
          <p>
            A professional healthcare appointment platform powered by microservices.
          </p>
        </div>

        <div>
          <h4>Services</h4>
          <p>Doctor Discovery</p>
          <p>Appointment Booking</p>
          <p>Patient Records</p>
        </div>

        <div>
          <h4>Contact</h4>
          <p>support@smarthealthcare.com</p>
          <p>+91 98765 43210</p>
          <p>Mangalore, India</p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/appointments" element={<MyAppointments />} />
        <Route path="/book/:doctorId" element={<BookAppointment />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/doctor/login" element={<DoctorLogin />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor/appointments" element={<DoctorAppointments />} />
      </Routes>
      <Footer />
    </>
  );
}