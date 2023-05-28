import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineTravelExplore } from 'react-icons/md';
import { FiMessageCircle } from 'react-icons/fi';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdOutlineAddBox } from 'react-icons/md';
import { CiLogout } from 'react-icons/ci';
import { SidebarContext } from '../../../contexts/SidebarProvider';
import SideDrawer from './Drawer';
import { userDataLoader } from '../../../utils/UserData';
import Cookies from 'js-cookie';
const Sidebar = () => {
  const { isOpen, toggleDrawer, setFName, setSName, setEmail } =
    useContext(SidebarContext);
  useEffect(() => {
    const user = async () => {
      try {
        const res = await userDataLoader();
        console.log('ResUser', res);
        if (res) {
          setFName(res.firstName);
          if (res.secondName) {
            setSName(res.secondName);
          }
          setEmail(res.email);
        }
      } catch (error) {
        console.error('Error while fetching data:', error);
      }
    };

    user();
  }, []);
  return (
    <>
      <aside
        className={`${
          isOpen && 'hidden'
        }  z-[999] shadow-2xl max-w-[5rem] w-[5rem] flex flex-col items-center fixed h-screen gap-14`}
        onClick={toggleDrawer}
      >
        <div className="pt-7">
          <img src="/sidebar/logo.png" alt="Logo" />
        </div>
        <div className="w-14 h-14 relative">
          <img
            src="/sidebar/dummyprofile.png"
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
          <Link to="/login" onClick={() => Cookies.remove('token')}>
            <CiLogout />
          </Link>
        </div>
      </aside>
      <SideDrawer />
    </>
  );
};

export default Sidebar;
