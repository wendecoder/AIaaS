'use client'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import { BalanceProvider } from './context/BalanceContext';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from './components/Spinner';
import AuthProvider from './context/AuthProvider'
import { metadata } from './metadata';

const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {/* Add ToastContainer here */}
          <BalanceProvider>
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
          <motion.div
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
          </BalanceProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
