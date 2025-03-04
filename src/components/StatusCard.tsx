import React, { ReactNode } from 'react';

interface StatusCardProps {
  title: string;
  status: 'active' | 'critical' | 'warning' | 'standby' | 'normal';
  icon: ReactNode;
  details: string;
}

const StatusCard: React.FC<StatusCardProps> = ({ title, status, icon, details }) => {
  const getStatusColor = () => {
    switch(status) {
      case 'active':
      case 'critical':
        return 'text-red-600 bg-red-50';
      case 'warning':
        return 'text-amber-600 bg-amber-50';
      case 'standby':
      case 'normal':
      default:
        return 'text-green-600 bg-green-50';
    }
  };
  
  const getStatusText = () => {
    switch(status) {
      case 'active':
        return 'Crise active';
      case 'critical':
        return 'Critique';
      case 'warning':
        return 'Attention';
      case 'standby':
        return 'En veille';
      case 'normal':
        return 'Normal';
      default:
        return 'Inconnu';
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center mb-4">
        <div className="mr-3">{icon}</div>
        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="flex items-center">
        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor()}`}>
          <div className={`h-2 w-2 rounded-full mr-1 ${status === 'normal' || status === 'standby' ? 'bg-green-500' : status === 'warning' ? 'bg-amber-500' : 'bg-red-500'}`}></div>
          {getStatusText()}
        </div>
      </div>
      <p className="mt-2 text-sm text-gray-500">{details}</p>
    </div>
  );
};

export default StatusCard;
