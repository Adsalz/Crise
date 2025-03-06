import React from 'react';
import { Printer, Download } from 'lucide-react';
import CompletedRetexItem from './CompletedRetexItem';

const CompletedRetexList = ({ retexes, expandedItem, setExpandedItem }) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">RETEX terminés</h3>
        <div className="flex items-center space-x-2">
          <button className="flex items-center text-sm text-gray-600 bg-gray-100 p-2 rounded-full">
            <Printer size={16} />
          </button>
          <button className="flex items-center text-sm text-gray-600 bg-gray-100 p-2 rounded-full">
            <Download size={16} />
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {retexes.length === 0 ? (
          <p className="text-center text-gray-500 py-4">Aucun RETEX terminé disponible.</p>
        ) : (
          retexes.map((retex) => (
            <CompletedRetexItem 
              key={retex.id} 
              retex={retex} 
              expanded={expandedItem === `completed-${retex.id}`}
              onToggle={() => setExpandedItem(expandedItem === `completed-${retex.id}` ? null : `completed-${retex.id}`)}
            />
          ))
        )}
      </div>
    </>
  );
};

export default CompletedRetexList;