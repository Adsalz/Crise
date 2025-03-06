import React from 'react';
import { Calendar, ChevronUp, ChevronDown, Users, AlertTriangle, CheckCircle } from 'lucide-react';
import { getStatusLabel, getStatusColor } from './retexData';

const RetexItem = ({ retex, expanded, onToggle }) => {
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
        <div className="flex items-center">
          <div className="mr-4">
            <div className="flex items-center">
              <div className="w-20 h-2 bg-gray-200 rounded-full mr-2">
                <div 
                  className="h-full bg-blue-500 rounded-full" 
                  style={{ width: `${retex.progress}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-500">{retex.progress}%</span>
            </div>
          </div>
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
          <p className="text-sm text-gray-600 mb-4">{retex.description}</p>
          
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="flex-1 mb-4 md:mb-0">
              <h5 className="font-medium text-sm mb-2">Détails</h5>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center mb-2">
                  <Users size={16} className="text-gray-500 mr-2" />
                  <span className="text-sm">{retex.participants} participants</span>
                </div>
                <div className="flex items-center">
                  <AlertTriangle size={16} className="text-gray-500 mr-2" />
                  <span className="text-sm">Référent: {retex.lead}</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <h5 className="font-medium text-sm mb-2">Prochaines étapes</h5>
              <div className="bg-gray-50 p-3 rounded-lg">
                <ul className="space-y-2">
                  {retex.status === 'preparation' ? (
                    <>
                      <li className="text-sm flex items-center">
                        <CheckCircle size={14} className="text-green-500 mr-2" />
                        <span>Constitution de l'équipe RETEX</span>
                      </li>
                      <li className="text-sm flex items-start">
                        <div className="h-4 w-4 rounded-full border-2 border-blue-500 mt-0.5 mr-2"></div>
                        <span>Définition du périmètre et objectifs</span>
                      </li>
                      <li className="text-sm flex items-start text-gray-400">
                        <div className="h-4 w-4 rounded-full border-2 border-gray-300 mt-0.5 mr-2"></div>
                        <span>Élaboration des outils de collecte</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="text-sm flex items-center">
                        <CheckCircle size={14} className="text-green-500 mr-2" />
                        <span>Collecte des données terminée</span>
                      </li>
                      <li className="text-sm flex items-start">
                        <div className="h-4 w-4 rounded-full border-2 border-blue-500 mt-0.5 mr-2"></div>
                        <span>Analyse des écarts et bonnes pratiques</span>
                      </li>
                      <li className="text-sm flex items-start text-gray-400">
                        <div className="h-4 w-4 rounded-full border-2 border-gray-300 mt-0.5 mr-2"></div>
                        <span>Formulation des recommandations</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-4 space-x-2">
            <button className="px-3 py-1 text-blue-600 border border-blue-600 rounded-md text-sm">
              Consulter
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">
              Mettre à jour
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RetexItem;