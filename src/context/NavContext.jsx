import React, { createContext, useState, useContext,useEffect } from 'react'

export const NavbarContext = createContext();

export const useNavbar = () => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error('useNavbar must be used within a NavbarProvider');
  }
  return context;
};

const NavbarProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  
  const value = {
    isSidebarOpen,
    toggleSidebar,
    closeSidebar
  };

  return (
    <NavbarContext.Provider value={value}>
      {children}
    </NavbarContext.Provider>
  );
};

export default NavbarProvider;