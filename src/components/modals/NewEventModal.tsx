import React from 'react';
import { X } from 'lucide-react';

interface NewEventModalProps {
  show: boolean;
  onClose: () => void;
  eventData: {
    title: string;
    date: string;
    type: 'training' | 'exercise' | 'maintenance';
  };
  setEventData: React.Dispatch<React.SetStateAction<{
    title: string;
    date: string;
    type: 'training' | 'exercise' | 'maintenance';
  }>>;
  onSave: () => void;
}

const NewEventModal: React.FC<NewEventModalProps> = ({ 
  show, 
  onClose, 
  eventData, 
  setEventData, 
  onSave 
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Ajouter un événement</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={eventData.title}
              onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={eventData.date}
              onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={eventData.type}
              onChange={(e) => setEventData({ 
                ...eventData, 
                type: e.target.value as 'training' | 'exercise' | 'maintenance' 
              })}
            >
              <option value="training">Formation</option>
              <option value="exercise">Exercice</option>
              <option value="maintenance">Maintenance</option>
            </select>
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
            disabled={!eventData.title || !eventData.date}
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewEventModal;
