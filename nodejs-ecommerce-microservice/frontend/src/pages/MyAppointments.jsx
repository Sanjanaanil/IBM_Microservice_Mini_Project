import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { appointmentApi } from '../services/api';

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      if (!user.id) {
        setLoading(false);
        return;
      }

      const response = await appointmentApi.get('/appointments/my-appointments', {
        params: { userId: user.id },
      });

      setAppointments(response.data || []);
    } catch (error) {
      console.error('Appointments fetch error:', error);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      await appointmentApi.delete(`/appointments/${appointmentId}`);
      toast.success('Appointment cancelled successfully');
      setAppointments((prev) => prev.filter((item) => item._id !== appointmentId));
    } catch (error) {
      console.error('Cancel appointment error:', error);
      toast.error('Failed to cancel appointment');
    }
  };

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (!user.id) {
    return (
      <div className="page-wrap">
        <div className="info-card">Please login first to view your appointments.</div>
      </div>
    );
  }

  return (
    <div className="page-wrap">
      <div className="section-header">
        <h2>My Appointments</h2>
        <p>Track all your scheduled consultations in one place.</p>
      </div>

      {loading ? (
        <div className="info-card">Loading appointments...</div>
      ) : appointments.length === 0 ? (
        <div className="info-card">No appointments found.</div>
      ) : (
        <div className="grid-cards">
          {appointments.map((appointment) => (
            <div className="doctor-card" key={appointment._id}>
              <h3>{appointment.doctorName}</h3>
              <p><strong>Date:</strong> {appointment.date}</p>
              <p><strong>Time:</strong> {appointment.time}</p>
              <p>
                <strong>Status:</strong>{' '}
                <span className="status booked">{appointment.status}</span>
              </p>

              <button
                className="btn btn-danger full-btn doctor-btn"
                onClick={() => handleCancelAppointment(appointment._id)}
              >
                Cancel Appointment
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}