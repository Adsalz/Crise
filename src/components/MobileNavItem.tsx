import React from 'react';

interface MobileNavItemProps {
  title: string;
  isActive: boolean;
  onClick: () => void;
}

const MobileNavItem: React.FC<MobileNavItemProps> = ({ title, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`block px-3 py-2 text-base font-medium rounded-md w-full ${
      isActive 
        ? 'bg-blue-50 text-blue-600' 
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    }`}
  >
    {title}
  </button>
);

export default MobileNavItem;
