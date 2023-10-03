// apiClient.ts
export const registerUser = async (registrationData: any) => {
    try {
      const response = await fetch('http://localhost:3000/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });
  
      const registrationResponse = await response.json();
      return registrationResponse;
    } catch (error) {
      throw error;
    }
  };
  