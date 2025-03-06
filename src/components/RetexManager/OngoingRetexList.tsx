import React from 'react';
import RetexItem from './RetexItem';

const OngoingRetexList = ({ retexes, expandedItem, setExpandedItem }) => {
  return (
    <div className="space-y-4">
      {retexes.length === 0 ? (
        <p className="text-center text-gray-500 py-4">Aucun RETEX en cours actuellement.</p>
      ) : (
        retexes.map((retex) => (
          <RetexItem 
            key={retex.id} 
            retex={retex} 
            expanded={expandedItem === `retex-${retex.id}`}
            onToggle={() => setExpandedItem(expandedItem === `retex-${retex.id}` ? null : `retex-${retex.id}`)}
          />
        ))
      )}
    </div>
  );
};

export default OngoingRetexList;