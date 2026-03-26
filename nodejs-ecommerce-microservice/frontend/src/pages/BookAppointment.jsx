import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { doctorApi, appointmentApi } from '../services/api';

export default function BookAppointment() {
  const { doctorId } = useParams();

  const [doctor, setDoctor] = useState(null);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDoctor();
  }, []);

  const fetchDoctor = async () => {
    try {
      const response = await doctorApi.get('/doctors');
      const selectedDoctor = response.data.find((doc) => doc._id === doctorId);
      setDoctor(selectedDoctor || null);
    } catch (error) {
      console.error('Doctor fetch error:', error);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleBookAppointment = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user.id) {
      toast.error('Please login first');
      return;
    }

    if (!doctor) {
      toast.error('Doctor not found');
      return;
    }

    if (!formData.date || !formData.time) {
      toast.error('Please select date and time');
      return;
    }

    try {
      setLoading(true);

      await appointmentApi.post('/appointments', {
        userId: user.id,
        doctorId: doctor._id,
        doctorName: doctor.name,
        patientName: user.name,
        date: formData.date,
        time: formData.time,
      });

      toast.success('Appointment booked successfully');

      setFormData({
        date: '',
        time: '',
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  if (!doctor) {
    return (
      <div className="page-wrap">
        <div className="info-card">Loading doctor details...</div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-card large-card">
        <div className="auth-header">
          <h2>Book Appointment</h2>
          <p>Select date and time for your consultation.</p>
        </div>

        <div className="doctor-card mini-doctor-card">
          <h3>{doctor.name}</h3>
          <p><strong>Specialization:</strong> {doctor.specialization}</p>
          <p><strong>Experience:</strong> {doctor.experience} years</p>
          <p><strong>Consultation Fee:</strong> ₹{doctor.fees}</p>
        </div>

        <form onSubmit={handleBookAppointment} className="custom-form">
          <label>Select Date</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} />

          <label>Select Time</label>
          <input type="time" name="time" value={formData.time} onChange={handleChange} />

          <button type="submit" className="btn btn-primary full-btn" disabled={loading}>
            {loading ? 'Booking...' : 'Confirm Appointment'}
          </button>
        </form>
      </div>
    </div>
  );
}