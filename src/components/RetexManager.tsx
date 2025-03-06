import React, { useState } from 'react';
import { 
  CheckCircle, 
  Clock, 
  ArrowRight, 
  Users, 
  FileText, 
  AlertTriangle, 
  BarChart2,
  ChevronDown,
  ChevronUp,
  Download,
  Printer,
  Calendar,
  Edit,
  Plus,
  BookOpen
} from 'lucide-react';

const RetexManager = () => {
  const [activeTab, setActiveTab] = useState('ongoing');
  const [expandedItem, setExpandedItem] = useState(null);
  
  // Données fictives pour la démonstration
  const ongoingRetexMock = [
    {
      id: 1,
      title: "RETEX Épidémie Grippe 2025",
      date: "15/02/2025",
      status: "preparation",
      progress: 30,
      participants: 12,
      lead: "Dr. Martin Dupont",
      description: "Retour d'expérience sur la gestion de l'épidémie de grippe saisonnière 2025 et son impact sur les soins primaires"
    },
    {
      id: 2,
      title: "RETEX Exercice Canicule",
      date: "08/03/2025",
      status: "implementation",
      progress: 60,
      participants: 8,
      lead: "Dr. Sophie Bernard",
      description: "Analyse de l'exercice de simulation d'une canicule prolongée sur le territoire de la CPTS"
    }
  ];
  
  const completedRetexMock = [
    {
      id: 3,
      title: "RETEX COVID-19 Vague 5",
      date: "10/11/2024",
      status: "completed",
      learnings: [
        "Amélioration de la réactivité des soins primaires",
        "Meilleure coordination ville-hôpital",
        "Protocoles de téléconsultation efficaces"
      ],
      improvements: [
        "Mise en place d'un stock stratégique d'EPI",
        "Création d'une procédure d'activation accélérée",
        "Formation élargie aux outils numériques"
      ]
    },
    {
      id: 4,
      title: "RETEX Pénurie médicaments",
      date: "05/01/2025",
      status: "completed",
      learnings: [
        "Nécessité d'un système d'alerte précoce",
        "Importance de la coordination avec les pharmacies",
        "Adaptabilité des prescriptions"
      ],
      improvements: [
        "Création d'un tableau de bord des stocks critiques",
        "Liste de substitutions validée par les médecins de la CPTS",
        "Procédure de communication harmonisée"
      ]
    }
  ];
  
  const plannedExercisesMock = [
    {
      id: 1,
      title: "Simulation crise NRC",
      date: "12/04/2025",
      status: "planned",
      type: "tabletop",
      scenario: "Accident industriel avec contamination chimique",
      participants: ["Cellule de crise CPTS", "SAMU", "Pompiers", "ARS"]
    },
    {
      id: 2,
      title: "Exercice multi-victimes",
      date: "25/05/2025",
      status: "planned",
      type: "field",
      scenario: "Accident de bus avec nombreuses victimes",
      participants: ["Cellule de crise CPTS", "Professionnels de santé volontaires", "SAMU", "Hôpitaux locaux"]
    }
  ];
  
  const retexPhases = [
    {
      id: "preparation",
      title: "Préparation",
      description: "Définition des objectifs, constitution de l'équipe et collecte des données",
      steps: [
        "Désigner un référent RETEX",
        "Constituer l'équipe RETEX",
        "Définir le périmètre et les objectifs",
        "Élaborer les outils de collecte",
        "Planifier les entretiens et réunions"
      ]
    },
    {
      id: "implementation",
      title: "Mise en œuvre et restitution",
      description: "Analyse des données, identification des écarts et présentation des résultats",
      steps: [
        "Conduire les entretiens et questionnaires",
        "Analyser les données collectées",
        "Identifier les écarts et bonnes pratiques",
        "Formuler des recommandations",
        "Présenter les résultats aux parties prenantes"
      ]
    },
    {
      id: "followup",
      title: "Suivi et valorisation",
      description: "Mise en œuvre des actions correctives et partage des enseignements",
      steps: [
        "Élaborer un plan d'action",
        "Désigner des responsables par action",
        "Suivre la mise en œuvre des actions",
        "Communiquer et valoriser les enseignements",
        "Mettre à jour les procédures et protocoles"
      ]
    }
  ];
  
  const getStatusLabel = (status) => {
    switch(status) {
      case 'preparation': return 'Préparation';
      case 'implementation': return 'Mise en œuvre';
      case 'followup': return 'Suivi';
      case 'completed': return 'Terminé';
      case 'planned': return 'Planifié';
      default: return status;
    }
  };
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'preparation': return 'bg-blue-100 text-blue-800';
      case 'implementation': return 'bg-amber-100 text-amber-800';
      case 'followup': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'planned': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Retour d'expérience (RETEX)</h2>
          <p className="text-gray-600">
            Analyse systématique et collective des événements pour identifier ce qui a fonctionné, 
            ce qui n'a pas fonctionné, et comment s'améliorer.
          </p>
        </div>
        
        {/* Méthodologie RETEX */}
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
              {retexPhases.map((phase, index) => (
                <div key={phase.id} className="flex flex-col items-center w-1/3 px-4">
                  <div className="flex items-center mb-2">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center 
                      ${phase.id === 'preparation' ? 'bg-blue-100 text-blue-600' : 
                        phase.id === 'implementation' ? 'bg-amber-100 text-amber-600' : 
                        'bg-purple-100 text-purple-600'}`}>
                      {phase.id === 'preparation' ? <Clock size={20} /> : 
                       phase.id === 'implementation' ? <FileText size={20} /> : 
                       <CheckCircle size={20} />}
                    </div>
                    <ArrowRight size={16} className={`ml-2 text-gray-400 ${index === retexPhases.length - 1 ? 'invisible' : ''}`} />
                  </div>
                  <h4 className="font-medium text-center">{phase.title}</h4>
                  <p className="text-xs text-gray-500 text-center mt-1">{phase.description}</p>
                  
                  <button 
                    onClick={() => setExpandedItem(expandedItem === phase.id ? null : phase.id)}
                    className="mt-2 text-xs text-blue-600 flex items-center"
                  >
                    {expandedItem === phase.id ? 'Masquer' : 'Voir les étapes'}
                    {expandedItem === phase.id ? <ChevronUp size={12} className="ml-1" /> : <ChevronDown size={12} className="ml-1" />}
                  </button>
                  
                  {expandedItem === phase.id && (
                    <div className="mt-2 bg-gray-50 p-3 rounded-lg w-full">
                      <ul className="space-y-1">
                        {phase.steps.map((step, idx) => (
                          <li key={idx} className="text-xs flex items-start">
                            <span className="h-4 w-4 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mr-2 mt-0.5 flex-shrink-0">
                              {idx + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Onglets */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('ongoing')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'ongoing' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              RETEX en cours
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'completed' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              RETEX terminés
            </button>
            <button
              onClick={() => setActiveTab('exercises')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'exercises' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Exercices planifiés
            </button>
          </nav>
        </div>
        
        {/* Contenu des onglets */}
        {activeTab === 'ongoing' && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800">RETEX en cours</h3>
              <button className="flex items-center text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                <Plus size={16} className="mr-1" /> Nouveau RETEX
              </button>
            </div>
            
            <div className="space-y-4">
              {ongoingRetexMock.map((retex) => (
                <div key={retex.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="flex justify-between items-center p-4 bg-gray-50">
                    <div>
                      <h4 className="font-medium">{retex.title}</h4>
                      <div className="flex items-center mt-1">
                        <Calendar size={14} className="text-gray-500 mr-1" />
                        <span className="text-xs text-gray-500">{retex.date}</span>
                        <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${getStatusColor(retex.status)}`}>
                          {getStatusLabel(retex.status)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4">
                        <div className="flex items-center">
                          <div className="w-20 h-2 bg-gray-200 rounded-full mr-2">
                            <div 
                              className="h-full bg-blue-500 rounded-full" 
                              style={{ width: `${retex.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500">{retex.progress}%</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setExpandedItem(expandedItem === `retex-${retex.id}` ? null : `retex-${retex.id}`)}
                        className="p-1 rounded-full hover:bg-gray-200"
                      >
                        {expandedItem === `retex-${retex.id}` ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                    </div>
                  </div>
                  
                  {expandedItem === `retex-${retex.id}` && (
                    <div className="p-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600 mb-4">{retex.description}</p>
                      
                      <div className="flex flex-col md:flex-row md:space-x-4">
                        <div className="flex-1 mb-4 md:mb-0">
                          <h5 className="font-medium text-sm mb-2">Détails</h5>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center mb-2">
                              <Users size={16} className="text-gray-500 mr-2" />
                              <span className="text-sm">{retex.participants} participants</span>
                            </div>
                            <div className="flex items-center">
                              <AlertTriangle size={16} className="text-gray-500 mr-2" />
                              <span className="text-sm">Référent: {retex.lead}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <h5 className="font-medium text-sm mb-2">Prochaines étapes</h5>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <ul className="space-y-2">
                              {retex.status === 'preparation' ? (
                                <>
                                  <li className="text-sm flex items-center">
                                    <CheckCircle size={14} className="text-green-500 mr-2" />
                                    <span>Constitution de l'équipe RETEX</span>
                                  </li>
                                  <li className="text-sm flex items-start">
                                    <div className="h-4 w-4 rounded-full border-2 border-blue-500 mt-0.5 mr-2"></div>
                                    <span>Définition du périmètre et objectifs</span>
                                  </li>
                                  <li className="text-sm flex items-start text-gray-400">
                                    <div className="h-4 w-4 rounded-full border-2 border-gray-300 mt-0.5 mr-2"></div>
                                    <span>Élaboration des outils de collecte</span>
                                  </li>
                                </>
                              ) : (
                                <>
                                  <li className="text-sm flex items-center">
                                    <CheckCircle size={14} className="text-green-500 mr-2" />
                                    <span>Collecte des données terminée</span>
                                  </li>
                                  <li className="text-sm flex items-start">
                                    <div className="h-4 w-4 rounded-full border-2 border-blue-500 mt-0.5 mr-2"></div>
                                    <span>Analyse des écarts et bonnes pratiques</span>
                                  </li>
                                  <li className="text-sm flex items-start text-gray-400">
                                    <div className="h-4 w-4 rounded-full border-2 border-gray-300 mt-0.5 mr-2"></div>
                                    <span>Formulation des recommandations</span>
                                  </li>
                                </>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end mt-4 space-x-2">
                        <button className="px-3 py-1 text-blue-600 border border-blue-600 rounded-md text-sm">
                          Consulter
                        </button>
                        <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">
                          Mettre à jour
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
        
        {activeTab === 'completed' && (
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
              {completedRetexMock.map((retex) => (
                <div key={retex.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="flex justify-between items-center p-4 bg-gray-50">
                    <div>
                      <h4 className="font-medium">{retex.title}</h4>
                      <div className="flex items-center mt-1">
                        <Calendar size={14} className="text-gray-500 mr-1" />
                        <span className="text-xs text-gray-500">{retex.date}</span>
                        <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${getStatusColor(retex.status)}`}>
                          {getStatusLabel(retex.status)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setExpandedItem(expandedItem === `completed-${retex.id}` ? null : `completed-${retex.id}`)}
                      className="p-1 rounded-full hover:bg-gray-200"
                    >
                      {expandedItem === `completed-${retex.id}` ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>
                  
                  {expandedItem === `completed-${retex.id}` && (
                    <div className="p-4 border-t border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-sm mb-2 flex items-center">
                            <CheckCircle size={16} className="text-green-600 mr-1" />
                            Enseignements clés
                          </h5>
                          <ul className="space-y-2 bg-gray-50 p-3 rounded-md">
                            {retex.learnings.map((item, idx) => (
                              <li key={idx} className="text-sm flex items-start">
                                <span className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-800 mr-2 flex-shrink-0">
                                  {idx + 1}
                                </span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h5 className="font-medium text-sm mb-2 flex items-center">
                            <BarChart2 size={16} className="text-blue-600 mr-1" />
                            Améliorations mises en œuvre
                          </h5>
                          <ul className="space-y-2 bg-gray-50 p-3 rounded-md">
                            {retex.improvements.map((item, idx) => (
                              <li key={idx} className="text-sm flex items-start">
                                <span className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 mr-2 flex-shrink-0">
                                  {idx + 1}
                                </span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="flex justify-end mt-4">
                        <button className="px-3 py-1 text-blue-600 bg-blue-50 rounded-md text-sm">
                          Télécharger le rapport complet
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
        
        {activeTab === 'exercises' && (
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
              {plannedExercisesMock.map((exercise) => (
                <div key={exercise.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="flex justify-between items-center p-4 bg-gray-50">
                    <div>
                      <h4 className="font-medium">{exercise.title}</h4>
                      <div className="flex items-center mt-1">
                        <Calendar size={14} className="text-gray-500 mr-1" />
                        <span className="text-xs text-gray-500">{exercise.date}</span>
                        <span className={`ml-2 px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800`}>
                          {exercise.type === 'tabletop' ? 'Exercice sur table' : 'Exercice terrain'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded-md text-sm mr-2">
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => setExpandedItem(expandedItem === `exercise-${exercise.id}` ? null : `exercise-${exercise.id}`)}
                        className="p-1 rounded-full hover:bg-gray-200"
                      >
                        {expandedItem === `exercise-${exercise.id}` ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                    </div>
                  </div>
                  
                  {expandedItem === `exercise-${exercise.id}` && (
                    <div className="p-4 border-t border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-sm mb-2">Scénario</h5>
                          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                            {exercise.scenario}
                          </p>
                        </div>
                        
                        <div>
                          <h5 className="font-medium text-sm mb-2">Participants</h5>
                          <div className="bg-gray-50 p-3 rounded-md">
                            <ul className="space-y-1">
                              {exercise.participants.map((participant, idx) => (
                                <li key={idx} className="text-sm flex items-center">
                                  <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                                  <span>{participant}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end mt-4 space-x-2">
                        <button className="px-3 py-1 text-blue-600 border border-blue-600 rounded-md text-sm">
                          Planning détaillé
                        </button>
                        <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">
                          Préparation RETEX
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RetexManager;