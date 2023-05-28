import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import SidebarProvider from '../../../contexts/SidebarProvider';
const index = () => {
  return (
    <>
      <SidebarProvider>
        <Sidebar />
      </SidebarProvider>
      <Outlet />
    </>
  );
};

export default index;
