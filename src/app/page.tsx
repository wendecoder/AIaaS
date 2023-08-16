'use client'
import { useEffect, useState} from 'react';
import useRouter from 'next/router';
import Image from 'next/image';
import Spinner from './components/Spinner';
import LandingPage from './landingPage/page';
import UserPage from './UserPage/page';
import RootLayout from './layout';
import HomeFortunePredictor from './ServiceModeal/HomeFortune';

export default function Home() {


  return (
    
    <LandingPage/>
 
  
  )
}
