import React, { ReactNode } from 'react';
import { AlertTriangle, Shield, Clock } from 'lucide-react';

interface AlertLevelCardProps {
  level: 'normal' | 'warning' | 'critical';
  title: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
}

const AlertLevelCard: React.FC<AlertLevelCardProps> = ({ level, title, description, isActive, onClick }) => {
  const getLevelStyles = () => {
    const baseStyles = "border rounded-lg p-4 cursor-pointer transition-all";
    
    if (isActive) {
      switch(level) {
        case 'normal':
          return `${baseStyles} border-green-500 bg-green-50`;
        case 'warning':
          return `${baseStyles} border-amber-500 bg-amber-50`;
        case 'critical':
          return `${baseStyles} border-red-500 bg-red-50`;
        default:
          return `${baseStyles} border-blue-500 bg-blue-50`;
      }
    }
    
    return `${baseStyles} border-gray-200 hover:border-gray-300`;
  };
  
  const getIconStyles = () => {
    switch(level) {
      case 'normal':
        return "bg-green-100 text-green-600";
      case 'warning':
        return "bg-amber-100 text-amber-600";
      case 'critical':
        return "bg-red-100 text-red-600";
      default:
        return "bg-blue-100 text-blue-600";
    }
  };
  
  return (
    <div className={getLevelStyles()} onClick={onClick}>
      <div className="flex items-center mb-2">
        <div className={`rounded-full p-2 ${getIconStyles()} mr-2`}>
          {level === 'normal' ? (
            <Clock size={18} />
          ) : level === 'warning' ? (
            <AlertTriangle size={18} />
          ) : (
            <Shield size={18} />
          )}
        </div>
        <h4 className="font-medium">{title}</h4>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default AlertLevelCard;
