// useUpdateUserBalance.ts
import axios from 'axios';

const useUpdateUserBalance = () => {
  const updateBalance = async (userEmail: string | undefined | null, amount: number) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Accept': '*/*',
      };
      const balanceUpdateResponse = await axios.post(
        '/api/user/updateBalance',
        {
          email: userEmail,
          balance: amount,
        },
        { headers }
      );

      return balanceUpdateResponse.data.userBalance;
    } catch (error) {
      console.error('Error updating balance:', error);
      throw error; // You can handle errors in the component using this hook
    }
  };

  return updateBalance;
};

export default useUpdateUserBalance;
