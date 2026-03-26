import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { userApi } from '../services/api';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
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

    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      setLoading(true);
      await userApi.post('/users/register', formData);
      toast.success('Registration successful');

      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create Your Account</h2>
          <p>Join the platform and start managing appointments professionally.</p>
        </div>

        <form onSubmit={handleSubmit} className="custom-form">
          <label>Full Name</label>
          <input
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
          />

          <label>Email Address</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />

          <label>Phone Number</label>
          <input
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
          />

          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="Create your password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit" className="btn btn-primary full-btn" disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}