'use client'


import React, { useState } from 'react';
import Image from "next/image";
import axios from 'axios'; // Import Axios
import { useRouter } from 'next/navigation';

import { signIn } from 'next-auth/react';

interface SignupProps {
  onSwap: () => void;
}

const Signup: React.FC<SignupProps> = ({ onSwap }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const router = useRouter();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const registrationData = {
      name,
      email,
      password,
    };

    try {
      const response = await axios.post('/api/user', registrationData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        },
      });

      const registrationResponse = response.data;
      console.log(registrationResponse);

      if (registrationResponse.status === 'success') {
        alert('Registration successful! Please log in.');
        router.push('/UserPage')
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error: any) {
      console.error('Error during registration:', error);
      alert(
        `An error occurred during registration: ${error.message}. Please try again later.`
      );
    }
  };
  return (
    <div className="flex h-screen bg-gray-100">

      {/* White Region */}
      <div className="w-1/2 bg-white p-8 flex flex-col justify-center items-center">
      <h2 className="text-2xl mb-4 font-semibold">Signup</h2>
        {/* Signup Form */}
        <form onSubmit={handleSignup} className="flex flex-col space-y-4 w-full max-w-md">
        <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border rounded-md"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded-md"
          />
          <button type="submit" className="bg-green-500 text-white p-2 rounded-md">
            Sign Up
          </button>
          <div className="mt-4 text-center">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onSwap}
              className="text-blue-500 underline"
            >
              Log in here
            </button>
          </div>
        </form>
      </div>
            {/* Red Region */}
            <div className="w-1/2 bg-red-500 p-8 flex flex-col justify-center items-center text-white">
        {/* Welcome to Signup Page */}
        <div className='mt-5 mb-10 ml-5 rounded-medium'>  <Image
    src='/predictoLogo.png'
    alt='ice-logo'
    width={200}
    height={50}
  /></div>
<h2 className="text-3xl mb-4 font-semibold">
  Welcome to PredictoChain{' '}
  <span className="block text-center text-black text-lg">Signup Page</span>
</h2>

        <hr className="border-t-4 rounded-full border-white w-64 my-2" />
        {/* Signup Options */}
        <div className="flex flex-col space-y-4">
          {/* Replace with actual third-party signup options */}
          <p className="text-gray-200 font-semibold mt-4">Sign up using</p>
          <button className="bg-white text-gray-800 p-2 rounded-full w-full text-center flex items-centerr"
          onClick={() => signIn("google", {
            callbackUrl: '/api/auth/signin?callbackUrl=/UserPage',
          })}>
          <img src="/googleicon.png" alt="Google" className="w-6 h-6 mr-2" />
            Sign up with Google
          </button>
          <button className="bg-white text-gray-800 p-2 rounded-full w-full text-center flex items-center"
          onClick={() => signIn("github", {
            callbackUrl: '/api/auth/signin?callbackUrl=/UserPage',
          })}>
          <img src="/githubIcon.png" alt="Facebook" className="w-6 h-6 mr-2" />
            Sign up with Github
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
