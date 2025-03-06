import React from 'react';
import { X, Shield, UserPlus } from 'lucide-react';
import { CrisisFunction } from '../../store/useAlertStore';

interface NewTeamMemberModalProps {
  show: boolean;
  onClose: () => void;
  teamMemberData: {
    name: string;
    role: string;
    function: CrisisFunction;
  };
  setTeamMemberData: React.Dispatch<React.SetStateAction<{
    name: string;
    role: string;
    function: CrisisFunction;
  }>>;
  onSave: () => void;
}

const NewTeamMemberModal: React.FC<NewTeamMemberModalProps> = ({ 
  show, 
  onClose, 
  teamMemberData, 
  setTeamMemberData, 
  onSave 
}) => {
  if (!show) return null;

  const roles = [
    "Fonction Décision",
    "Coordination Médicale",
    "Liaison ARS",
    "Logistique",
    "Communication",
    "Ressources Humaines"
  ] as CrisisFunction[];

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Ajouter un membre à la cellule de crise</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
            <div className="flex">
              <div className="flex items-center justify-center h-10 w-10 rounded-l-md bg-blue-100 border border-r-0 border-gray-300">
                <Shield size={20} className="text-blue-600" />
              </div>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-r-md"
                placeholder="Dr. Martin Dupont"
                value={teamMemberData.name}
                onChange={(e) => setTeamMemberData({ ...teamMemberData, name: e.target.value })}
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Fonction dans la cellule</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={teamMemberData.function}
              onChange={(e) => {
                const selectedFunction = e.target.value as CrisisFunction;
                setTeamMemberData({ 
                  ...teamMemberData, 
                  role: selectedFunction,
                  function: selectedFunction
                });
              }}
            >
              <option value="">Sélectionner une fonction</option>
              {roles.map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

          <div className="p-3 bg-blue-50 text-blue-800 rounded-md text-sm">
            <p>Les membres ajoutés à la cellule de crise seront notifiés automatiquement en cas d'activation du plan.</p>
          </div>
        </div>
        
        <div className="p-4 border-t flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md"
          >
            Annuler
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center"
            disabled={!teamMemberData.name || !teamMemberData.function}
          >
            <UserPlus size={18} className="mr-2" />
            Ajouter le membre
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewTeamMemberModal;
