import React from 'react';
import { AlertTriangle, Users, Bug, Beaker, PackageX } from 'lucide-react';

interface CrisisType {
  id: string;
  label: string;
  examples: string;
}

interface RetexCrisisTypesProps {
  types: CrisisType[];
  selectedType: string | null;
  onTypeSelect: (typeId: string) => void;
}

const RetexCrisisTypes: React.FC<RetexCrisisTypesProps> = ({ types, selectedType, onTypeSelect }) => {
  // Fonction pour obtenir l'icône appropriée pour chaque type de crise
  const getCrisisIcon = (typeId: string) => {
    switch(typeId) {
      case 'casualties': return <Users size={16} />;
      case 'sickness': return <AlertTriangle size={16} />;
      case 'infectious': return <Bug size={16} />;
      case 'nrc': return <Beaker size={16} />;
      case 'disruption': return <PackageX size={16} />;
      default: return <AlertTriangle size={16} />;
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Filtrer par type de crise sanitaire (selon guide p.5)
      </label>
      <div className="flex flex-wrap gap-2">
        {types.map((type: CrisisType) => (
          <button 
            key={type.id} 
            className={`px-3 py-1.5 text-xs rounded-full flex items-center ${
              selectedType === type.id 
                ? 'bg-blue-100 text-blue-800 border border-blue-300' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
            title={type.examples}
            onClick={() => onTypeSelect(type.id)}
          >
            <span className="mr-1.5">{getCrisisIcon(type.id)}</span>
            {type.label}
          </button>
        ))}
      </div>
      {selectedType && (
        <div className="mt-2 text-xs text-gray-600 italic">
          <span className="font-medium">Exemples:</span> {types.find(t => t.id === selectedType)?.examples}
        </div>
      )}
    </div>
  );
};

export default RetexCrisisTypes;
