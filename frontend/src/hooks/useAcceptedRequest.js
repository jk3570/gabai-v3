import { useState, useEffect } from 'react';
import { BaseURL } from '../BaseURL';

const useAcceptedRequest = (userid) => { // Accept userid as a parameter
  const [requestData, setRequestData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${BaseURL}/accept/get-all-requests/${userid}`); // Include userid in the URL
        const data = await response.json();
        setRequestData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();

  }, [userid]); // Add userid to the dependency array to re-fetch data when it changes

  return { requestData, loading };
};

export default useAcceptedRequest;
