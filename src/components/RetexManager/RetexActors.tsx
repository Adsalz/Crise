import React from 'react';
import { Users, Brain, UserPlus } from 'lucide-react';

interface Actor {
  role: string;
  responsibility: string;
}

interface RetexActorsProps {
  actors: Actor[];
}

const RetexActors: React.FC<RetexActorsProps> = ({ actors }) => {
  // Obtenir l'icône appropriée pour chaque rôle
  const getActorIcon = (role: string) => {
    if (role.includes('comité de pilotage')) return <Users size={20} />;
    if (role.includes('Référent')) return <Brain size={20} />;
    return <UserPlus size={20} />;
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">Acteurs du RETEX</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actors.map((actor: Actor, idx: number) => (
          <div key={idx} className="bg-gray-50 p-3 rounded-lg flex">
            <div className="mr-3 text-blue-600">
              {getActorIcon(actor.role)}
            </div>
            <div>
              <h4 className="font-medium text-sm">{actor.role}</h4>
              <p className="text-xs text-gray-600">{actor.responsibility}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RetexActors;
