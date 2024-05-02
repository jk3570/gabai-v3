import { useState, useEffect } from 'react';
import { BaseURL } from '../BaseURL'

const useUserRequestDataLawyer = () => {
  const [userRequestDataLawyer, setUserRequestDataLawyer] = useState([]);
  const [loadingPendingLawyer, setLoadingPendingLawyer] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:4000/form/all-requests`); 
        const data = await response.json();
        setUserRequestDataLawyer(data);
        setLoadingPendingLawyer(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();

  }, []);

  return { userRequestDataLawyer, loadingPendingLawyer };
};

export default useUserRequestDataLawyer;