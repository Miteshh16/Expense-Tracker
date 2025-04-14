import React, { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { SIDE_MENU_DATA } from '../../utils/data';
import CharAvatar from '../Cards.jsx/CharAvatar';

const SideMenu = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (route) => {
    if (route === "/logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate('/login');
  };

  return (
    <div className='w-64 h-[calc(100vh-64px)] bg-white border-r border-gray-200/50 p-5 sticky top-16 z-10 hidden lg:block'>
      {/* User Info */}
      <div className='flex flex-col items-center justify-center gap-3 mt-3 mb-6'>
        {user?.profileImageUrl ? (
          <img
            src={user?.profileImageUrl || ""}
            alt='Profile'
            className='w-20 h-20 bg-slate-400 rounded-full object-cover'
          />
        ) : (
          <CharAvatar
            fullName={user?.fullname}
            width="w-20"
            height="h-20"
            style="text-xl"
          />
        )}
        <h5 className='text-gray-950 font-medium leading-6'>
          {user?.fullname || "User"}
        </h5>
      </div>

      {/* Menu Buttons */}
      {SIDE_MENU_DATA.map((item, index) => {
        const isActive = location.pathname === item.path;
        const buttonClass = `w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 
          ${isActive ? "text-white bg-blue-500" : "text-gray-800 hover:bg-gray-100"}`;

        return (
          <button
            key={`menu_${index}`}
            className={buttonClass}
            onClick={() => handleClick(item.path)}
          >
            <item.icon className='text-xl' />
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

export default SideMenu;
