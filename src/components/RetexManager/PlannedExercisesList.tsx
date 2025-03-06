import React from 'react';
import { Plus } from 'lucide-react';
import ExerciseItem from './ExerciseItem';

const PlannedExercisesList = ({ exercises, expandedItem, setExpandedItem }) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Programme d'exercices planifiés</h3>
        <button className="flex items-center text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          <Plus size={16} className="mr-1" /> Planifier un exercice
        </button>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        Exercices d'entraînement planifiés conformément au guide méthodologique pour tester le plan de gestion de crise.
      </p>
      
      <div className="space-y-4">
        {exercises.length === 0 ? (
          <p className="text-center text-gray-500 py-4">Aucun exercice planifié pour le moment.</p>
        ) : (
          exercises.map((exercise) => (
            <ExerciseItem 
              key={exercise.id} 
              exercise={exercise} 
              expanded={expandedItem === `exercise-${exercise.id}`}
              onToggle={() => setExpandedItem(expandedItem === `exercise-${exercise.id}` ? null : `exercise-${exercise.id}`)}
            />
          ))
        )}
      </div>
    </>
  );
};

export default PlannedExercisesList;