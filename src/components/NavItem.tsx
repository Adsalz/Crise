import React, { ReactNode } from 'react';

interface NavItemProps {
  icon: ReactNode;
  title: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, title, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center px-4 py-3 text-sm font-medium rounded-md w-full ${
      isActive 
        ? 'bg-blue-50 text-blue-600' 
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    }`}
  >
    <span className="mr-3">{icon}</span>
    {title}
  </button>
);

export default NavItem;
