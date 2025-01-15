import React, { useEffect, useState } from 'react'
import useCreateAppointment from './hooks/useCreateAppointment';
import useGetPatients from '../Dashboard/hooks/useGetPatients';
import { useNavigate } from 'react-router-dom';

const CreateAppointment = () => {
    const [formData, setFormData] = useState({
        patientId: "",
        doctorId: localStorage.getItem("id"),
        appointmentDate: "",
        appointmentTime:"",
        status:"Created"

      });
      const navigate=useNavigate()
      const {generateAppointment}=useCreateAppointment()
      const {data:patients}=useGetPatients()
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
      const handleChangeSelect=(e)=>{
        setFormData({...formData,patientId:e.target.value})
      }


      const handleSubmit=(e)=>{
        e.preventDefault()
        generateAppointment(formData)
      }

      useEffect(() => {
          if(!localStorage.getItem("id")){
            navigate("/")
          }
        }, [])
  return (
    <div className="registration-page">
      <div className="registration-container">
        <form className="registration-form" onSubmit={handleSubmit}>
          <h2> New Appointment</h2>
          
          <div className="form-group">
            <label>Patient Name</label>
            <select
              name="fullName"
              placeholder="Select Patient"
              value={formData.patientId}
              onChange={handleChangeSelect}
            >
                <option value={""}>Select Patient</option>
                {patients.map(patient=>(<option value={patient.id}>{patient.fullName}</option>))}
            </select>
          </div>
          <div className="form-group">
            <label>Appointment Date</label>
            <input
              type="text"
              name="appointmentDate"
              placeholder="Enter Date (DD/MM/YYYY)"
              value={formData.appointmentDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Appointment Time</label>
            <input
              type="text"
              name="appointmentTime"
              placeholder="Enter Time"
              value={formData.appointmentTime}
              onChange={handleChange}
            />
          </div>
          
          <button type="submit">Submit Appointment</button>
        </form>
      </div>
    </div>
  )
}

export default CreateAppointment