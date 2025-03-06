import React from 'react';
import { BarChart2 } from 'lucide-react';

const RetexActionTracking = ({ actions }) => {
  // Calculer la progression globale
  const calculateOverallProgress = () => {
    if (!actions || actions.length === 0) return 0;
    
    const total = actions.reduce((sum, action) => sum + action.progress, 0);
    return Math.round(total / actions.length);
  };
  
  // Obtenir la classe de couleur en fonction du statut
  const getStatusClass = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'inProgress': return 'bg-amber-100 text-amber-800';
      case 'planned': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Obtenir le libellé du statut
  const getStatusLabel = (status) => {
    switch(status) {
      case 'completed': return 'Terminé';
      case 'inProgress': return 'En cours';
      case 'planned': return 'Planifié';
      default: return status;
    }
  };

  const overallProgress = calculateOverallProgress();

  return (
    <div className="mt-4 border-t pt-4">
      <h5 className="font-medium text-sm mb-2 flex items-center">
        <BarChart2 size={16} className="text-purple-600 mr-1" />
        Suivi des actions correctives
      </h5>
      <div className="bg-gray-50 p-3 rounded-md">
        <div className="flex justify-between mb-2">
          <span className="text-xs text-gray-500">Progression globale</span>
          <span className="text-xs font-medium">{overallProgress}%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full mb-3">
          <div 
            className="h-full bg-purple-500 rounded-full" 
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>
        <table className="w-full text-xs">
          <thead className="text-gray-500">
            <tr>
              <th className="text-left pb-2">Action</th>
              <th className="text-left pb-2">Responsable</th>
              <th className="text-right pb-2">Statut</th>
            </tr>
          </thead>
          <tbody>
            {actions.map((action, idx) => (
              <tr key={idx}>
                <td className="py-1">{action.name}</td>
                <td>{action.responsible}</td>
                <td className="text-right">
                  <span className={`px-1.5 py-0.5 rounded ${getStatusClass(action.status)}`}>
                    {getStatusLabel(action.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RetexActionTracking;