import { useNavigate } from 'react-router-dom';
import { apiClientAppointment } from '../../../api/axios';

const useCreateAppointment = () => {
    const navigate=useNavigate()
  const generateAppointment=async(formData)=>{
    try {
        const response = await apiClientAppointment.post("/api/v1/appointments", formData);
        console.log("API Response:", response);
        // setTimeout(() => {
          navigate("/dashboard"); // Redirect to doctor login
        // }, 2000);
      } catch (error) {
        console.log(error)
      }
  }
  return {generateAppointment}
}

export default useCreateAppointment