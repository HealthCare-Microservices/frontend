import React, { useEffect, useState } from 'react'
import { apiClientPatient } from '../../../api/axios';

function useGetPatients() {
    const [data, setData] = useState([])
  const getpatients=async()=>{
    try {
        const response = await apiClientPatient.get("/api/v1/patients/all");
        console.log("API Response:", response);
        setData(response.data?response.data:[])
      } catch (error) {
        console.log(error.response)
      }
  }

  useEffect(() => {
    getpatients()
  }, [])
  

  return {data}
}

export default useGetPatients