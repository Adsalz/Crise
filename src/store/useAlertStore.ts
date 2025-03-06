import { create } from 'zustand';

export type AlertLevel = 'normal' | 'warning' | 'critical';
export type EventType = 'pandemic' | 'trauma' | 'climate' | 'other';
export type CrisisFunction = string; // Ajouté pour la compatibilité avec NewTeamMemberModal

export type RiskType = 'natural' | 'health' | 'technological' | 'transport' | 'daily';
export type ResourceType = 'medical' | 'paramedical' | 'facility' | 'equipment';
export type RiskLevel = 'low' | 'medium' | 'high';
export type ResourceStatus = 'available' | 'limited' | 'unavailable';

export interface Position {
  x: number;
  y: number;
}

export interface Risk {
  id: number;
  type: RiskType;
  name: string;
  position: Position;
  description: string;
  level: RiskLevel;
}

export interface Resource {
  id: number;
  type: ResourceType;
  name: string;
  position: Position;
  description: string;
  availability: ResourceStatus;
}

// Ajoutons l'interface TeamMember pour CrisisTeamManager
export interface TeamMember {
  id: number;
  name: string;
  role: string;
  function?: string;
  contact?: string;
  email?: string;
  present: boolean;
}

interface AlertState {
  // État de l'alerte
  alertLevel: AlertLevel;
  activeCrisis: boolean;
  lastUpdate: string;
  crisisPhase: 'alert' | 'escalation' | 'management' | 'resolution';
  reflexActions: number[];
  actionSteps: number[];
  
  // Structures liées à l'écosystème CPTS
  territory: {
    risks: Risk[];
    resources: Resource[];
    // Autres propriétés de territory si nécessaires
  };
  
  alerts: {
    id: number;
    level: 'info' | 'warning';
    message: string;
    time: string;
  }[];
  
  resources: {
    medical: { available: number; total: number };
    paramedical: { available: number; total: number };
    facilities: { available: number; total: number };
    equipment: { status: string };
  };
  
  events: {
    id: number;
    title: string;
    date: string;
    type: 'training' | 'exercise' | 'maintenance';
  }[];
  
  crisisTeamMembers: TeamMember[];
  
  // Actions
  setAlertLevel: (level: AlertLevel) => void;
  activateCrisis: (active: boolean) => void;
  updateLastUpdate: () => void;
  addAlert: (alert: { level: 'info' | 'warning'; message: string; time: string }) => void;
  removeAlert: (id: number) => void;
  updateResource: (type: keyof AlertState['resources'], data: Partial<AlertState['resources'][keyof AlertState['resources']]>) => void;
  addEvent: (event: { title: string; date: string; type: 'training' | 'exercise' | 'maintenance' }) => void;
  removeEvent: (id: number) => void;
  addCrisisTeamMember: (member: Omit<TeamMember, 'id'>) => void;
  updateCrisisTeamMember: (id: number, data: Partial<TeamMember>) => void;
  removeCrisisTeamMember: (id: number) => void;
  setPhase: (phase: 'alert' | 'escalation' | 'management' | 'resolution') => void;
  completeReflexAction: (actionId: number, completed: boolean) => void;
  completeActionStep: (stepId: number, completed: boolean) => void;
  addRisk: (risk: Omit<Risk, 'id'>) => void;
  addResource: (resource: Omit<Resource, 'id'>) => void;
}

