import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { MdOutlineTravelExplore } from 'react-icons/md';
import { FiMessageCircle } from 'react-icons/fi';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdOutlineAddBox } from 'react-icons/md';
import { CiLogout } from 'react-icons/ci';

import { SidebarContext } from '../../../contexts/SidebarProvider';
import MainContext from '../../../contexts/MainContext';
import SideDrawer from './Drawer';

const Sidebar = () => {
  const navigate = useNavigate();
  const { isOpen, toggleDrawer, setFName, setSName, setEmail } =
    useContext(SidebarContext);
  const { userInformation, setUserInformation } = useContext(MainContext);
  const { email, firstName, secondName } = userInformation;
  if (userInformation) {
    setFName(firstName);
    setSName(secondName);
    setEmail(email);
  }

  const handleLogout = async () => {
    const res = await apiGetCall('/auth/logout');
    if (res.success) {
      ToastMessage({
        type: 'success',
        message: res.message,
      });
      setUserInformation({
        email: '',
        firstName: '',
        secondName: '',
        isVerified: '',
      });
      navigate('/');
    }
  };
  return (
    <>
      <aside
        className={`${
          isOpen && 'hidden'
        }  z-[999] shadow-2xl max-w-[5rem] w-[5rem] flex flex-col items-center fixed h-screen gap-14`}
        onClick={toggleDrawer}
      >
        <div className="pt-7">
          <img
            src="/sidebar/logo.png"
            alt="Logo"
          />
        </div>
        <div className="w-14 h-14 relative">
          <img
            src={'/noavatar.png'}
            alt=""
            className="w-full h-full rounded-full"
          />
          <div className="absolute bg-[#36BF06] bottom-1 right-0 rounded-full w-3 h-3 border-[#fff] border-2"></div>
        </div>
        <div className="flex flex-col gap-7 text-3xl text-grey ">
          <MdOutlineAddBox className="text-violet text-4xl" />
          <Link to="/explore">
            <MdOutlineTravelExplore />
          </Link>
          <Link to="/influencer">
            <MdOutlineTravelExplore />
          </Link>
          <FiMessageCircle />
          <IoSettingsOutline />
        </div>
        <div className="mt-8 text-[2rem] text-[#ababab]">
          <Link to="/login" onClick={handleLogout}>
            <CiLogout />
          </Link>
        </div>
      </aside>
      <SideDrawer />
    </>
  );
};

export default Sidebar;
