import React from 'react';
import { Bell, TrendingUp, Activity, Check } from 'lucide-react';

const RetexCrisisPhases = ({ phases }) => {
  // Obtenir l'icône appropriée pour chaque phase
  const getPhaseIcon = (phaseId) => {
    switch(phaseId) {
      case 'alert': return <Bell size={16} className="text-red-500" />;
      case 'scaling': return <TrendingUp size={16} className="text-amber-500" />;
      case 'management': return <Activity size={16} className="text-blue-500" />;
      case 'closure': return <Check size={16} className="text-green-500" />;
      default: return <Bell size={16} />;
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">Phases de gestion de crise évaluées</h3>
      <p className="text-xs text-gray-600 mb-3">
        Selon guide méthodologique - pages 19-21
      </p>
      <div className="flex flex-wrap md:flex-nowrap gap-2">
        {phases.map((phase, idx) => (
          <div key={phase.id} className="flex-1 border rounded-lg p-3 bg-gray-50">
            <div className="flex items-center mb-2">
              {getPhaseIcon(phase.id)}
              <span className="ml-1.5 font-medium text-sm">{idx + 1}</span>
            </div>
            <h4 className="text-sm font-medium">{phase.title}</h4>
            <p className="text-xs text-gray-600">{phase.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RetexCrisisPhases;