import React, { useState, useEffect, useRef } from 'react';
import Popup from '../utils/Calendar';

const Navbar = () => {
  const [isQuestionsDropdownOpen, setIsQuestionsDropdownOpen] = useState(false);
  const [isNotificationsDropdownOpen, setIsNotificationsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const questionsDropdownRef = useRef(null);
  const notificationsDropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);

  const closePopup = () => {
    setShowPopup(false);
  };

  const openPopup = () => {
    setShowPopup(true);
  };

  const handleCalendarClick = () => {
    openPopup();
  };

  const toggleQuestionsDropdown = () => {
    setIsQuestionsDropdownOpen((prevState) => !prevState);
  };

  const toggleNotificationsDropdown = () => {
    setIsNotificationsDropdownOpen((prevState) => !prevState);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen((prevState) => !prevState);
  };

  const handleOutsideClick = (event) => {
    if (
      questionsDropdownRef.current &&
      !questionsDropdownRef.current.contains(event.target)
    ) {
      setIsQuestionsDropdownOpen(false);
    }
    if (
      notificationsDropdownRef.current &&
      !notificationsDropdownRef.current.contains(event.target)
    ) {
      setIsNotificationsDropdownOpen(false);
    }
    if (
      profileDropdownRef.current &&
      !profileDropdownRef.current.contains(event.target)
    ) {
      setIsProfileDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className="flex flex-row items-center justify-between 2xl:px-[28px] xl:px-6 lg:px-4 px-4 py-[22px] border-b border-gray-300">
      <div className="flex flex-row space-x-2 sm:hidden">
        <div className="flex items-center gap-2">
          <img src="/icons/logo.png" alt="logo" className="w-6 h-6" />
          <h1 className="text-xl font-semibold text-[#0d062d] font-inter">Project M.</h1>
        </div>
      </div>
      <div className="flex flex-row gap-4 hidden sm:flex pl-[14.8px] xl:pr-[221.2px]  lg:pr-[150px]  md:pr-[70px]  pr-[10px] py-3 bg-neutral-100 border border-neutral-100 rounded-md ">
        <img
          src="icons/search-normal.png"
          alt="search"
          className="w-[22px] h-[22px]"
        />
        <input
          type="text"
          
          placeholder="Search for anything..."
          className="flex-1 font-inter hidden text-sm text-gray-600 bg-transparent outline-none lg:flex font-regular "
        />

        <input
          type="text"
          placeholder="Search"
          className="flex-1 text-sm text-gray-600 bg-transparent outline-none font-regular lg:hidden"
        />
      </div>

      <div className="flex flex-row items-center justify-center gap-[50px]">
        <div className="flex flex-row items-center justify-center hidden gap-6 md:flex">
          <img
            src="/icons/calendar-2.png"
            alt="calendar-icon"
            className="w-6 h-6 cursor-pointer"
            onClick={handleCalendarClick}
          />
          <Popup isOpen={showPopup} onClose={closePopup} />
          <div className="relative" ref={questionsDropdownRef}>
            <img
              src="/icons/query.png"
              alt=""
              className="w-6 h-6 cursor-pointer"
              onClick={toggleQuestionsDropdown}
            />
            
            {isQuestionsDropdownOpen && (
              <div className="absolute font-inter right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg">
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                    Questions 1
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                    Questions 2
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                    Questions 3
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="relative" ref={notificationsDropdownRef}>
            <img
              src="/icons/notification.png"
              alt=""
              className="w-6 h-6 cursor-pointer"
              onClick={toggleNotificationsDropdown}
            />
              <div className="absolute top-[2px] right-[3px] flex items-center justify-center w-[6px] h-[6px] rounded-full bg-[#D8727D]"></div>
            {isNotificationsDropdownOpen && (
              <div className="absolute font-inter right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg">
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                    Notification 1
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                    Notification 2
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                    Notification 3
                  </li>
                </ul>
              </div>
            )}
          </div>
         
        </div>
        <div className="flex flex-row gap-[22px]" ref={profileDropdownRef}>
          <div className="flex flex-col hidden lg:block">
            <div className="text-[16px] text-right font-inter font-[400] text-[#0d062d]">
              Shruti Sharma
            </div>
            <div className="text-sm text-right  font-inter text-[#787486] font-[400]">
              Bihar, India
            </div>
          </div>
          <div className="flex flex-row items-center justify-center gap-[10px] cursor-pointer">
            <img
              src="icons/shruti.jpg"
              alt="avatar"
              className="w-[38px] h-[38px] rounded-full"
              onClick={toggleProfileDropdown}
            />
            <img
              src="icons/arrow-down.png"
              alt="avatar"
              className="w-[18px] h-[18px]"
              onClick={toggleProfileDropdown}
            />
          </div>
          {isProfileDropdownOpen && (
              <div className="absolute font-inter right-4 mt-12 w-30 bg-white border border-gray-300 rounded-lg shadow-lg">
                <ul className="py-2">
                  <li
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    onClick={toggleProfileDropdown}
                  >
                    Profile
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    onClick={toggleProfileDropdown}
                  >
                    Settings
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    onClick={toggleProfileDropdown}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
