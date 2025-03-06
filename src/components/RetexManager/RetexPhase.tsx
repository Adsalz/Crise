import React from 'react';
import { ArrowRight, Clock, FileText, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

const RetexPhase = ({ phase, index, totalPhases, expanded, onToggle }) => {
  // Choisir l'icône en fonction de la phase
  const getPhaseIcon = (phaseId) => {
    switch(phaseId) {
      case 'preparation': return <Clock size={20} />;
      case 'implementation': return <FileText size={20} />;
      case 'followup': return <CheckCircle size={20} />;
      default: return <Clock size={20} />;
    }
  };
  
  // Choisir la couleur en fonction de la phase
  const getPhaseColorClass = (phaseId) => {
    switch(phaseId) {
      case 'preparation': return 'bg-blue-100 text-blue-600';
      case 'implementation': return 'bg-amber-100 text-amber-600';
      case 'followup': return 'bg-purple-100 text-purple-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="flex flex-col items-center w-1/3 px-4">
      <div className="flex items-center mb-2">
        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${getPhaseColorClass(phase.id)}`}>
          {getPhaseIcon(phase.id)}
        </div>
        <ArrowRight 
          size={16} 
          className={`ml-2 text-gray-400 ${index === totalPhases - 1 ? 'invisible' : ''}`} 
        />
      </div>
      
      <h4 className="font-medium text-center">{phase.title}</h4>
      <p className="text-xs text-gray-500 text-center mt-1">{phase.description}</p>
      
      <button 
        onClick={onToggle}
        className="mt-2 text-xs text-blue-600 flex items-center"
      >
        {expanded ? 'Masquer' : 'Voir les étapes'}
        {expanded ? <ChevronUp size={12} className="ml-1" /> : <ChevronDown size={12} className="ml-1" />}
      </button>
      
      {expanded && (
        <div className="mt-2 bg-gray-50 p-3 rounded-lg w-full">
          <ul className="space-y-1">
            {phase.steps.map((step, idx) => (
              <li key={idx} className="text-xs flex items-start">
                <span className="h-4 w-4 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mr-2 mt-0.5 flex-shrink-0">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RetexPhase;