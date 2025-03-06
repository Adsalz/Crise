import React from 'react';
import { Calendar, ChevronUp, ChevronDown, Edit, Bell, TrendingUp, Activity, Check } from 'lucide-react';

const ExerciseItem = ({ exercise, expanded, onToggle }) => {
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
  
  // Obtenir le libellé de la phase
  const getPhaseLabel = (phaseId) => {
    switch(phaseId) {
      case 'alert': return 'Phase 1 - Alerte';
      case 'scaling': return 'Phase 2 - Montée en puissance';
      case 'management': return 'Phase 3 - Conduite de crise';
      case 'closure': return 'Phase 4 - Sortie de crise';
      default: return phaseId;
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="flex justify-between items-center p-4 bg-gray-50">
        <div>
          <h4 className="font-medium">{exercise.title}</h4>
          <div className="flex items-center mt-1">
            <Calendar size={14} className="text-gray-500 mr-1" />
            <span className="text-xs text-gray-500">{exercise.date}</span>
            <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
              exercise.type === 'tabletop' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
            }`}>
              {exercise.type === 'tabletop' ? 'Exercice sur table' : 'Exercice terrain'}
            </span>
          </div>
        </div>
        <div className="flex items-center">
          <button className="p-1 text-blue-600 hover:bg-blue-50 rounded-md text-sm mr-2">
            <Edit size={16} />
          </button>
          <button
            onClick={onToggle}
            className="p-1 rounded-full hover:bg-gray-200"
          >
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>
      
      {expanded && (
        <div className="p-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-sm mb-2">Scénario</h5>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                {exercise.scenario}
              </p>
              
              <h5 className="font-medium text-sm mt-4 mb-2">Phases testées</h5>
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="flex flex-wrap gap-2">
                  {exercise.testedPhases.map((phase) => (
                    <div key={phase} className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded">
                      {getPhaseIcon(phase)}
                      <span className="ml-1">{getPhaseLabel(phase)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="font-medium text-sm mb-2">Participants</h5>
              <div className="bg-gray-50 p-3 rounded-md">
                <ul className="space-y-1">
                  {exercise.participants.map((participant, idx) => (
                    <li key={idx} className="text-sm flex items-center">
                      <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                      <span>{participant}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <h5 className="font-medium text-sm mt-4 mb-2">Critères d'évaluation</h5>
              <div className="bg-gray-50 p-3 rounded-md">
                <ul className="space-y-1">
                  {exercise.evaluationCriteria.map((criterion, idx) => (
                    <li key={idx} className="text-sm flex items-start">
                      <span className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 mr-2 flex-shrink-0">
                        {idx + 1}
                      </span>
                      <span>{criterion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-4 space-x-2">
            <button className="px-3 py-1 text-blue-600 border border-blue-600 rounded-md text-sm">
              Planning détaillé
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">
              Préparation RETEX
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseItem;