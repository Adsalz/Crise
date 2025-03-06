import React from 'react';
import { Calendar, ChevronUp, ChevronDown, CheckCircle, BarChart2 } from 'lucide-react';
import { getStatusLabel, getStatusColor } from './retexData';
import RetexActionTracking from './RetexActionTracking';

const CompletedRetexItem = ({ retex, expanded, onToggle }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="flex justify-between items-center p-4 bg-gray-50">
        <div>
          <h4 className="font-medium">{retex.title}</h4>
          <div className="flex items-center mt-1">
            <Calendar size={14} className="text-gray-500 mr-1" />
            <span className="text-xs text-gray-500">{retex.date}</span>
            <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${getStatusColor(retex.status)}`}>
              {getStatusLabel(retex.status)}
            </span>
          </div>
        </div>
        <button
          onClick={onToggle}
          className="p-1 rounded-full hover:bg-gray-200"
        >
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>
      
      {expanded && (
        <div className="p-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-sm mb-2 flex items-center">
                <CheckCircle size={16} className="text-green-600 mr-1" />
                Enseignements clés
              </h5>
              <ul className="space-y-2 bg-gray-50 p-3 rounded-md">
                {retex.learnings.map((item, idx) => (
                  <li key={idx} className="text-sm flex items-start">
                    <span className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-800 mr-2 flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h5 className="font-medium text-sm mb-2 flex items-center">
                <BarChart2 size={16} className="text-blue-600 mr-1" />
                Améliorations mises en œuvre
              </h5>
              <ul className="space-y-2 bg-gray-50 p-3 rounded-md">
                {retex.improvements.map((item, idx) => (
                  <li key={idx} className="text-sm flex items-start">
                    <span className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 mr-2 flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Suivi des actions correctives */}
          {retex.actions && retex.actions.length > 0 && (
            <RetexActionTracking actions={retex.actions} />
          )}
          
          <div className="flex justify-end mt-4">
            <button className="px-3 py-1 text-blue-600 bg-blue-50 rounded-md text-sm">
              Télécharger le rapport complet
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompletedRetexItem;