import React from 'react';

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (!user?.id) {
    return (
      <div className="page-wrap">
        <div className="info-card">Please login first to view your profile.</div>
      </div>
    );
  }

  return (
    <div className="page-wrap">
      <div className="section-header">
        <h2>My Profile</h2>
        <p>View your account information and patient details.</p>
      </div>

      <div className="profile-card">
        <div className="profile-row">
          <span className="profile-label">Full Name</span>
          <span className="profile-value">{user.name}</span>
        </div>

        <div className="profile-row">
          <span className="profile-label">Email</span>
          <span className="profile-value">{user.email}</span>
        </div>

        <div className="profile-row">
          <span className="profile-label">Phone</span>
          <span className="profile-value">{user.phone}</span>
        </div>

        <div className="profile-row">
          <span className="profile-label">Role</span>
          <span className="profile-value">{user.role}</span>
        </div>

        <div className="profile-row">
          <span className="profile-label">User ID</span>
          <span className="profile-value">{user.id}</span>
        </div>
      </div>
    </div>
  );
}