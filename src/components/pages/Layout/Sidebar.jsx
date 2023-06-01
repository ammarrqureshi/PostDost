import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineTravelExplore } from 'react-icons/md';
import { FiMessageCircle } from 'react-icons/fi';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdOutlineAddBox } from 'react-icons/md';
import { CiLogout } from 'react-icons/ci';
import { SidebarContext } from '../../../contexts/SidebarProvider';
import SideDrawer from './Drawer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Sidebar = () => {
  const navigate = useNavigate();
  const { isOpen, toggleDrawer, setFName, setSName, setEmail } =
    useContext(SidebarContext);
  useEffect(() => {
    const user = async () => {
      try {
        await axios
          .get('http://localhost:8000/api/users', { withCredentials: true })
          .then((response) => {
            // response.status === 200 && console.log(response);
            if (response) {
              setFName(response.data.firstName);
              setSName(response.data.secondName);
              setEmail(response.data.email);
            }
          });
      } catch (error) {
        error.response.status === 401 && navigate('/');
        console.log(error);
        console.log(error.response.status);
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