export const useAlertStore = create<AlertState>((set) => ({
  // État initial
  alertLevel: 'normal',
  activeCrisis: false,
  lastUpdate: "01/03/2025 10:32",
  crisisPhase: 'alert',
  reflexActions: [],
  actionSteps: [],
  
  // Cartographie
  territory: {
    risks: [
      { 
        id: 1, 
        type: 'health', 
        name: 'Cluster COVID-19', 
        position: { x: 30, y: 40 }, 
        description: 'Cluster identifié dans un EHPAD', 
        level: 'high' 
      },
      { 
        id: 2, 
        type: 'natural', 
        name: 'Zone inondable', 
        position: { x: 70, y: 60 }, 
        description: 'Zone à risque d\'inondation', 
        level: 'medium' 
      }
    ],
    resources: [
      { 
        id: 1, 
        type: 'medical', 
        name: 'Centre médical', 
        position: { x: 40, y: 30 }, 
        description: 'Centre médical principal', 
        availability: 'available' 
      },
      { 
        id: 2, 
        type: 'paramedical', 
        name: 'Cabinet infirmier', 
        position: { x: 60, y: 50 }, 
        description: 'Cabinet de soins infirmiers', 
        availability: 'limited' 
      }
    ]
  },
  
  alerts: [
    { id: 1, level: 'info', message: 'Mise à jour du plan de crise validée', time: '09:45' },
    { id: 2, level: 'warning', message: 'Épidémie de grippe - Vigilance renforcée', time: '28/02' },
    { id: 3, level: 'info', message: 'Exercice de simulation planifié pour le 15/03', time: '27/02' }
  ],
  
  resources: {
    medical: { available: 28, total: 32 },
    paramedical: { available: 45, total: 52 },
    facilities: { available: 4, total: 5 },
    equipment: { status: 'normal' }
  },
  
  events: [
    { id: 1, title: 'Formation RETEX', date: '05/03/2025', type: 'training' },
    { id: 2, title: 'Simulation de crise', date: '15/03/2025', type: 'exercise' },
    { id: 3, title: 'Mise à jour annuaire', date: '20/03/2025', type: 'maintenance' }
  ],
  
  crisisTeamMembers: [
    { id: 1, name: 'Dr. Martin Dupont', role: 'Fonction Décision', present: true }
  ],
  
  // Actions
  setAlertLevel: (level) => set(() => {
    // Mettre à jour la date de dernière mise à jour
    const now = new Date();
    const formattedDate = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    // Ajouter une alerte en fonction du niveau
    const alertMessage = level === 'normal' 
      ? 'Niveau d\'alerte défini sur Veille' 
      : level === 'warning' 
        ? 'Niveau d\'alerte défini sur Pré-alerte' 
        : 'ALERTE CRITIQUE ACTIVÉE';
        
    const newAlert = {
      id: Date.now(),
      level: level === 'critical' ? 'warning' as const : 'info' as const,
      message: alertMessage,
      time: `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
    };
    
    return { 
      alertLevel: level,
      lastUpdate: formattedDate,
      alerts: [newAlert, ...useAlertStore.getState().alerts].slice(0, 10) // Garder les 10 dernières alertes
    };
  }),
  
  activateCrisis: (active) => set(() => ({ activeCrisis: active })),
  
  updateLastUpdate: () => set(() => {
    const now = new Date();
    return { 
      lastUpdate: `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
    };
  }),
  
  addAlert: (alert) => set((state) => ({
    alerts: [{ id: Date.now(), ...alert }, ...state.alerts].slice(0, 10) // Garder les 10 dernières alertes
  })),
  
  removeAlert: (id) => set((state) => ({
    alerts: state.alerts.filter(alert => alert.id !== id)
  })),
  
  updateResource: (type, data) => set((state) => ({
    resources: {
      ...state.resources,
      [type]: { ...state.resources[type as keyof typeof state.resources], ...data }
    }
  })),
  
  addEvent: (event) => set((state) => ({
    events: [...state.events, { id: Date.now(), ...event }]
  })),
  
  removeEvent: (id) => set((state) => ({
    events: state.events.filter(event => event.id !== id)
  })),
  
  addCrisisTeamMember: (member) => set((state) => ({
    crisisTeamMembers: [...state.crisisTeamMembers, { id: Date.now(), ...member }]
  })),
  
  updateCrisisTeamMember: (id, data) => set((state) => ({
    crisisTeamMembers: state.crisisTeamMembers.map(member => 
      member.id === id ? { ...member, ...data } : member
    )
  })),
  
  removeCrisisTeamMember: (id) => set((state) => ({
    crisisTeamMembers: state.crisisTeamMembers.filter(member => member.id !== id)
  })),
  
  // Gestion des phases de crise
  setPhase: (phase) => set(() => ({ crisisPhase: phase })),
  
  // Gestion des fiches réflexes et actions
  completeReflexAction: (actionId, completed) => set((state) => {
    if (completed && !state.reflexActions.includes(actionId)) {
      return { reflexActions: [...state.reflexActions, actionId] };
    } else if (!completed && state.reflexActions.includes(actionId)) {
      return { reflexActions: state.reflexActions.filter(id => id !== actionId) };
    }
    return {};
  }),
  
  completeActionStep: (stepId, completed) => set((state) => {
    if (completed && !state.actionSteps.includes(stepId)) {
      return { actionSteps: [...state.actionSteps, stepId] };
    } else if (!completed && state.actionSteps.includes(stepId)) {
      return { actionSteps: state.actionSteps.filter(id => id !== stepId) };
    }
    return {};
  }),
  
  // Gestion de la cartographie
  addRisk: (risk) => set((state) => ({
    territory: {
      ...state.territory,
      risks: [...state.territory.risks, { id: Date.now(), ...risk }]
    }
  })),
  
  addResource: (resource) => set((state) => ({
    territory: {
      ...state.territory,
      resources: [...state.territory.resources, { id: Date.now(), ...resource }]
    }
  }))
}));
