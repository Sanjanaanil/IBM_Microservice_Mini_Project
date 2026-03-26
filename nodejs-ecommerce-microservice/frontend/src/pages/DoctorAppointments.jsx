import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { appointmentApi } from '../services/api';

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const doctor = JSON.parse(localStorage.getItem('doctor') || '{}');

  useEffect(() => {
    fetchDoctorAppointments();
  }, []);

  const fetchDoctorAppointments = async () => {
    try {
      if (!doctor.id) {
        setLoading(false);
        return;
      }

      const response = await appointmentApi.get('/appointments/doctor-appointments', {
        params: { doctorId: doctor.id },
      });

      setAppointments(response.data || []);
    } catch (error) {
      console.error('Doctor appointments fetch error:', error);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (appointmentId, status) => {
    try {
      await appointmentApi.put(`/appointments/${appointmentId}/status`, { status });

      toast.success(`Appointment ${status.toLowerCase()} successfully`);

      setAppointments((prev) =>
        prev.map((item) =>
          item._id === appointmentId ? { ...item, status } : item
        )
      );
    } catch (error) {
      console.error('Status update error:', error);
      toast.error('Failed to update appointment status');
    }
  };

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
        <h2>Doctor Appointments</h2>
        <p>Manage appointments assigned to you.</p>
      </div>

      {loading ? (
        <div className="info-card">Loading appointments...</div>
      ) : appointments.length === 0 ? (
        <div className="info-card">No appointments found for this doctor.</div>
      ) : (
        <div className="grid-cards">
          {appointments.map((appointment) => (
            <div className="doctor-card" key={appointment._id}>
              <h3>{appointment.patientName || 'Patient Appointment'}</h3>
              <p><strong>Doctor:</strong> {appointment.doctorName}</p>
              <p><strong>Date:</strong> {appointment.date}</p>
              <p><strong>Time:</strong> {appointment.time}</p>
              <p>
                <strong>Status:</strong>{' '}
                <span className="status booked">{appointment.status}</span>
              </p>

              <div className="action-row">
                <button
                  className="btn btn-primary"
                  onClick={() => updateStatus(appointment._id, 'Accepted')}
                >
                  Accept
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => updateStatus(appointment._id, 'Rejected')}
                >
                  Reject
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={() => updateStatus(appointment._id, 'Completed')}
                >
                  Complete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}