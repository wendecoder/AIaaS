'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import IceWidget from "../IceWidget";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import axios from "axios";
import { useBalance } from "../../context/BalanceContext"; // Import the useBalance hook
import PopupModal from "../RollTheSpin";
import { useRouter } from "next/navigation";

// import { MenuIcon } from '@heroicons/react/outline';
interface UserData {
  id: number | null | undefined;
  username: string | null | undefined;
  email: string | null | undefined;
  balance: number | null | undefined;
  avatar: string | null | undefined;
  status: string | null | undefined;
}



const Header = () => {

  const { userBalance } = useBalance();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated()
{
  redirect('/api/auth/signin?callbackUrl=/UserPage')
}  })
const user = session?.user;
  const isCredentialsLogin = user !== undefined && Object.keys(user).length === 1;
  const isGoogleLogin = user?.image?.includes("googleusercontent");
  const isGithubLogin = user?.image?.includes("githubusercontent");
  const [userData, setUserData] = useState<UserData | null>(null); // Initialize userData as null
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const UserInfo = { email: user?.email };
      try {
        const response = await axios.post('/api/user/fetchUser', UserInfo, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
          }
        });

        const apiResponse = response.data;
        // console.log(apiResponse);
        if (apiResponse !== null) {
          setUserData(apiResponse);
          console.log(userData);
        } else if (isGoogleLogin || isGithubLogin) {
          const userInfo = {
            name: user?.name,
            email: user?.email,
            password: "", // Empty password for external logins
            avatar: user?.image // Corrected 'avator' to 'avatar'
          };
          console.log(userInfo);
          try {
            const createUserResponse = await axios.post('/api/user', userInfo, {
              headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
              }
            });
            const createdUser = createUserResponse.data;
            if (createdUser && createdUser.status === 'success') {
              setUserData(createdUser);
            } else {
              alert("Failed to create user");
            }
          } catch (error: any) {
            alert(`An error occurred during user creation: ${error.message}`);
          }
        } else {
          alert('No user data found');
        }
      } catch (error: any) {
        alert(`An error occurred during fetching user data: ${error.message}`);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [isGoogleLogin, isGithubLogin, user]);

    const [headerBackground, setHeaderBackground] = useState('header-initial');
  const [childrenPadding, setChildrenPadding] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleIconClick = () => {
    // Redirect to the HTML file
    window.location.href = "/index.html";
  };
  const handleScroll = () => {
    const headerHeight = 0; // Replace with the actual height of your header
    if (window.scrollY > headerHeight) {
      setHeaderBackground('fixed-header');
      setChildrenPadding('pt-20');
    } else {
      setHeaderBackground('header-initial');
      setChildrenPadding('');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  },[]);


    return (
  <div className={headerBackground}>
    <header>
      <div className='flex flex-wrap items-center justify-between'>
        <div className='mt-5 mb-10 ml-5 rounded-medium'>
          <Image
            src='/predictoLogo.png'
            alt='ice-logo'
            width={200}
            height={50}
          />
        </div>

        <div
          className="bg-custom-blue mt-5 mb-10 rounded-full inline-block shadow-lg ring-4 ring-opacity-50 ring-custom-blue-white"
          onClick={() => handleIconClick()} // Toggle the widget open state
          style={{ cursor: "pointer" }}
        >
          <Image
            src='/ice-logo.png'
            alt='ice-logo'
            width={50}
            height={50}
          />
        </div>
        <PopupModal />
        <div className='flex items-center justify-between mt-5 mb-10'>
          {/* Account Balance */}
          <div className="flex items-center rounded-lg mr-3 bg-black">
            {/* Cryptocurrency Image */}
            <img
              src="/predictoIcon.png"
              alt="ADA Token"
              className="w-12 h-18 rounded-full p-2"
            />

            {/* Amount */}
            <span className="text-white font-semibold">
            {userBalance ?? userData?.balance ?? "0"}
            </span>

            {/* Currency */}
            <span className="ml-1 text-gray-500 mr-5">PCT</span>
          </div>

          {/* User Profile Image with Dropdown */}
          <div className="relative inline-block">
            <div
              className="w-10 h-10 bg-gray-300 rounded-full mr-10 overflow-hidden cursor-pointer"
              onClick={toggleDropdown}
            >
              {/* Add your user profile image here */}
              <img
                src={userData?.avatar ?? "/predictoprof.jpeg"}
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className={`absolute right-0 mt-2 bg-white mr-4 shadow-md rounded-md ${
                isDropdownOpen ? "" : "hidden"
              }`}
            >
              <ul className="py-2">
                <li className="px-4 py-2 bg-black rounded-md text-white hover:bg-gray-100 cursor-pointer">
                  {userData?.username ?? "Profile"}
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick = {() => router.push('/History')}>
                  History
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Settings
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => signOut()}
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
)

};

export default Header;
