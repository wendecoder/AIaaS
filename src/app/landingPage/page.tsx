'use client'
import React from "react";
import HeroSection from "../components/LandingPage/HeroSection";
import FeaturesCard from "../components/LandingPage/FeaturesCard";
import Header from "../components/LandingPage/Header";
import IceWidget from "../components/IceWidget";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
const LandingPage = () =>{
    
  
    return(
        <div>
        <><Header/><HeroSection /><FeaturesCard /></>
        </div>
    )
};
export default LandingPage;