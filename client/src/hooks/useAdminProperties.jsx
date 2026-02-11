import React from 'react'
import { useQuery } from 'react-query'
import { getAllAdminProperties } from '../utils/api'

const useAdminProperties = () => {
  const { data, isError, isLoading, refetch } = useQuery(
    "allProperties", getAllAdminProperties, { refetchOnWindowFocus: false }
  );
  
  // Return an object with the values
  return {
    data,
    isError,
    isLoading,
    refetch
  };
}

export default useAdminProperties;
