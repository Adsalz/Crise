import React from 'react';
import { X, Bell, AlertTriangle } from 'lucide-react';

interface NewAlertModalProps {
  show: boolean;
  onClose: () => void;
  alertData: {
    message: string;
    level: 'info' | 'warning';
  };
  setAlertData: React.Dispatch<React.SetStateAction<{
    message: string;
    level: 'info' | 'warning';
  }>>;
  onSave: () => void;
}

const NewAlertModal: React.FC<NewAlertModalProps> = ({ 
  show, 
  onClose, 
  alertData, 
  setAlertData, 
  onSave 
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Ajouter une alerte</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md"
              value={alertData.message}
              onChange={(e) => setAlertData({ ...alertData, message: e.target.value })}
              rows={3}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Niveau d'alerte</label>
            <div className="flex space-x-4">
              <div 
                onClick={() => setAlertData({ ...alertData, level: 'info' })}
                className={`flex items-center p-3 border rounded cursor-pointer ${
                  alertData.level === 'info' 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <Bell size={20} className="mr-2 text-blue-600" />
                <div>
                  <p className="font-medium">Information</p>
                  <p className="text-xs text-gray-500">Pour partager une information</p>
                </div>
              </div>
              
              <div 
                onClick={() => setAlertData({ ...alertData, level: 'warning' })}
                className={`flex items-center p-3 border rounded cursor-pointer ${
                  alertData.level === 'warning' 
                    ? 'border-amber-500 bg-amber-50 text-amber-700' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <AlertTriangle size={20} className="mr-2 text-amber-600" />
                <div>
                  <p className="font-medium">Alerte</p>
                  <p className="text-xs text-gray-500">Pour signaler un problème</p>
                </div>
              </div>
            </div>
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
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
            disabled={!alertData.message}
          >
            Publier l'alerte
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewAlertModal;
