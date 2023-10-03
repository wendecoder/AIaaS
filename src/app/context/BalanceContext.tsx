// BalanceContext.tsx
import axios from 'axios';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BalanceContextValue {
  userBalance: number | null;
  setUserBalance: React.Dispatch<React.SetStateAction<number | null>>;
  updateUserBalance: (email: string, amount: number) => Promise<number | null>;
}

const BalanceContext = createContext<BalanceContextValue | undefined>(undefined);

export function useBalance(): BalanceContextValue {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error('useBalance must be used within a BalanceProvider');
  }
  return context;
}

interface BalanceProviderProps {
  children: ReactNode;
}

export function BalanceProvider({ children }: BalanceProviderProps): JSX.Element {
  const [userBalance, setUserBalance] = useState<number | null>(null);

  const updateUserBalance = async (email: string, amount: number): Promise<number | null> => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Accept': '*/*',
      };
      const balanceUpdateResponse = await axios.post(
        '/api/user/updateBalance',
        {
          email: email,
          balance: amount,
        },
        { headers }
      );
  
      if (balanceUpdateResponse.data && typeof balanceUpdateResponse.data.userBalance === 'number') {
        const updatedBalance = balanceUpdateResponse.data.userBalance;
        setUserBalance(updatedBalance); // Update the local state
        return updatedBalance; // Return the updated balance
      } else {
        console.error('Invalid response format:', balanceUpdateResponse.data);
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error updating balance:', error);
      throw error; // You can handle errors in the component using this hook
    }
  };
  

  const contextValue: BalanceContextValue = {
    userBalance,
    setUserBalance,
    updateUserBalance,
  };

  return (
    <BalanceContext.Provider value={contextValue}>
      {children}
    </BalanceContext.Provider>
  );
}
