import React from 'react';
import { ArrowRight, RotateCw, AlertCircle, CheckCircle, BookOpen, Shield } from 'lucide-react';

const RetexCycle = () => {
  return (
    <div className="my-4">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Cycle de préparation et réponse</h3>
      <div className="relative w-64 h-64 mx-auto">
        {/* Cercle principal */}
        <div className="absolute w-full h-full rounded-full border-4 border-blue-100"></div>
        
        {/* Sections du cycle */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-3 py-1 rounded-full text-xs">
          Préparation
        </div>
        <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-3 py-1 rounded-full text-xs">
          Réponse
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-amber-500 text-white px-3 py-1 rounded-full text-xs">
          RETEX
        </div>
        <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-500 text-white px-3 py-1 rounded-full text-xs">
          Amélioration
        </div>
        
        {/* Icônes pour chaque section */}
        <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-blue-500">
          <Shield size={24} />
        </div>
        <div className="absolute top-1/4 right-1/4 transform translate-x-1/2 -translate-y-1/2 text-green-500">
          <AlertCircle size={24} />
        </div>
        <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2 text-amber-500">
          <BookOpen size={24} />
        </div>
        <div className="absolute bottom-1/4 left-1/4 transform -translate-x-1/2 translate-y-1/2 text-purple-500">
          <CheckCircle size={24} />
        </div>
        
        {/* Flèches de cycle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <RotateCw size={32} className="text-gray-400" />
        </div>
        
        {/* Description */}
        <div className="absolute -bottom-12 left-0 right-0 text-center text-xs text-gray-600">
          Conforme au guide méthodologique (schéma n°11)
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-2 gap-2">
        <div className="text-xs border border-gray-200 rounded p-2 bg-gray-50">
          <span className="text-blue-500 font-medium">Préparation:</span> Plan de gestion, formations, exercices
        </div>
        <div className="text-xs border border-gray-200 rounded p-2 bg-gray-50">
          <span className="text-green-500 font-medium">Réponse:</span> Activation du plan, conduite de crise
        </div>
        <div className="text-xs border border-gray-200 rounded p-2 bg-gray-50">
          <span className="text-amber-500 font-medium">RETEX:</span> Analyse systématique, identification des écarts
        </div>
        <div className="text-xs border border-gray-200 rounded p-2 bg-gray-50">
          <span className="text-purple-500 font-medium">Amélioration:</span> Mise à jour des procédures, plans d'action
        </div>
      </div>
    </div>
  );
};

export default RetexCycle;