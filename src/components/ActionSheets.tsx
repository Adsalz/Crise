import React, { useState } from 'react';
import { 
  User, 
  MessageSquare, 
  Shield, 
  UserPlus, 
  Package, 
  FileText,
  ChevronDown,
  ChevronUp,
  CheckSquare,
  Download,
  Printer,
  CheckCircle
} from 'lucide-react';
import { useAlertStore } from '../store/useAlertStore';

interface ActionSheetProps {
  role: 'decision' | 'piloting' | 'medical' | 'paramedical' | 'communication' | 'support' | 'secretary' | 'zone';
}

const ActionSheets: React.FC<ActionSheetProps> = ({ role }) => {
  const { completeActionStep, actionSteps, crisisPhase } = useAlertStore();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Titres et informations sur les rôles
  const roleDetails = {
    decision: {
      title: 'Fonction Décision',
      description: 'Responsabilité globale de l\'opération',
      icon: <Shield size={20} />,
      color: 'blue'
    },
    piloting: {
      title: 'Fonction Pilotage',
      description: 'Pilotage de la cellule de crise',
      icon: <User size={20} />,
      color: 'indigo'
    },
    medical: {
      title: 'Organisation Médicale',
      description: 'Pilotage de l\'organisation médicale',
      icon: <User size={20} />,
      color: 'green'
    },
    paramedical: {
      title: 'Organisation Paramédicale',
      description: 'Pilotage de l\'organisation paramédicale',
      icon: <UserPlus size={20} />,
      color: 'teal'
    },
    communication: {
      title: 'Communication',
      description: 'Communication interne et externe',
      icon: <MessageSquare size={20} />,
      color: 'amber'
    },
    support: {
      title: 'Support',
      description: 'Support logistique et sécurité',
      icon: <Package size={20} />,
      color: 'purple'
    },
    secretary: {
      title: 'Secrétariat',
      description: 'Tenue du secrétariat de crise',
      icon: <FileText size={20} />,
      color: 'gray'
    },
    zone: {
      title: 'Référent Zone',
      description: 'Représentation locale sur zone',
      icon: <Shield size={20} />,
      color: 'red'
    }
  };

  // Contenu des fiches actions par rôle (basé sur le guide)
  const actionContent = {
    decision: [
      {
        id: 'decision-phase1',
        title: 'TEMPS 1: Armement de la cellule de crise',
        steps: [
          { id: 'decision-1-1', text: 'Être en appui du pilote de la cellule de crise', phase: 'escalation' },
          { id: 'decision-1-2', text: 'Superviser les premières actions du pilote', phase: 'escalation' }
        ]
      },
      {
        id: 'decision-phase2',
        title: 'TEMPS 2: Conduite de crise',
        steps: [
          { id: 'decision-2-1', text: 'Superviser le pilotage de la cellule en lien avec le pilote', phase: 'management' },
          { id: 'decision-2-2', text: 'Valider le diagnostic de la situation', phase: 'management' },
          { id: 'decision-2-3', text: 'Valider la gradation de la réponse', phase: 'management' },
          { id: 'decision-2-4', text: 'Faire le lien avec les autorités', phase: 'management' },
          { id: 'decision-2-5', text: 'Définir les points de situation', phase: 'management' },
          { id: 'decision-2-6', text: 'Définir la stratégie de communication', phase: 'management' }
        ]
      },
      {
        id: 'decision-phase3',
        title: 'TEMPS 3: Sortie de crise',
        steps: [
          { id: 'decision-3-1', text: 'Décider de la levée du Plan de gestion de crise', phase: 'resolution' },
          { id: 'decision-3-2', text: 'Vérifier l\'opérationnalité de l\'application', phase: 'resolution' },
          { id: 'decision-3-3', text: 'Vérifier l\'effectivité du retour à la normale', phase: 'resolution' }
        ]
      }
    ],
    piloting: [
      {
        id: 'piloting-phase1',
        title: 'TEMPS 1: Armement de la cellule de crise',
        steps: [
          { id: 'piloting-1-1', text: 'Désigner une personne pour les rappels des absents', phase: 'escalation' },
          { id: 'piloting-1-2', text: 'Identifier les rôles et responsabilités', phase: 'escalation' },
          { id: 'piloting-1-3', text: 'Distribuer les fiches Actions', phase: 'escalation' },
          { id: 'piloting-1-4', text: 'Désigner un responsable de traçabilité', phase: 'escalation' },
          { id: 'piloting-1-5', text: 'Installer les équipements et outils', phase: 'escalation' },
          { id: 'piloting-1-6', text: 'Désigner un responsable de main courante', phase: 'escalation' }
        ]
      },
      {
        id: 'piloting-phase2',
        title: 'TEMPS 2: Conduite de crise',
        steps: [
          { id: 'piloting-2-1', text: 'Coordonner la cellule de crise', phase: 'management' },
          { id: 'piloting-2-2', text: 'Définir le rythme de fonctionnement', phase: 'management' },
          { id: 'piloting-2-3', text: 'Synthétiser les actions sur un tableau de bord', phase: 'management' },
          { id: 'piloting-2-4', text: 'S\'assurer de l\'application des fiches Actions', phase: 'management' },
          { id: 'piloting-2-5', text: 'Formaliser les protocoles si besoin', phase: 'management' }
        ]
      },
      {
        id: 'piloting-phase3',
        title: 'TEMPS 3: Sortie de crise',
        steps: [
          { id: 'piloting-3-1', text: 'Coordonner la levée du plan de gestion de crise', phase: 'resolution' }
        ]
      }
    ],
    medical: [
      {
        id: 'medical-phase1',
        title: 'Actions d\'organisation médicale',
        steps: [
          { id: 'medical-1-1', text: 'Vérifier la transmission de l\'alerte aux professionnels médicaux', phase: 'alert' },
          { id: 'medical-1-2', text: 'Désigner les rôles dans la coordination médicale', phase: 'escalation' },
          { id: 'medical-1-3', text: 'Définir la stratégie de prise en charge', phase: 'management' },
          { id: 'medical-1-4', text: 'Désigner une personne pour le suivi des recommandations', phase: 'management' },
          { id: 'medical-1-5', text: 'Liaison avec les référents médicaux externes', phase: 'management' },
          { id: 'medical-1-6', text: 'Identifier les besoins en santé', phase: 'management' },
          { id: 'medical-1-7', text: 'Superviser le rappel des professionnels médicaux', phase: 'management' },
          { id: 'medical-1-8', text: 'Prévoir des actions d\'aller-vers', phase: 'management' },
          { id: 'medical-1-9', text: 'S\'assurer de la transmission de la levée du plan', phase: 'resolution' }
        ]
      }
    ],
    paramedical: [
      {
        id: 'paramedical-phase1',
        title: 'Actions d\'organisation paramédicale',
        steps: [
          { id: 'paramedical-1-1', text: 'Vérifier la transmission de l\'alerte aux professionnels paramédicaux', phase: 'alert' },
          { id: 'paramedical-1-2', text: 'Désigner les rôles dans la coordination paramédicale', phase: 'escalation' },
          { id: 'paramedical-1-3', text: 'Points de situation sur les effectifs et matériels', phase: 'management' },
          { id: 'paramedical-1-4', text: 'Participation à la stratégie de prise en charge', phase: 'management' },
          { id: 'paramedical-1-5', text: 'Suivi des stocks matériels', phase: 'management' },
          { id: 'paramedical-1-6', text: 'Évaluer le nombre de professionnels mobilisables', phase: 'management' },
          { id: 'paramedical-1-7', text: 'Liaison avec les référents paramédicaux externes', phase: 'management' },
          { id: 'paramedical-1-8', text: 'Superviser le rappel des professionnels paramédicaux', phase: 'management' },
          { id: 'paramedical-1-9', text: 'S\'assurer de la transmission de la levée du plan', phase: 'resolution' }
        ]
      }
    ],
    communication: [
      {
        id: 'communication-phase1',
        title: 'Actions de communication',
        steps: [
          { id: 'communication-1-1', text: 'Rédiger des supports de communication interne et externe', phase: 'management' },
          { id: 'communication-1-2', text: 'Organiser des points de presse si nécessaire', phase: 'management' },
          { id: 'communication-1-3', text: 'Faire le reporting des communications externes', phase: 'management' },
          { id: 'communication-1-4', text: 'Identifier un porte-parole', phase: 'management' }
        ]
      }
    ],
    support: [
      {
        id: 'support-phase1',
        title: 'Actions de support',
        steps: [
          { id: 'support-1-1', text: 'Identifier et recenser les besoins en matériel', phase: 'management' },
          { id: 'support-1-2', text: 'Organiser la distribution des stocks', phase: 'management' },
          { id: 'support-1-3', text: 'Contacter les prestataires et personnes ressources', phase: 'management' },
          { id: 'support-1-4', text: 'Sécuriser les installations dédiées', phase: 'management' },
          { id: 'support-1-5', text: 'Identifier des responsables d\'infrastructures', phase: 'management' }
        ]
      }
    ],
    secretary: [
      {
        id: 'secretary-phase1',
        title: 'Actions de secrétariat',
        steps: [
          { id: 'secretary-1-1', text: 'Réception des appels et courriels', phase: 'management' },
          { id: 'secretary-1-2', text: 'Tenue de la main courante', phase: 'management' },
          { id: 'secretary-1-3', text: 'Rédaction des points de situations', phase: 'management' },
          { id: 'secretary-1-4', text: 'Suivi des transmissions de documents', phase: 'management' },
          { id: 'secretary-1-5', text: 'Rédaction des documents de suivi', phase: 'management' },
          { id: 'secretary-1-6', text: 'Remplissage des tableaux de bord', phase: 'management' },
          { id: 'secretary-1-7', text: 'Formalisation des CR de réunions', phase: 'management' }
        ]
      }
    ],
    zone: [
      {
        id: 'zone-phase1',
        title: 'Actions du référent de zone',
        steps: [
          { id: 'zone-1-1', text: 'Mobiliser les PSL de la zone', phase: 'management' },
          { id: 'zone-1-2', text: 'Identifier et recenser les besoins matériels', phase: 'management' },
          { id: 'zone-1-3', text: 'Faire le lien avec la cellule de crise', phase: 'management' },
          { id: 'zone-1-4', text: 'Faire des points réguliers', phase: 'management' },
          { id: 'zone-1-5', text: 'Décliner la stratégie sur le territoire', phase: 'management' }
        ]
      }
    ]
  };

  // Vérifie si une étape est cochée
  const isStepCompleted = (stepId: string) => {
    return actionSteps.includes(stepId);
  };

  // Vérifie si une étape correspond à la phase actuelle
  const isStepRelevantForCurrentPhase = (phase: string) => {
    return (
      (phase === 'alert' && crisisPhase === 'alert') ||
      (phase === 'escalation' && crisisPhase === 'escalation') ||
      (phase === 'management' && crisisPhase === 'management') ||
      (phase === 'resolution' && crisisPhase === 'resolution')
    );
  };

  // Calcule le pourcentage de progression
  const calculateProgress = () => {
    const relevantContent = actionContent[role];
    let totalRelevantSteps = 0;
    let completedRelevantSteps = 0;
    
    relevantContent.forEach(section => {
      section.steps.forEach(step => {
        if (isStepRelevantForCurrentPhase(step.phase)) {
          totalRelevantSteps++;
          if (isStepCompleted(step.id)) {
            completedRelevantSteps++;
          }
        }
      });
    });
    
    return totalRelevantSteps > 0 ? Math.round((completedRelevantSteps / totalRelevantSteps) * 100) : 0;
  };

  // Gère le clic sur une étape
  const handleStepClick = (stepId: string) => {
    completeActionStep(stepId, !isStepCompleted(stepId));
  };

  // Style du texte en fonction du rôle
  const getRoleTextColor = () => {
    switch(roleDetails[role].color) {
      case 'blue': return 'text-blue-600';
      case 'indigo': return 'text-indigo-600';
      case 'green': return 'text-green-600';
      case 'teal': return 'text-teal-600';
      case 'amber': return 'text-amber-600';
      case 'purple': return 'text-purple-600';
      case 'red': return 'text-red-600';
      case 'gray': return 'text-gray-600';
      default: return 'text-blue-600';
    }
  };

  // Style du fond en fonction du rôle
  const getRoleBgColor = () => {
    switch(roleDetails[role].color) {
      case 'blue': return 'bg-blue-50';
      case 'indigo': return 'bg-indigo-50';
      case 'green': return 'bg-green-50';
      case 'teal': return 'bg-teal-50';
      case 'amber': return 'bg-amber-50';
      case 'purple': return 'bg-purple-50';
      case 'red': return 'bg-red-50';
      case 'gray': return 'bg-gray-50';
      default: return 'bg-blue-50';
    }
  };

  return (
    <div className="border rounded-lg border-gray-300">
      <div className={`p-4 flex justify-between items-center ${getRoleBgColor()}`}>
        <div className="flex items-center">
          <div className={`p-2 rounded-full mr-3 ${getRoleBgColor()}`}>
            {roleDetails[role].icon}
          </div>
          <div>
            <h3 className="font-medium text-gray-800">
              {roleDetails[role].title}
            </h3>
            <p className="text-sm text-gray-600">{roleDetails[role].description}</p>
            <div className="flex items-center mt-1">
              <div className="w-24 h-2 bg-gray-200 rounded-full mr-2 overflow-hidden">
                <div
                  className={`h-full ${getRoleTextColor().replace('text-', 'bg-')}`}
                  style={{ width: `${calculateProgress()}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-500">{calculateProgress()}% terminé</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
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
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        {actionContent[role].map(section => (
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
              <div className="pl-4 mt-2">
                {section.steps.map(step => (
                  <div
                    key={step.id}
                    className={`flex items-start p-2 rounded ${
                      isStepRelevantForCurrentPhase(step.phase) 
                        ? 'bg-white hover:bg-gray-50' 
                        : 'bg-gray-50 opacity-60'
                    } mb-2`}
                  >
                    <button
                      onClick={() => handleStepClick(step.id)}
                      disabled={!isStepRelevantForCurrentPhase(step.phase)}
                      className={`flex-shrink-0 w-5 h-5 rounded border ${
                        isStepCompleted(step.id)
                          ? getRoleTextColor().replace('text-', 'bg-') + ' border-' + roleDetails[role].color
                          : 'border-gray-300'
                      } flex items-center justify-center mr-3 mt-0.5`}
                    >
                      {isStepCompleted(step.id) && (
                        <CheckCircle size={14} className="text-white" />
                      )}
                    </button>
                    <div className="flex-1">
                      <span className={
                        isStepCompleted(step.id) 
                          ? 'text-gray-500 line-through' 
                          : isStepRelevantForCurrentPhase(step.phase)
                            ? 'text-gray-800'
                            : 'text-gray-500'
                      }>
                        {step.text}
                      </span>
                      {/* Badge de phase */}
                      <div className="mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          step.phase === 'alert' ? 'bg-blue-100 text-blue-700' :
                          step.phase === 'escalation' ? 'bg-amber-100 text-amber-700' :
                          step.phase === 'management' ? 'bg-red-100 text-red-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          Phase: {
                            step.phase === 'alert' ? 'Alerte' :
                            step.phase === 'escalation' ? 'Montée en puissance' :
                            step.phase === 'management' ? 'Conduite' :
                            'Résolution'
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionSheets;