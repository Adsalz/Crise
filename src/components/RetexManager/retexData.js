// Données partagées entre les composants

// Les phases du RETEX selon le guide méthodologique
export const retexPhases = [
    {
      id: "preparation",
      title: "Préparation",
      description: "Définition des objectifs, du périmètre et des acteurs impliqués",
      steps: [
        "Identifier le(s) membre(s) du comité de pilotage en charge de la validation",
        "Désigner un référent RETEX en appui méthodologique",
        "Constituer une équipe RETEX en charge de la mise en œuvre",
        "Définir le périmètre et les objectifs du RETEX",
        "Élaborer les outils de collecte des données"
      ]
    },
    {
      id: "implementation",
      title: "Mise en œuvre et restitution",
      description: "Collecte des données, analyse et restitution des résultats",
      steps: [
        "Collecter les données (entretiens, questionnaires, documents)",
        "Analyser les données et identifier les écarts",
        "Synthétiser les principaux enseignements",
        "Formuler des recommandations",
        "Restituer les résultats aux parties prenantes"
      ]
    },
    {
      id: "followup",
      title: "Suivi et valorisation",
      description: "Mise en œuvre et suivi des actions d'amélioration",
      steps: [
        "Élaborer un plan d'actions correctives",
        "Désigner les responsables pour chaque action",
        "Mettre en œuvre les actions d'amélioration",
        "Assurer le suivi de la mise en œuvre",
        "Actualiser les procédures et le plan de gestion de crise"
      ]
    }
  ];
  
  // Les types d'acteurs du RETEX
  export const retexActors = [
    {
      role: "Membre(s) du comité de pilotage",
      responsibility: "Validation du RETEX"
    },
    {
      role: "Référent RETEX",
      responsibility: "Appui méthodologique"
    },
    {
      role: "Équipe RETEX",
      responsibility: "Mise en œuvre du RETEX"
    }
  ];
  
  // Les typologies de crise sanitaire
  export const crisisTypes = [
    {
      id: "casualties",
      label: "Prise en charge de blessés",
      examples: "Attentats, incendies, explosions, émeutes"
    },
    {
      id: "sickness",
      label: "Prise en charge de malades",
      examples: "Épidémie saisonnière, canicule, grand froid, pollution"
    },
    {
      id: "infectious",
      label: "Agent infectieux émergent",
      examples: "Coronavirus, fièvre hémorragique virale, arboviroses"
    },
    {
      id: "nrc",
      label: "Agent NRC",
      examples: "Accidents nucléaires, radiologiques, chimiques"
    },
    {
      id: "disruption",
      label: "Altération de l'offre de soins",
      examples: "Pénurie de médicaments, difficultés de circulation"
    }
  ];
  
  // Les phases du processus de gestion de crise
  export const crisisPhases = [
    {
      id: "alert",
      title: "Phase 1 - Alerte et réponse immédiate",
      description: "Réception et diffusion de l'alerte, première analyse"
    },
    {
      id: "scaling",
      title: "Phase 2 - Montée en puissance",
      description: "Activation du plan de crise et armement de la cellule de crise"
    },
    {
      id: "management",
      title: "Phase 3 - Conduite de la crise",
      description: "Suivi de la SSE et mise en œuvre de la stratégie de réponse"
    },
    {
      id: "closure",
      title: "Phase 4 - Sortie de crise",
      description: "Retour à la normale et désactivation du dispositif"
    }
  ];
  
  // Fonction utilitaire pour les statuts
  export const getStatusLabel = (status) => {
    switch(status) {
      case 'preparation': return 'Préparation';
      case 'implementation': return 'Mise en œuvre';
      case 'followup': return 'Suivi';
      case 'completed': return 'Terminé';
      case 'planned': return 'Planifié';
      default: return status;
    }
  };
  
  export const getStatusColor = (status) => {
    switch(status) {
      case 'preparation': return 'bg-blue-100 text-blue-800';
      case 'implementation': return 'bg-amber-100 text-amber-800';
      case 'followup': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'planned': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Données fictives des RETEX en cours
  export const ongoingRetexMock = [
    {
      id: 1,
      title: "RETEX Épidémie Grippe 2025",
      date: "15/02/2025",
      status: "preparation",
      progress: 30,
      participants: 12,
      lead: "Dr. Martin Dupont",
      description: "Retour d'expérience sur la gestion de l'épidémie de grippe saisonnière 2025 et son impact sur les soins primaires",
      crisisType: "sickness"
    },
    {
      id: 2,
      title: "RETEX Exercice Canicule",
      date: "08/03/2025",
      status: "implementation",
      progress: 60,
      participants: 8,
      lead: "Dr. Sophie Bernard",
      description: "Analyse de l'exercice de simulation d'une canicule prolongée sur le territoire de la CPTS",
      crisisType: "sickness"
    }
  ];
  
  // Données fictives des RETEX terminés
  export const completedRetexMock = [
    {
      id: 3,
      title: "RETEX COVID-19 Vague 5",
      date: "10/11/2024",
      status: "completed",
      crisisType: "infectious",
      learnings: [
        "Amélioration de la réactivité des soins primaires",
        "Meilleure coordination ville-hôpital",
        "Protocoles de téléconsultation efficaces"
      ],
      improvements: [
        "Mise en place d'un stock stratégique d'EPI",
        "Création d'une procédure d'activation accélérée",
        "Formation élargie aux outils numériques"
      ],
      actions: [
        { 
          name: "Mise à jour des procédures d'alerte", 
          responsible: "Dr. Martin", 
          status: "completed", 
          progress: 100 
        },
        { 
          name: "Formation aux nouveaux protocoles", 
          responsible: "Dr. Bernard", 
          status: "inProgress", 
          progress: 60 
        },
        { 
          name: "Acquisition matériel supplémentaire", 
          responsible: "Mme. Leroy", 
          status: "planned", 
          progress: 0 
        }
      ]
    },
    {
      id: 4,
      title: "RETEX Pénurie médicaments",
      date: "05/01/2025",
      status: "completed",
      crisisType: "disruption",
      learnings: [
        "Nécessité d'un système d'alerte précoce",
        "Importance de la coordination avec les pharmacies",
        "Adaptabilité des prescriptions"
      ],
      improvements: [
        "Création d'un tableau de bord des stocks critiques",
        "Liste de substitutions validée par les médecins de la CPTS",
        "Procédure de communication harmonisée"
      ],
      actions: [
        { 
          name: "Système d'alerte des pénuries", 
          responsible: "Dr. Petit", 
          status: "completed", 
          progress: 100 
        },
        { 
          name: "Coordination avec les pharmacies", 
          responsible: "Mme. Girard", 
          status: "completed", 
          progress: 100 
        }
      ]
    }
  ];
  
  // Données fictives des exercices planifiés
  export const plannedExercisesMock = [
    {
      id: 1,
      title: "Simulation crise NRC",
      date: "12/04/2025",
      status: "planned",
      type: "tabletop",
      crisisType: "nrc",
      scenario: "Accident industriel avec contamination chimique",
      participants: ["Cellule de crise CPTS", "SAMU", "Pompiers", "ARS"],
      testedPhases: ["alert", "scaling", "management"],
      evaluationCriteria: [
        "Temps de réponse à l'alerte",
        "Qualité de l'armement de la cellule",
        "Conformité des procédures avec les fiches réflexes",
        "Coordination avec les partenaires extérieurs"
      ]
    },
    {
      id: 2,
      title: "Exercice multi-victimes",
      date: "25/05/2025",
      status: "planned",
      type: "field",
      crisisType: "casualties",
      scenario: "Accident de bus avec nombreuses victimes",
      participants: ["Cellule de crise CPTS", "Professionnels de santé volontaires", "SAMU", "Hôpitaux locaux"],
      testedPhases: ["alert", "scaling", "management", "closure"],
      evaluationCriteria: [
        "Mobilisation des professionnels de santé",
        "Coordination des parcours de soins",
        "Communication avec les établissements de santé",
        "Traçabilité des actions et décisions"
      ]
    }
  ];