'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import { toast } from 'react-toastify';
import { useBalance } from '../context/BalanceContext';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const PopupModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { userBalance, updateUserBalance } = useBalance(); // Import the useBalance hook
    const [remainingTime, setRemainingTime] = useState<number | null>(null);
    const [lastSpinTime, setLastSpinTime] = useState<number | null>(null); // New state variable
    const { data: session } = useSession();
    const userEmail = session?.user?.email ?? '';

    // Calculate the time since the last spin and check if 24 hours have passed


    console.log(userEmail);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
 
//   const iframeRef = useRef<HTMLIFrameElement | null>(null);  
  useEffect(() => {
    const handleMessage = (event: { data: { type: string; amount: any; }; }) => {
      if (event.data.type === 'winningAmount') {
        const winningAmount = event.data.amount;
        console.log(winningAmount);
        // Notify the user with a toast
        toast.success(`Congratulations! You won ${winningAmount} PCT`, {
          position: 'top-center',
          autoClose: 3000,
        });

        // Update the user's balance using the context
        updateUserBalance(userEmail, -winningAmount);
      }
    };


    // Add the "message" event listener.
    window.addEventListener('message', handleMessage);

    // Clean up the event listener when the component unmounts.
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  useEffect(() => {
    if (userEmail !== null){
    const fetchRemainingTime = async () => {
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Accept': '*/*',
        };
        const response = await axios.post('/api/user/setLastSpinDate', {
          email: userEmail,
          // lastSpinTime: lastSpinTime,
        }, { headers });

        if (response.data.remainingTime) {
          const data = await response.data.remainingTime;
          if (data !== undefined) {
            setRemainingTime(data);
          }
        } else if(response.data.lastSpinnedTime) {
          // Handle errors if needed
          console.error('Failed to fetch remaining time:', response.statusText);
        }
      } catch (error) {
        console.error('An error occurred while fetching remaining time:', error);
      }
    };
  

    fetchRemainingTime();
  }
  }, [userEmail]);
  
  const handleSpin = () => {
    // Check if the user can spin based on remainingTime
    if (remainingTime !== null && remainingTime > 0) {
      const remainingHours = Math.floor(remainingTime / 3600);
      const remainingMinutes = Math.floor((remainingTime % 3600) / 60);

      toast.warning(`You can spin again in ${remainingHours} hours and ${remainingMinutes} minutes.`, {
        position: 'top-center',
        autoClose: 5000,
      });
      return;
    }

    // Update lastSpinTime with the current time
    setLastSpinTime(new Date().getTime());
    openModal();
}



  return (
    <div className='flex justify-center align-middle'>
         <Image
            src='/spinningWheel.png'
            alt='spinningWheel'
            width={70}
            height={70}
            className='fixed rounded-lg'
          />
      {remainingTime !== null && remainingTime > 0 ? (
        <div className="remaining-time mr-32 flex justify-center items-center">
          <span className="remaining-time-text block">Next Spin in:</span>
          <CountdownCircleTimer
            isPlaying
            duration={remainingTime / 1000} // Use remainingTime as the countdown duration
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[86400, 50000, 25000, 0]}
            size={80}
            strokeWidth={6}
          >
            {({ remainingTime }) => (
              <div>
                <div className="value">{Math.floor(remainingTime / 3600)} : {Math.floor((remainingTime % 3600) / 60)}</div>
                <div className="value">{remainingTime % 60}</div>
              </div>
            )}
          </CountdownCircleTimer>
        </div>
      ) : (
        <button
          className='rounded-md text-white font-semibold p-4 mb-5 mt-2 ml-52 bg-sky-950'
          onClick={handleSpin}
        >
          Roll The Wheel
        </button>
      )}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <button onClick={closeModal} className="close-button">
              <span className="close-button-text">X</span> Close
              </button>
              <iframe
            src="/index2.html" // Replace with the correct path to your HTML file
            title="HTML Content"
            className="full-screen-iframe"
            // ref={iframeRef}
          />


            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        /* Modal overlay styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5); /* Darkened background */
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000; /* Adjust the z-index as needed */
        }

        /* Modal styles */
        .modal {
          background: #fff;
          border-radius: 8px;
          box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.2);
          max-width: 80%; /* Adjust the maximum width as needed */
          max-height: 80%; /* Adjust the maximum height as needed */
          overflow: auto;
        }

        /* Modal content styles */
        .modal-content {
          padding: 16px;
        }

        /* Close button styles */
        .close-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background: red;
          border: none;
          padding: 5px;
          font-weight: 500;
          border-radius: 10px;
          font-size: 25px;
          cursor: pointer;
        }

        .close-button-text {
            color: white; /* Set the color of only the "X" to white */
          }

        /* Iframe styles */
        .iframe {
          width: 100%;
          height: 100%;
          border: none;
        }

        .full-screen-iframe {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80%;
            height: 80%;
            border: none; /* Removes iframe border */
            border-radius: 30px;
            background-color: transparent; /* Sets the background to transparent */
          }
          
          .remaining-time-text {
            color: red; /* Customize the text color */
            /* Add other styles as needed */
          }
          
          .remaining-time {
            font-weight: bold; /* Customize the font weight */
            /* Add other styles as needed */
          }
          
          .remaining-time-value {
            color: green; /* Customize the text color */
            /* Add other styles as needed */
          }
          
      `}</style>
    </div>
  );
};

export default PopupModal;
 