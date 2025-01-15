import React, { useEffect, useState } from 'react'
import  { apiClientAppointment } from '../../../api/axios';

function useGetAppointments() {
    const [data, setData] = useState([])
  const getAppointments=async()=>{
    try {
        const response = await apiClientAppointment.get("/api/v1/appointments",{params:{id:localStorage.getItem("id")}});
        console.log("API Response:", response);
        setData(response.data?response.data:[])
      } catch (error) {
        console.log(error.response)
      }
  }

  useEffect(() => {
    getAppointments()
  }, [])
  

  return {data}
}

export default useGetAppointments