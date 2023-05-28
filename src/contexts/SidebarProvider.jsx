import React, { useState, createContext } from 'react';
export const SidebarContext = createContext();
const SidebarProvider = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [fName, setFName] = useState('');
  const [sName, setSName] = useState('');
  const [email, setEmail] = useState('');
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        toggleDrawer,
        fName,
        sName,
        email,
        setFName,
        setSName,
        setEmail,
      }}
    >
      {props.children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
