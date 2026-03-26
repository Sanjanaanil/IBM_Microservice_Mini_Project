import React from 'react';
import { Link } from 'react-router-dom';

export default function DoctorDashboard() {
  const doctor = JSON.parse(localStorage.getItem('doctor') || '{}');

  if (!doctor?.id) {
    return (
      <div className="page-wrap">
        <div className="info-card">Please login as doctor first.</div>
      </div>
    );
  }

  return (
    <div className="page-wrap">
      <div className="section-header">
        <h2>Doctor Dashboard</h2>
        <p>Welcome back, Dr. {doctor.name}</p>
      </div>

      <div className="feature-grid">
        <div className="feature-card">
          <h3>Doctor Profile</h3>
          <p><strong>Name:</strong> {doctor.name}</p>
          <p><strong>Email:</strong> {doctor.email}</p>
          <p><strong>Specialization:</strong> {doctor.specialization}</p>
        </div>

        <div className="feature-card">
          <h3>Quick Action</h3>
          <p>View all appointments assigned to you.</p>
          <Link to="/doctor/appointments" className="btn btn-primary doctor-btn">
            View Appointments
          </Link>
        </div>
      </div>
    </div>
  );
}