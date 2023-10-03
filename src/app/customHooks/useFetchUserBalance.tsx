// useFetchUserBalance.ts
import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchUserBalance = (userEmail: string | null | undefined) => {
  const [userBalance, setUserBalance] = useState<number | null>(null);

  useEffect(() => {
    const fetchUserBalance = async () => {
      if (userEmail) {
        try {
          const headers = {
            'Content-Type': 'application/json',
            'Accept': '*/*',
          };
          const data = {
            email: userEmail,
          };
          const response = await axios.post('/api/user/userBalance', data, { headers });

          setUserBalance(response.data);
        } catch (error) {
          console.error('Error fetching user balance:', error);
        }
      }
    };

    fetchUserBalance();
  }, [userEmail]);

  return userBalance;
};

export default useFetchUserBalance;
