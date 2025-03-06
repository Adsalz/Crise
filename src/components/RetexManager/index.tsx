import React, { useState } from 'react';
import RetexMethodology from './RetexMethodology';
import RetexActors from './RetexActors';
import RetexCycle from './RetexCycle';
import RetexCrisisTypes from './RetexCrisisTypes';
import RetexCrisisPhases from './RetexCrisisPhases';
import OngoingRetexList from './OngoingRetexList';
import CompletedRetexList from './CompletedRetexList';
import PlannedExercisesList from './PlannedExercisesList';
import { Plus } from 'lucide-react';

// Données partagées pour les différents composants
import { 
  ongoingRetexMock, 
  completedRetexMock, 
  plannedExercisesMock,
  retexPhases,
  crisisTypes,
  crisisPhases,
  retexActors
} from './retexData';

const RetexManager = () => {
  const [activeTab, setActiveTab] = useState('ongoing');
  const [expandedItem, setExpandedItem] = useState(null);
  const [selectedCrisisType, setSelectedCrisisType] = useState(null);

  // Fonction pour filtrer les RETEX par type de crise (à implémenter)
  const filterByType = (type) => {
    setSelectedCrisisType(type === selectedCrisisType ? null : type);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Retour d'expérience (RETEX)</h2>
          <p className="text-gray-600">
            Analyse systématique et collective des événements pour identifier ce qui a fonctionné, 
            ce qui n'a pas fonctionné, et comment s'améliorer.
          </p>
        </div>
        
        {/* Archivage et version du document */}
        <div className="flex items-center justify-end mb-4 text-sm">
          <div className="flex items-center mr-4">
            <span className="text-gray-500 mr-2">Version:</span>
            <span className="font-medium">1.2</span>
          </div>
          <div className="flex items-center mr-4">
            <span className="text-gray-500 mr-2">Dernière mise à jour:</span>
            <span className="font-medium">02/03/2025</span>
          </div>
        </div>
        
        {/* Méthodologie RETEX et Acteurs */}
        <RetexMethodology 
          phases={retexPhases} 
          expandedItem={expandedItem} 
          setExpandedItem={setExpandedItem} 
        />
        
        <RetexActors actors={retexActors} />
        
        {/* Cycle de préparation et phases de crise */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="md:w-1/2">
            <RetexCycle />
          </div>
          <div className="md:w-1/2">
            <RetexCrisisPhases phases={crisisPhases} />
          </div>
        </div>
        
        {/* Filtrage par type de crise */}
        <RetexCrisisTypes 
          types={crisisTypes} 
          selectedType={selectedCrisisType} 
          onTypeSelect={filterByType} 
        />
        
        {/* Onglets */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('ongoing')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'ongoing' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              RETEX en cours
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'completed' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              RETEX terminés
            </button>
            <button
              onClick={() => setActiveTab('exercises')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'exercises' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Exercices planifiés
            </button>
          </nav>
        </div>
        
        {/* Contenu des onglets */}
        {activeTab === 'ongoing' && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800">RETEX en cours</h3>
              <button className="flex items-center text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                <Plus size={16} className="mr-1" /> Nouveau RETEX
              </button>
            </div>
            
            <OngoingRetexList 
              retexes={ongoingRetexMock} 
              expandedItem={expandedItem} 
              setExpandedItem={setExpandedItem} 
            />
          </>
        )}
        
        {activeTab === 'completed' && (
          <CompletedRetexList 
            retexes={completedRetexMock} 
            expandedItem={expandedItem} 
            setExpandedItem={setExpandedItem} 
          />
        )}
        
        {activeTab === 'exercises' && (
          <PlannedExercisesList 
            exercises={plannedExercisesMock} 
            expandedItem={expandedItem} 
            setExpandedItem={setExpandedItem} 
          />
        )}
      </div>
    </div>
  );
};

export default RetexManager;