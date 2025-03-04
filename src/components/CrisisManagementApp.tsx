import React, { useState } from 'react';
import { 
  Bell, UserPlus, Shield, Activity, FileText, 
  Map, Calendar, CheckSquare, AlertTriangle, 
  Clock, Users, Package, Phone, MessageSquare, 
  ArrowUpRight, Menu, X, Plus
} from 'lucide-react';
import { Cloud, Flag } from './icons/CustomIcons';
import NavItem from './NavItem';
import MobileNavItem from './MobileNavItem';
import StatusCard from './StatusCard';
import QuickAccessButton from './QuickAccessButton';
import AlertLevelCard from './AlertLevelCard';
import EventTypeButton from './EventTypeButton';
import { useAlertStore, AlertLevel } from '../store/useAlertStore';
import NewEventModal from './modals/NewEventModal';
import NewAlertModal from './modals/NewAlertModal';
import NewTeamMemberModal from './modals/NewTeamMemberModal';

const CrisisManagementApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [showNewAlertModal, setShowNewAlertModal] = useState(false);
  const [showNewTeamMemberModal, setShowNewTeamMemberModal] = useState(false);
  const [newEventData, setNewEventData] = useState({
    title: '',
    date: '',
    type: 'training' as 'training' | 'exercise' | 'maintenance'
  });
  const [newAlertData, setNewAlertData] = useState({
    message: '',
    level: 'info' as 'info' | 'warning'
  });
  const [newTeamMemberData, setNewTeamMemberData] = useState({
    name: '',
    role: ''
  });

  // Utilisation du store Zustand
  const { 
    alertLevel, 
    activeCrisis, 
    lastUpdate, 
    alerts, 
    resources, 
    events, 
    crisisTeamMembers,
    setAlertLevel,
    activateCrisis,
    updateLastUpdate,
    addAlert,
    addEvent,
    addCrisisTeamMember
  } = useAlertStore();

  const handleAlertLevelChange = (level: AlertLevel) => {
    setAlertLevel(level);
  };

  const handleAddEvent = () => {
    if (newEventData.title && newEventData.date) {
      addEvent(newEventData);
      setNewEventData({
        title: '',
        date: '',
        type: 'training'
      });
      setShowNewEventModal(false);
    }
  };

  const handleAddAlert = () => {
    if (newAlertData.message) {
      const now = new Date();
      const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      addAlert({
        level: newAlertData.level,
        message: newAlertData.message,
        time
      });
      
      setNewAlertData({
        message: '',
        level: 'info'
      });
      
      setShowNewAlertModal(false);
    }
  };

  const handleAddTeamMember = () => {
    if (newTeamMemberData.name && newTeamMemberData.role) {
      addCrisisTeamMember({
        ...newTeamMemberData,
        present: true
      });
      
      setNewTeamMemberData({
        name: '',
        role: ''
      });
      
      setShowNewTeamMemberModal(false);
    }
  };

  const renderDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatusCard
        title="État du système"
        status={activeCrisis ? "active" : "standby"}
        icon={<Shield size={24} className="text-blue-600" />}
        details={`Dernière mise à jour: ${lastUpdate}`}
      />
      
      <StatusCard
        title="Personnel médical"
        status={resources.medical.available > resources.medical.total * 0.8 ? "normal" : "warning"}
        icon={<Users size={24} className="text-blue-600" />}
        details={`${resources.medical.available}/${resources.medical.total} disponibles`}
      />
      
      <StatusCard
        title="Personnel paramédical"
        status={resources.paramedical.available > resources.paramedical.total * 0.8 ? "normal" : "warning"}
        icon={<UserPlus size={24} className="text-blue-600" />}
        details={`${resources.paramedical.available}/${resources.paramedical.total} disponibles`}
      />
      
      <div className="bg-white rounded-lg shadow p-4 col-span-1 md:col-span-2 lg:col-span-3">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg text-gray-800">Alertes récentes</h3>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setShowNewAlertModal(true)}
              className="text-blue-600 text-sm flex items-center bg-blue-50 px-3 py-1 rounded-full"
            >
              <Plus size={16} className="mr-1" /> Ajouter
            </button>
            <button className="text-blue-600 text-sm flex items-center">
              Voir toutes <ArrowUpRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
        <div className="space-y-3">
          {alerts.map(alert => (
            <div key={alert.id} className="flex items-start p-3 border-l-4 bg-gray-50 rounded-r-md" 
                 style={{ borderColor: alert.level === 'warning' ? '#f59e0b' : '#3b82f6' }}>
              <div className={`rounded-full p-1 mr-3 ${alert.level === 'warning' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                {alert.level === 'warning' ? <AlertTriangle size={18} /> : <Bell size={18} />}
              </div>
              <div className="flex-1">
                <p className="text-gray-800 text-sm">{alert.message}</p>
                <p className="text-gray-500 text-xs">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4 col-span-1 md:col-span-2">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg text-gray-800">Événements à venir</h3>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setShowNewEventModal(true)}
              className="text-blue-600 text-sm flex items-center bg-blue-50 px-3 py-1 rounded-full"
            >
              <Plus size={16} className="mr-1" /> Ajouter
            </button>
            <button className="text-blue-600 text-sm flex items-center">
              Calendrier <Calendar size={16} className="ml-1" />
            </button>
          </div>
        </div>
        <div className="space-y-3">
          {events.map(event => (
            <div key={event.id} className="flex items-center p-3 bg-gray-50 rounded-md">
              <div className="rounded-full p-2 mr-3 bg-blue-100 text-blue-600">
                {event.type === 'training' ? <FileText size={18} /> : 
                 event.type === 'exercise' ? <Activity size={18} /> : <CheckSquare size={18} />}
              </div>
              <div className="flex-1">
                <p className="text-gray-800 text-sm font-medium">{event.title}</p>
                <p className="text-gray-500 text-xs">{event.date}</p>
              </div>
              <button className="text-blue-600 text-sm bg-blue-50 px-3 py-1 rounded-full">Détails</button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-4">Accès rapides</h3>
        <div className="grid grid-cols-2 gap-3">
          <QuickAccessButton 
            icon={<FileText size={20} />} 
            title="Plans" 
            subtitle="Consultez et modifiez" 
          />
          <QuickAccessButton 
            icon={<Users size={20} />} 
            title="Annuaires" 
            subtitle="Personnel et partenaires" 
          />
          <QuickAccessButton 
            icon={<Map size={20} />} 
            title="Cartographie" 
            subtitle="Risques et ressources" 
          />
          <QuickAccessButton 
            icon={<Activity size={20} />} 
            title="Exercices" 
            subtitle="Planification et RETEX" 
          />
        </div>
      </div>
    </div>
  );

  const renderCrisisActivation = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Activation du plan de crise</h2>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Niveau d'alerte</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AlertLevelCard 
            level="normal"
            title="Veille sanitaire"
            description="Surveillance renforcée, pas d'action spécifique requise"
            isActive={alertLevel === 'normal'}
            onClick={() => handleAlertLevelChange('normal')}
          />
          <AlertLevelCard 
            level="warning"
            title="Pré-alerte"
            description="Mobilisation de la cellule restreinte, mise en alerte des équipes"
            isActive={alertLevel === 'warning'}
            onClick={() => handleAlertLevelChange('warning')}
          />
          <AlertLevelCard 
            level="critical"
            title="Crise sanitaire"
            description="Déclenchement complet du plan, mobilisation générale"
            isActive={alertLevel === 'critical'}
            onClick={() => handleAlertLevelChange('critical')}
          />
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Type d'événement</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <EventTypeButton 
            title="Épidémie/Pandémie" 
            icon={<Activity size={20} />} 
          />
          <EventTypeButton 
            title="Événement traumatique" 
            icon={<AlertTriangle size={20} />} 
          />
          <EventTypeButton 
            title="Risque climatique" 
            icon={<Cloud size={20} />} 
          />
          <EventTypeButton 
            title="Autre événement" 
            icon={<Flag size={20} />} 
          />
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-8">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold text-gray-700">Composition de la cellule de crise</h3>
          <button 
            onClick={() => setShowNewTeamMemberModal(true)}
            className="text-blue-600 text-sm flex items-center bg-blue-50 px-3 py-1 rounded-full"
          >
            <Plus size={16} className="mr-1" /> Ajouter
          </button>
        </div>
        <div className="space-y-2">
          {crisisTeamMembers.map(member => (
            <div key={member.id} className="flex justify-between items-center p-2 bg-white rounded border border-gray-200">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                  <Shield size={20} />
                </div>
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 rounded-full bg-blue-50 text-blue-600">
                  <Phone size={16} />
                </button>
                <button className="p-2 rounded-full bg-blue-50 text-blue-600">
                  <MessageSquare size={16} />
                </button>
              </div>
            </div>
          ))}
          
          {crisisTeamMembers.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              Aucun membre ajouté à la cellule de crise.
            </div>
          )}
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
        <button 
          onClick={() => {
            activateCrisis(!activeCrisis);
            updateLastUpdate();
            addAlert({
              level: 'warning',
              message: activeCrisis ? 'Plan de crise désactivé' : 'PLAN DE CRISE ACTIVÉ',
              time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
            });
          }}
          className={`px-6 py-3 ${activeCrisis ? 'bg-amber-600' : 'bg-blue-600'} text-white rounded-lg font-medium flex items-center justify-center`}
        >
          <AlertTriangle size={18} className="mr-2" /> 
          {activeCrisis ? 'Désactiver le plan' : 'Activer le plan'}
        </button>
        <button className="px-6 py-3 bg-white border border-blue-600 text-blue-600 rounded-lg font-medium flex items-center justify-center">
          Simuler un exercice
        </button>
        <button className="px-6 py-3 bg-white border border-gray-300 text-gray-600 rounded-lg font-medium ml-auto flex items-center justify-center">
          Annuler
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Modals */}
      <NewEventModal 
        show={showNewEventModal}
        onClose={() => setShowNewEventModal(false)}
        eventData={newEventData}
        setEventData={setNewEventData}
        onSave={handleAddEvent}
      />
      
      <NewAlertModal 
        show={showNewAlertModal}
        onClose={() => setShowNewAlertModal(false)}
        alertData={newAlertData}
        setAlertData={setNewAlertData}
        onSave={handleAddAlert}
      />
      
      <NewTeamMemberModal 
        show={showNewTeamMemberModal}
        onClose={() => setShowNewTeamMemberModal(false)}
        teamMemberData={newTeamMemberData}
        setTeamMemberData={setNewTeamMemberData}
        onSave={handleAddTeamMember}
      />
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-600 text-white p-2 rounded">
              <Shield size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">CrisisMed</h1>
              <p className="text-xs text-gray-500">CPTS Méditerranée</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <div className={`px-3 py-1 rounded-full text-sm flex items-center ${
              alertLevel === 'normal' 
                ? 'bg-green-100 text-green-800' 
                : alertLevel === 'warning'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-red-100 text-red-800'
            }`}>
              <div className={`h-2 w-2 rounded-full mr-2 ${
                alertLevel === 'normal' 
                  ? 'bg-green-500' 
                  : alertLevel === 'warning'
                    ? 'bg-amber-500'
                    : 'bg-red-500'
              }`}></div>
              {alertLevel === 'normal' 
                ? 'Veille' 
                : alertLevel === 'warning'
                  ? 'Pré-Alerte'
                  : 'Crise'
              }
            </div>
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-sm font-medium">AD</span>
            </div>
          </div>
          <button className="md:hidden" onClick={() => setShowMobileMenu(!showMobileMenu)}>
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        {/* Sidebar */}
        <aside className="hidden md:flex md:w-64 flex-col bg-white shadow-sm">
          <nav className="flex-1 pt-5 pb-4 space-y-1">
            <NavItem
              icon={<Activity size={20} />}
              title="Tableau de bord"
              isActive={activeTab === 'dashboard'}
              onClick={() => setActiveTab('dashboard')}
            />
            <NavItem
              icon={<AlertTriangle size={20} />}
              title="Activation de crise"
              isActive={activeTab === 'crisis-activation'}
              onClick={() => setActiveTab('crisis-activation')}
            />
            <NavItem
              icon={<Map size={20} />}
              title="Cartographie"
              isActive={activeTab === 'map'}
              onClick={() => setActiveTab('map')}
            />
            <NavItem
              icon={<Users size={20} />}
              title="Annuaires"
              isActive={activeTab === 'directory'}
              onClick={() => setActiveTab('directory')}
            />
            <NavItem
              icon={<Package size={20} />}
              title="Ressources"
              isActive={activeTab === 'resources'}
              onClick={() => setActiveTab('resources')}
            />
            <NavItem
              icon={<MessageSquare size={20} />}
              title="Communication"
              isActive={activeTab === 'communication'}
              onClick={() => setActiveTab('communication')}
            />
            <NavItem
              icon={<FileText size={20} />}
              title="Documents"
              isActive={activeTab === 'documents'}
              onClick={() => setActiveTab('documents')}
            />
            <NavItem
              icon={<CheckSquare size={20} />}
              title="RETEX"
              isActive={activeTab === 'retex'}
              onClick={() => setActiveTab('retex')}
            />
          </nav>
        </aside>

        {/* Mobile menu */}
        {showMobileMenu && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md z-50">
            <nav className="px-4 pt-2 pb-3 space-y-1">
              <MobileNavItem
                title="Tableau de bord"
                isActive={activeTab === 'dashboard'}
                onClick={() => {
                  setActiveTab('dashboard');
                  setShowMobileMenu(false);
                }}
              />
              <MobileNavItem
                title="Activation de crise"
                isActive={activeTab === 'crisis-activation'}
                onClick={() => {
                  setActiveTab('crisis-activation');
                  setShowMobileMenu(false);
                }}
              />
              <MobileNavItem
                title="Cartographie"
                isActive={activeTab === 'map'}
                onClick={() => {
                  setActiveTab('map');
                  setShowMobileMenu(false);
                }}
              />
              <MobileNavItem
                title="Annuaires"
                isActive={activeTab === 'directory'}
                onClick={() => {
                  setActiveTab('directory');
                  setShowMobileMenu(false);
                }}
              />
              <MobileNavItem
                title="Ressources"
                isActive={activeTab === 'resources'}
                onClick={() => {
                  setActiveTab('resources');
                  setShowMobileMenu(false);
                }}
              />
              <MobileNavItem
                title="Communication"
                isActive={activeTab === 'communication'}
                onClick={() => {
                  setActiveTab('communication');
                  setShowMobileMenu(false);
                }}
              />
              <MobileNavItem
                title="Documents"
                isActive={activeTab === 'documents'}
                onClick={() => {
                  setActiveTab('documents');
                  setShowMobileMenu(false);
                }}
              />
              <MobileNavItem
                title="RETEX"
                isActive={activeTab === 'retex'}
                onClick={() => {
                  setActiveTab('retex');
                  setShowMobileMenu(false);
                }}
              />
            </nav>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {activeTab === 'dashboard' && 'Tableau de bord'}
              {activeTab === 'crisis-activation' && 'Activation de crise'}
              {activeTab === 'map' && 'Cartographie des risques et ressources'}
              {activeTab === 'directory' && 'Annuaires'}
              {activeTab === 'resources' && 'Gestion des ressources'}
              {activeTab === 'communication' && 'Communication'}
              {activeTab === 'documents' && 'Documents'}
              {activeTab === 'retex' && 'Retour d\'expérience'}
            </h2>
            <p className="text-gray-600">
              {activeTab === 'dashboard' && 'Aperçu global de la situation'}
              {activeTab === 'crisis-activation' && 'Déclencher et gérer une alerte sanitaire'}
              {activeTab === 'map' && 'Visualisation territoriale des risques et moyens'}
              {activeTab === 'directory' && 'Contacts des professionnels et partenaires'}
              {activeTab === 'resources' && 'Suivi des ressources matérielles et humaines'}
              {activeTab === 'communication' && 'Outils de communication interne et externe'}
              {activeTab === 'documents' && 'Plans, protocoles et guides'}
              {activeTab === 'retex' && 'Analyse post-événement et amélioration continue'}
            </p>
          </div>
          
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'crisis-activation' && renderCrisisActivation()}
          {/* Render other tabs content here */}
        </main>
      </div>
    </div>
  );
};

export default CrisisManagementApp;
