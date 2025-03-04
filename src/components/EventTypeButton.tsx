import React, { ReactNode } from 'react';

interface EventTypeButtonProps {
  title: string;
  icon: ReactNode;
}

const EventTypeButton: React.FC<EventTypeButtonProps> = ({ title, icon }) => (
  <button className="border border-gray-200 rounded-lg p-3 flex flex-col items-center hover:bg-gray-50 transition-colors">
    <div className="bg-blue-100 text-blue-600 rounded-full p-2 mb-2">
      {icon}
    </div>
    <span className="text-sm font-medium text-gray-800">{title}</span>
  </button>
);

export default EventTypeButton;
