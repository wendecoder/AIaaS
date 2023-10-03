'use client'
import React, { useState } from 'react';
import Image from "next/image";
import { signIn } from 'next-auth/react';

interface LoginProps {
  onSwap: () => void;
}

const Login: React.FC<LoginProps> = ({ onSwap }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    signIn("Credentials", {
      email,
      password,
      callbackUrl: '/api/auth/signin?callbackUrl=/UserPage'
    })
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Red Region */}
      <div className="w-1/2 bg-red-500 p-8 flex flex-col justify-center items-center text-white">
        {/* Welcome to Login Page */}
        <div className='mt-5 mb-10 ml-5 rounded-medium'>  <Image
    src='/predictoLogo.png'
    alt='ice-logo'
    width={200}
    height={50}
  /></div>
<h2 className="text-3xl mb-4 font-semibold">
  Welcome to PredictoChain{' '}
  <span className="block text-center text-black text-lg">Login Page</span>
</h2>

        {/* Third Party Login Methods */}
        <hr className="border-t-4 rounded-full border-white w-64 my-2" />
        <div className="flex flex-col space-y-4">
          {/* Replace with actual third-party login buttons with icons */}
          <button className="bg-white text-gray-800 p-2 rounded-full w-full text-center mt-4 flex items-center"
          onClick={() => signIn("google", {
            callbackUrl: '/api/auth/signin?callbackUrl=/UserPage',
          })}>
          <img src="/googleicon.png" alt="Google" className="w-6 h-6 mr-2" />
            Login with Google
          </button>
          <button className="bg-white text-gray-800 p-2 rounded-full w-full text-center flex items-center"
          onClick={() => signIn("github", {
            callbackUrl: '/api/auth/signin?callbackUrl=/UserPage',
          })}>
          <img src="/githubIcon.png" alt="Facebook" className="w-6 h-6 mr-2" />
            Login with Github
          </button>
        </div>
      </div>
      {/* White Region */}
      <div className="w-1/2 bg-white p-8 flex flex-col justify-center items-center">
        {/* Login Text */}
        <h2 className="text-2xl mb-4 font-semibold">Login</h2>
        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col space-y-4 w-full max-w-md">
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
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
            Login
          </button>
          <div className="mt-2">
            <a href="#" className="text-blue-500">
              Forgot Password?
            </a>
          </div>
          <div className="mt-4 text-center">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onSwap}
              className="text-blue-500 underline"
            >
              Register here
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
