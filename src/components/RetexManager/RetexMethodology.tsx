import React from 'react';
import { ArrowRight, Clock, FileText, CheckCircle, ChevronDown, ChevronUp, BookOpen, Download } from 'lucide-react';
import RetexPhase from './RetexPhase';

const RetexMethodology = ({ phases, expandedItem, setExpandedItem }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Méthodologie RETEX</h3>
        <div className="flex space-x-2">
          <button className="text-blue-600 text-sm flex items-center bg-blue-50 p-2 rounded-full">
            <BookOpen size={16} className="mr-1" /> Guide
          </button>
          <button className="text-blue-600 text-sm flex items-center bg-blue-50 p-2 rounded-full">
            <Download size={16} className="mr-1" /> Télécharger
          </button>
        </div>
      </div>
      
      <div className="relative mb-8">
        {/* Barre de progression */}
        <div className="h-1 w-full bg-gray-200 rounded overflow-hidden">
          <div className="h-full bg-blue-500 w-1/3"></div>
        </div>
        
        {/* Phases du RETEX */}
        <div className="flex justify-between items-start mt-4">
          {phases.map((phase, index) => (
            <RetexPhase 
              key={phase.id} 
              phase={phase} 
              index={index} 
              totalPhases={phases.length}
              expanded={expandedItem === phase.id}
              onToggle={() => setExpandedItem(expandedItem === phase.id ? null : phase.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RetexMethodology;