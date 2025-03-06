import { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  CheckSquare,
  Download,
  Printer
} from 'lucide-react';
import { useAlertStore } from '../store/useAlertStore';

interface ActionSheetProps {
  phase: 'alert' | 'escalation' | 'management' | 'resolution';
}

const ActionSheets: React.FC<ActionSheetProps> = ({ phase }) => {
  const { crisisPhase, completeActionStep } = useAlertStore();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Contenu des fiches actions par phase
  const actionContent = {
    alert: [
      {
        id: 'alert-section-1',
        title: 'Action 1: Communication initiale',
        steps: [
          { id: 'alert-1-1', text: 'Préparer un message initial de communication', isDone: false },
          { id: 'alert-1-2', text: 'Valider le message avec le comité de direction', isDone: false },
          { id: 'alert-1-3', text: 'Diffuser le message aux parties prenantes', isDone: false }
        ]
      },
      {
        id: 'alert-section-2',
        title: 'Action 2: Mobilisation des ressources',
        steps: [
          { id: 'alert-2-1', text: 'Identifier les ressources nécessaires', isDone: false },
          { id: 'alert-2-2', text: 'Contacter et mobiliser les ressources', isDone: false }
        ]
      }
    ],
    escalation: [
      {
        id: 'escalation-section-1',
        title: 'Action 1: Coordination des équipes',
        steps: [
          { id: 'escalation-1-1', text: 'Répartir les rôles et responsabilités', isDone: false },
          { id: 'escalation-1-2', text: 'Établir un plan de communication interne', isDone: false }
        ]
      },
      {
        id: 'escalation-section-2',
        title: 'Action 2: Gestion des ressources',
        steps: [
          { id: 'escalation-2-1', text: 'Évaluer les besoins en ressources', isDone: false },
          { id: 'escalation-2-2', text: 'Mettre en place un système de suivi', isDone: false }
        ]
      }
    ],
    management: [
      {
        id: 'management-section-1',
        title: 'Action 1: Suivi de la situation',
        steps: [
          { id: 'management-1-1', text: 'Collecter et analyser les informations', isDone: false },
          { id: 'management-1-2', text: 'Mettre à jour le tableau de bord de crise', isDone: false }
        ]
      },
      {
        id: 'management-section-2',
        title: 'Action 2: Communication et coordination',
        steps: [
          { id: 'management-2-1', text: 'Organiser des points de situation réguliers', isDone: false },
          { id: 'management-2-2', text: 'Maintenir un canal de communication ouvert', isDone: false }
        ]
      }
    ],
    resolution: [
      {
        id: 'resolution-section-1',
        title: 'Action 1: Préparation de la sortie de crise',
        steps: [
          { id: 'resolution-1-1', text: 'Évaluer l\'impact global de la crise', isDone: false },
          { id: 'resolution-1-2', text: 'Préparer un rapport de clôture', isDone: false }
        ]
      },
      {
        id: 'resolution-section-2',
        title: 'Action 2: Retour d\'expérience',
        steps: [
          { id: 'resolution-2-1', text: 'Organiser une réunion de débriefing', isDone: false },
          { id: 'resolution-2-2', text: 'Documenter les leçons apprises', isDone: false }
        ]
      }
    ]
  };

  // Vérifie si cette phase est la phase active
  const isActivePhase = crisisPhase === phase;

  // Extraire le numéro de l'étape
  const extractStepNumber = (stepId: string): number => {
    const match = stepId.match(/\d+$/);
    return match ? parseInt(match[0], 10) : 0;
  };

  // Vérifie si une étape est cochée
  const isStepCompleted = (stepId: string) => {
    const actionSteps = useAlertStore.getState().actionSteps;
    return actionSteps.includes(extractStepNumber(stepId));
  };

  // Calcule le pourcentage de progression
  const calculateProgress = () => {
    const relevantContent = actionContent[phase];
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
    const stepNumber = extractStepNumber(stepId);
    completeActionStep(stepNumber, !isStepCompleted(stepId));
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
          <div>
            <h3 className={`font-medium ${isActivePhase ? 'text-gray-800' : 'text-gray-500'}`}>
              Actions de la phase {phase}
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
          {actionContent[phase].map(section => (
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

export default ActionSheets;