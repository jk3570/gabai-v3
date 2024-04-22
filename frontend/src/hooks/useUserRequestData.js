import { useState, useEffect } from 'react';
import { BaseURL } from '../BaseURL'

const useUserRequestData = () => {
  const [userRequestData, setUserRequestData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:4000/form/all-requests`); 
        const data = await response.json();
        setUserRequestData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();

  }, []);

  return { userRequestData, loading };
};

export default useUserRequestData;
