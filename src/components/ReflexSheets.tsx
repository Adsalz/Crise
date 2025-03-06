import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  FileText, 
  CheckSquare,
  Download,
  Printer
} from 'lucide-react';
import { useAlertStore } from '../store/useAlertStore';

interface ReflexSheetProps {
  phase: 'alert' | 'escalation' | 'management' | 'resolution';
}

const ReflexSheets: React.FC<ReflexSheetProps> = ({ phase }) => {
  const { crisisPhase, completeReflexAction } = useAlertStore();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Titres des fiches réflexes par phase
  const phaseDetails = {
    alert: {
      title: 'Fiche réflexe 1: Réception de l\'alerte et analyse',
      icon: <AlertTriangle size={20} />,
      color: 'blue'
    },
    escalation: {
      title: 'Fiche réflexe 2: Installation et constitution de la cellule de crise',
      icon: <FileText size={20} />,
      color: 'amber'
    },
    management: {
      title: 'Fiche réflexe 3: Conduite de crise',
      icon: <Clock size={20} />,
      color: 'red'
    },
    resolution: {
      title: 'Fiche réflexe 4: Atterrissage',
      icon: <CheckSquare size={20} />,
      color: 'green'
    }
  };

  // Contenu des fiches réflexes par phase (simplifiées, basées sur le guide)
  const reflexContent = {
    alert: [
      {
        id: 'alert-section-1',
        title: 'Action 1: Réception de l\'appel/mail',
        steps: [
          { id: 'alert-1-1', text: 'Noter l\'heure d\'appel/mail', isDone: false },
          { id: 'alert-1-2', text: 'Noter le nom et la fonction de l\'appelant', isDone: false },
          { id: 'alert-1-3', text: 'Noter le numéro de téléphone', isDone: false },
          { id: 'alert-1-4', text: 'Noter l\'origine de l\'appel (ARS, Préfecture...)', isDone: false },
          { id: 'alert-1-5', text: 'Noter le message exact', isDone: false }
        ]
      },
      {
        id: 'alert-section-2',
        title: 'Action 2: Vérification de l\'appel',
        steps: [
          { id: 'alert-2-1', text: 'Rappeler le correspondant pour confirmer l\'alerte', isDone: false }
        ]
      },
      {
        id: 'alert-section-3',
        title: 'Action 3: Analyse de la situation',
        steps: [
          { id: 'alert-3-1', text: 'Identifier le groupe de personnes en charge de valider la décision', isDone: false },
          { id: 'alert-3-2', text: 'Analyser l\'impact potentiel sur le territoire', isDone: false }
        ]
      },
      {
        id: 'alert-section-4',
        title: 'Action 4: Activation du dispositif',
        steps: [
          { id: 'alert-4-1', text: 'Décision de transmission de l\'alerte aux membres de la cellule de crise', isDone: false }
        ]
      }
    ],
    escalation: [
      {
        id: 'escalation-section-1',
        title: 'Action 1: Ouverture de la cellule de crise',
        steps: [
          { id: 'escalation-1-1', text: 'Rejoindre les locaux pré-identifiés', isDone: false },
          { id: 'escalation-1-2', text: 'Récupérer la mallette de gestion de crise', isDone: false },
          { id: 'escalation-1-3', text: 'Sortir les procédures et fiches réflexes', isDone: false }
        ]
      },
      {
        id: 'escalation-section-2',
        title: 'Action 2: Appel des membres',
        steps: [
          { id: 'escalation-2-1', text: 'Envoyer un message type aux membres de la cellule', isDone: false },
          { id: 'escalation-2-2', text: 'Doubler d\'un appel téléphonique', isDone: false },
          { id: 'escalation-2-3', text: 'En cas d\'absence, appeler les remplaçants', isDone: false }
        ]
      },
      {
        id: 'escalation-section-3',
        title: 'Action 3: Installation de la cellule de crise',
        steps: [
          { id: 'escalation-3-1', text: 'Faire émarger les membres présents', isDone: false },
          { id: 'escalation-3-2', text: 'Rappel des éléments de contexte', isDone: false },
          { id: 'escalation-3-3', text: 'Procéder à la répartition des fonctions', isDone: false },
          { id: 'escalation-3-4', text: 'Distribuer les fiches actions', isDone: false }
        ]
      },
      {
        id: 'escalation-section-4',
        title: 'Action 4: Information externe',
        steps: [
          { id: 'escalation-4-1', text: 'Informer les membres de la CPTS', isDone: false },
          { id: 'escalation-4-2', text: 'Informer les partenaires extérieurs', isDone: false }
        ]
      }
    ],
    management: [
      {
        id: 'management-section-1',
        title: 'Action 1: Application des fiches actions',
        steps: [
          { id: 'management-1-1', text: 'Veiller à la bonne application des fiches actions', isDone: false }
        ]
      },
      {
        id: 'management-section-2',
        title: 'Objectifs stratégiques de la cellule de crise',
        steps: [
          { id: 'management-2-1', text: 'Organiser la réponse à la SSE', isDone: false },
          { id: 'management-2-2', text: 'Assurer le suivi de la SSE', isDone: false },
          { id: 'management-2-3', text: 'Gérer la communication', isDone: false },
          { id: 'management-2-4', text: 'Gérer les ressources (matérielles/humaines)', isDone: false }
        ]
      }
    ],
    resolution: [
      {
        id: 'resolution-section-1',
        title: 'Action 1: Désactivation du dispositif',
        steps: [
          { id: 'resolution-1-1', text: 'Analyser l\'évolution de la SSE', isDone: false },
          { id: 'resolution-1-2', text: 'Contacter la cellule d\'appui ARS', isDone: false },
          { id: 'resolution-1-3', text: 'Décider de la désactivation du dispositif', isDone: false }
        ]
      },
      {
        id: 'resolution-section-2',
        title: 'Action 2: Traçabilité',
        steps: [
          { id: 'resolution-2-1', text: 'Noter l\'identité du membre qui transmet l\'information', isDone: false }
        ]
      },
      {
        id: 'resolution-section-3',
        title: 'Action 3: Information générale',
        steps: [
          { id: 'resolution-3-1', text: 'Informer les membres de la cellule de crise', isDone: false },
          { id: 'resolution-3-2', text: 'Informer l\'ensemble des membres de la CPTS', isDone: false },
          { id: 'resolution-3-3', text: 'Informer les différents acteurs mobilisés', isDone: false }
        ]
      }
    ]
  };

  // Vérifie si cette phase est la phase active
  const isActivePhase = crisisPhase === phase;

  // Vérifie si une étape est cochée
  const isStepCompleted = (stepId: string) => {
    const reflexActions = useAlertStore.getState().reflexActions;
    return reflexActions.includes(stepId);
  };

  // Calcule le pourcentage de progression
  const calculateProgress = () => {
    const relevantContent = reflexContent[phase];
    let totalSteps = 0;
    let completedSteps = 0;
    
    relevantContent.forEach(section => {
      totalSteps += section.steps.length;
      section.steps.forEach(step => {
        if (isStepCompleted(step.id)) {
          completedSteps++;
        }
      });
    });
    
    return totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
  };

  // Gère le clic sur une étape
  const handleStepClick = (stepId: string) => {
    completeReflexAction(stepId, !isStepCompleted(stepId));
  };

  // Couleur en fonction de la phase
  const getPhaseColor = () => {
    switch(phase) {
      case 'alert': return 'bg-blue-500';
      case 'escalation': return 'bg-amber-500';
      case 'management': return 'bg-red-500';
      case 'resolution': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  // Style du texte en fonction de la phase
  const getPhaseTextColor = () => {
    switch(phase) {
      case 'alert': return 'text-blue-600';
      case 'escalation': return 'text-amber-600';
      case 'management': return 'text-red-600';
      case 'resolution': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  // Style du fond en fonction de la phase
  const getPhaseBgColor = () => {
    switch(phase) {
      case 'alert': return 'bg-blue-50';
      case 'escalation': return 'bg-amber-50';
      case 'management': return 'bg-red-50';
      case 'resolution': return 'bg-green-50';
      default: return 'bg-gray-50';
    }
  };

  return (
    <div className={`border rounded-lg ${isActivePhase ? 'border-gray-300' : 'border-gray-200'}`}>
      <div className={`p-4 flex justify-between items-center ${isActivePhase ? getPhaseBgColor() : 'bg-gray-50'}`}>
        <div className="flex items-center">
          <div className={`p-2 rounded-full mr-3 ${isActivePhase ? getPhaseBgColor() : 'bg-gray-100'}`}>
            {phaseDetails[phase].icon}
          </div>
          <div>
            <h3 className={`font-medium ${isActivePhase ? 'text-gray-800' : 'text-gray-500'}`}>
              {phaseDetails[phase].title}
            </h3>
            {isActivePhase && (
              <div className="flex items-center mt-1">
                <div className="w-24 h-2 bg-gray-200 rounded-full mr-2 overflow-hidden">
                  <div
                    className={`h-full ${getPhaseColor()}`}
                    style={{ width: `${calculateProgress()}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">{calculateProgress()}% terminé</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {isActivePhase && (
            <>
              <button 
                className="text-gray-500 hover:text-gray-700 p-1"
                title="Imprimer"
              >
                <Printer size={16} />
              </button>
              <button 
                className="text-gray-500 hover:text-gray-700 p-1"
                title="Télécharger"
              >
                <Download size={16} />
              </button>
            </>
          )}
        </div>
      </div>
      
      {isActivePhase && (
        <div className="p-4 border-t border-gray-200">
          {reflexContent[phase].map(section => (
            <div key={section.id} className="mb-4 last:mb-0">
              <button
                onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                className="w-full flex justify-between items-center py-2 px-1 text-left"
              >
                <span className="font-medium text-gray-800">{section.title}</span>
                {expandedSection === section.id ? (
                  <ChevronUp size={18} className="text-gray-500" />
                ) : (
                  <ChevronDown size={18} className="text-gray-500" />
                )}
              </button>
              
              {expandedSection === section.id && (
                <div className="pl-4 mt-2 space-y-2">
                  {section.steps.map(step => (
                    <div
                      key={step.id}
                      className="flex items-start p-2 hover:bg-gray-50 rounded"
                    >
                      <button
                        onClick={() => handleStepClick(step.id)}
                        className={`flex-shrink-0 w-5 h-5 rounded border ${
                          isStepCompleted(step.id)
                            ? 'bg-blue-500 border-blue-500'
                            : 'border-gray-300'
                        } flex items-center justify-center mr-3 mt-0.5`}
                      >
                        {isStepCompleted(step.id) && (
                          <CheckSquare size={14} className="text-white" />
                        )}
                      </button>
                      <span className={isStepCompleted(step.id) ? 'text-gray-500 line-through' : 'text-gray-800'}>
                        {step.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReflexSheets;