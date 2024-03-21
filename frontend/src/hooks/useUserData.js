import { useState, useEffect } from 'react';

const useUserData = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/user/users'); // Assuming your backend serves user data at '/api/users' endpoint
        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();

    // No cleanup needed for fetch requests
    // If you have any cleanup code, you can add it here

  }, []);

  return { userData, loading };
};

export default useUserData;
