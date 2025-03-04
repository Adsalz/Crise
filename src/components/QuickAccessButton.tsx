import React, { ReactNode } from 'react';

interface QuickAccessButtonProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
}

const QuickAccessButton: React.FC<QuickAccessButtonProps> = ({ icon, title, subtitle }) => (
  <button className="flex flex-col items-center p-3 bg-gray-50 rounded-md hover:bg-blue-50 transition-colors">
    <div className="text-blue-600 mb-2">{icon}</div>
    <p className="font-medium text-sm text-gray-800">{title}</p>
    <p className="text-xs text-gray-500">{subtitle}</p>
  </button>
);

export default QuickAccessButton;
