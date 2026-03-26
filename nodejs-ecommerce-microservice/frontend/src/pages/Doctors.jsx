import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { doctorApi } from '../services/api';

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('All');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await doctorApi.get('/doctors');
        setDoctors(response.data || []);
      } catch (error) {
        console.error('Doctors fetch error:', error);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const specializations = useMemo(() => {
    const allSpecs = doctors.map((doctor) => doctor.specialization);
    return ['All', ...new Set(allSpecs)];
  }, [doctors]);

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesSearch =
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSpecialization =
        specializationFilter === 'All' || doctor.specialization === specializationFilter;

      return matchesSearch && matchesSpecialization;
    });
  }, [doctors, searchTerm, specializationFilter]);

  return (
    <div className="page-wrap">
      <div className="section-header">
        <h2>Available Doctors</h2>
        <p>Choose from experienced specialists and book your appointment.</p>
      </div>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by doctor name or specialization"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="filter-input"
        />

        <select
          value={specializationFilter}
          onChange={(e) => setSpecializationFilter(e.target.value)}
          className="filter-select"
        >
          {specializations.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="info-card">Loading doctors...</div>
      ) : filteredDoctors.length === 0 ? (
        <div className="info-card">No doctors found.</div>
      ) : (
        <div className="grid-cards">
          {filteredDoctors.map((doctor) => (
            <div className="doctor-card" key={doctor._id}>
              <div className="doctor-avatar">{doctor.name.charAt(0)}</div>
              <h3>{doctor.name}</h3>
              <p><strong>Specialization:</strong> {doctor.specialization}</p>
              <p><strong>Experience:</strong> {doctor.experience} years</p>
              <p><strong>Consultation Fee:</strong> ₹{doctor.fees}</p>
              <p>
                <strong>Status:</strong>{' '}
                <span className={doctor.available ? 'status available' : 'status unavailable'}>
                  {doctor.available ? 'Available' : 'Unavailable'}
                </span>
              </p>

              <Link to={`/book/${doctor._id}`} className="btn btn-primary full-btn doctor-btn">
                Book Appointment
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}