import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { doctorApi } from '../services/api';

export default function DoctorLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      setLoading(true);

      const response = await doctorApi.post('/doctors/login', formData);

      localStorage.setItem('doctorToken', response.data.token);
      localStorage.setItem('doctor', JSON.stringify(response.data.doctor));

      toast.success('Doctor login successful');
    } catch (error) {
      console.error('Doctor login error:', error);
      toast.error(error?.response?.data?.message || 'Doctor login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Doctor Login</h2>
          <p>Login to access your doctor panel and manage appointments.</p>
        </div>

        <form onSubmit={handleSubmit} className="custom-form">
          <label>Email Address</label>
          <input
            name="email"
            type="email"
            placeholder="Enter doctor email"
            value={formData.email}
            onChange={handleChange}
          />

          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit" className="btn btn-primary full-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Doctor Login'}
          </button>
        </form>
      </div>
    </div>
  );
}