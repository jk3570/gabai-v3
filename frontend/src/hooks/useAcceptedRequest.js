import { useState, useEffect } from 'react';
import { BaseURL } from '../BaseURL'

const useAcceptedRequest = () => {
  const [requestData, setRequestData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${BaseURL}/accept/get-all-requests`); 
        const data = await response.json();
        setRequestData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();

  }, []);

  return { requestData, loading };
};

export default useAcceptedRequest;
