import { useState, useEffect } from 'react';
import { BaseURL } from '../BaseURL'

const useUserRequestData = (userid) => {
  const [userRequestData, setUserRequestData] = useState([]);
  const [loadingPending, setLoadingPending] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:4000/form/all-requests/${userid}`); 
        const data = await response.json();
        setUserRequestData(data);
        setLoadingPending(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();

  }, []);

  return { userRequestData, loadingPending };
};

export default useUserRequestData;