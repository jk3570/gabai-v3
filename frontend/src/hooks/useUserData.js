import { useState, useEffect } from 'react';
import { BaseURL } from '../BaseURL'

const useUserData = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${BaseURL}/user/users`); 
        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();

  }, []);

  return { userData, loading };
};

export default useUserData;
