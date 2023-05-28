import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineTravelExplore } from 'react-icons/md';
import { FiMessageCircle } from 'react-icons/fi';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdOutlineAddBox } from 'react-icons/md';
import { CiLogout } from 'react-icons/ci';
import Cookies from 'js-cookie';
//Internal Imports
import logo from '../../../assets/logo.png';
import Button from '../../UI/Button';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { SidebarContext } from '../../../contexts/SidebarProvider';
const SideDrawer = () => {
  const { isOpen, toggleDrawer, fName, sName, email } =
    useContext(SidebarContext);
  return (
    <Drawer
      open={isOpen}
      onClose={toggleDrawer}
      direction="left"
      style={{
        width: '290px',
        padding: '0px',
        margin: '0px',
        height: '100vh',
        position: 'fixed',
        zIndex: '9999',
      }}
    >
      <div className="flex flex-col pt-6 p-10 gap-5">
        <img src={logo} alt="" className="w-[90%] h-[90%] object-contain" />
        <div className="flex flex-col items-center gap-1">
          <div className="w-[4.5rem] h-[4.5rem] relative object-contain gap-1">
            <img
              src="/sidebar/dummyprofile.png"
              alt=""
              className="w-full h-full rounded-full"
            />
            <div className="absolute bg-[#36BF06] bottom-1 right-0 rounded-full w-4 h-4 border-[#fff] border-2"></div>
          </div>
          <div className="flex gap-2">
            <h1 className="font-bold text-black text-xl inline">
              {fName ? fName : 'unknown'}
            </h1>
            <h1 className="font-bold text-black text-xl">
              {sName ? sName : ''}
            </h1>
          </div>

          <h5 className="font-thin text-[18px] text-grey">
            {email ? email : 'unknown@gmail.com'}
          </h5>
        </div>
        <Button className="mx-4">Connect Wallet</Button>
        <div className="flex flex-col gap-7 text-3xl text-grey mt-2 ">
          <Link to="/explore">
            <div className="flex gap-2 items-center">
              <MdOutlineTravelExplore />
              <p className="text-xl font-semibold">Explore</p>
            </div>
          </Link>
          <Link to="/contentmanager">
            <div className="flex gap-2 items-center justify-start">
              <MdOutlineTravelExplore />
              <p className="text-xl font-semibold">Content Manager</p>
            </div>
          </Link>
          <Link to="/messages">
            <div className="flex gap-2 items-center">
              <FiMessageCircle />
              <p className="text-xl font-semibold">Messages</p>
            </div>
          </Link>
          <Link to="/settings">
            <div className="flex gap-2 items-center">
              <IoSettingsOutline />
              <p className="text-xl font-semibold">Settings</p>
            </div>
          </Link>
        </div>
        <div className="mt-[67px] text-[2rem] text-[#ababab]">
          <Link to="/login" onClick={() => Cookies.remove('token')}>
            <div className="flex gap-2 items-center">
              <CiLogout />
              <p className="text-xl font-semibold">Logout</p>
            </div>
          </Link>
        </div>
      </div>
    </Drawer>
  );
};

export default SideDrawer;
