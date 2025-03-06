import React from 'react';
import { useAlertStore } from '../store/useAlertStore';
import { 
  Bell, 
  ArrowUp, 
  Activity, 
  CheckCircle, 
  Clock,
  ArrowRight
} from 'lucide-react';

const PhaseManager: React.FC = () => {
  const { 
    crisisPhase, 
    setPhase, 
    activeCrisis, 
    alertLevel,
    activateCrisis,
    updateLastUpdate,
    addAlert
  } = useAlertStore();

  const phases = [
    { 
      id: 'alert', 
      name: 'Alerte et réponse immédiate', 
      icon: <Bell size={18} />,
      description: 'Réception et diffusion de l\'alerte, analyse initiale',
      color: 'blue'
    },
    { 
      id: 'escalation', 
      name: 'Montée en puissance', 
      icon: <ArrowUp size={18} />,
      description: 'Activation du plan et armement de la cellule de crise',
      color: 'amber'
    },
    { 
      id: 'management', 
      name: 'Conduite de la crise', 
      icon: <Activity size={18} />,
      description: 'Suivi de la situation et mise en œuvre de la stratégie',
      color: 'red'
    },
    { 
      id: 'resolution', 
      name: 'Sortie de crise', 
      icon: <CheckCircle size={18} />,
      description: 'Retour à la normale et retour d\'expérience',
      color: 'green'
    }
  ];

  // Sélectionne la couleur en fonction de la phase
  const getPhaseColor = (phaseId: string) => {
    const phase = phases.find(p => p.id === phaseId);
    if (!phase) return '';
    
    switch(phase.color) {
      case 'blue': return 'bg-blue-500';
      case 'amber': return 'bg-amber-500';
      case 'red': return 'bg-red-500';
      case 'green': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  // Vérifie si une phase est actuellement active
  const isPhaseActive = (phaseId: string) => {
    return crisisPhase === phaseId;
  };

  // Vérifie si une phase est accessible
  const isPhaseAccessible = (phaseId: string) => {
    // Si la crise n'est pas active, seule la phase d'alerte est accessible
    if (!activeCrisis && phaseId !== 'alert') return false;
    
    // Logique pour déterminer si une phase est accessible en fonction de la phase actuelle
    const phaseOrder = phases.map(p => p.id);
    const currentIndex = phaseOrder.indexOf(crisisPhase);
    const targetIndex = phaseOrder.indexOf(phaseId);
    
    // On peut aller à une phase précédente ou à la phase suivante
    return targetIndex <= currentIndex + 1;
  };

  // Change la phase de crise
  const handlePhaseChange = (phaseId: string) => {
    if (!isPhaseAccessible(phaseId)) return;
    
    setPhase(phaseId);
    updateLastUpdate();
    
    // Activer automatiquement la crise si on passe à une phase autre que l'alerte
    if (phaseId !== 'alert' && !activeCrisis) {
      activateCrisis(true);
    }
    
    // Désactiver la crise si on est en phase de résolution
    if (phaseId === 'resolution') {
      // Attendre avant de désactiver pour permettre la phase de retour d'expérience
      // Dans une vraie application, prévoir une confirmation avant désactivation
    }
    
    // Ajouter une alerte pour indiquer le changement de phase
    const phase = phases.find(p => p.id === phaseId);
    if (phase) {
      addAlert({
        level: phaseId === 'resolution' ? 'info' : 'warning',
        message: `Phase de crise: ${phase.name}`,
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg text-gray-800">Phases de gestion de crise</h3>
        <div className="flex items-center">
          <Clock size={18} className="mr-1 text-gray-500" />
          <span className="text-sm text-gray-500">Dernière mise à jour: {new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
      
      <div className="relative mb-8">
        {/* Barre de progression */}
        <div className="h-1 w-full bg-gray-200 rounded overflow-hidden">
          <div
            className="h-full transition-all duration-500 ease-in-out"
            style={{
              width: `${
                crisisPhase === 'alert' ? '25%' :
                crisisPhase === 'escalation' ? '50%' :
                crisisPhase === 'management' ? '75%' :
                crisisPhase === 'resolution' ? '100%' : '0%'
              }`,
              backgroundColor: getPhaseColor(crisisPhase)
            }}
          ></div>
        </div>
        
        {/* Étapes */}
        <div className="flex justify-between items-center -mt-2">
          {phases.map((phase, index) => (
            <div key={phase.id} className="flex flex-col items-center mt-1">
              <button
                onClick={() => handlePhaseChange(phase.id)}
                disabled={!isPhaseAccessible(phase.id)}
                className={`w-5 h-5 rounded-full relative ${
                  isPhaseActive(phase.id)
                    ? getPhaseColor(phase.id) + ' ring-4 ring-opacity-30 ' + 
                      (phase.color === 'blue' ? 'ring-blue-200' : 
                       phase.color === 'amber' ? 'ring-amber-200' : 
                       phase.color === 'red' ? 'ring-red-200' : 
                       'ring-green-200')
                    : isPhaseAccessible(phase.id)
                      ? 'bg-white border border-gray-400 cursor-pointer hover:border-blue-400'
                      : 'bg-gray-200 cursor-not-allowed'
                }`}
              >
                {isPhaseActive(phase.id) && (
                  <span className="absolute -right-1 -top-1 bg-white rounded-full p-0.5">
                    <CheckCircle size={12} className={
                      phase.color === 'blue' ? 'text-blue-500' : 
                      phase.color === 'amber' ? 'text-amber-500' : 
                      phase.color === 'red' ? 'text-red-500' : 
                      'text-green-500'
                    } />
                  </span>
                )}
              </button>
              
              <div className="mt-2 flex flex-col items-center">
                <span className={`font-medium text-xs ${
                  isPhaseActive(phase.id)
                    ? 'text-gray-800'
                    : 'text-gray-500'
                }`}>
                  {phase.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Description de la phase active */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-start">
          <div className={`p-2 rounded-full mr-3 ${
            crisisPhase === 'alert' ? 'bg-blue-100 text-blue-600' : 
            crisisPhase === 'escalation' ? 'bg-amber-100 text-amber-600' :
            crisisPhase === 'management' ? 'bg-red-100 text-red-600' :
            'bg-green-100 text-green-600'
          }`}>
            {phases.find(p => p.id === crisisPhase)?.icon}
          </div>
          <div>
            <h4 className="font-medium text-gray-800">
              {phases.find(p => p.id === crisisPhase)?.name}
            </h4>
            <p className="text-sm text-gray-600 mt-1">
              {phases.find(p => p.id === crisisPhase)?.description}
            </p>
          </div>
        </div>
        
        {/* Bouton pour passer à la phase suivante */}
        {crisisPhase !== 'resolution' && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => {
                const phaseOrder = phases.map(p => p.id);
                const currentIndex = phaseOrder.indexOf(crisisPhase);
                if (currentIndex < phaseOrder.length - 1) {
                  handlePhaseChange(phaseOrder[currentIndex + 1]);
                }
              }}
              className="flex items-center text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full"
              disabled={!activeCrisis && crisisPhase === 'alert'}
            >
              Phase suivante <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhaseManager;