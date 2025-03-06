import { useState } from 'react';
import { 
  Shield, 
  User, 
  UserPlus, 
  MessageSquare, 
  Package, 
  FileText,
  Phone,
  Mail,
  Check,
  X,
  Trash,
  Plus
} from 'lucide-react';
import { useAlertStore, TeamMember } from '../store/useAlertStore';

const CrisisTeamManager = () => {
  const { crisisTeamMembers, addCrisisTeamMember, updateCrisisTeamMember, removeCrisisTeamMember } = useAlertStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    role: '',
    contact: '',
    email: '',
    function: 'decision' // Par défaut
  });

  // Définition des fonctions selon le guide (pages 12-14)
  const functions = [
    { id: 'decision', title: 'Fonction Décision', icon: <Shield size={20} className="text-blue-600" /> },
    { id: 'piloting', title: 'Fonction Pilotage', icon: <User size={20} className="text-indigo-600" /> },
    { id: 'medical', title: 'Organisation Médicale', icon: <User size={20} className="text-green-600" /> },
    { id: 'paramedical', title: 'Organisation Paramédicale', icon: <UserPlus size={20} className="text-teal-600" /> },
    { id: 'communication', title: 'Communication', icon: <MessageSquare size={20} className="text-amber-600" /> },
    { id: 'support', title: 'Support', icon: <Package size={20} className="text-purple-600" /> },
    { id: 'secretary', title: 'Secrétariat', icon: <FileText size={20} className="text-gray-600" /> },
    { id: 'zone', title: 'Référent intraCPTS Zone', icon: <Shield size={20} className="text-red-600" /> }
  ];

  const handleAddMember = () => {
    if (newMember.name && newMember.role) {
      addCrisisTeamMember({
        ...newMember,
        present: true
      });
      setNewMember({
        name: '',
        role: '',
        contact: '',
        email: '',
        function: 'decision'
      });
      setShowAddForm(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Cellule de crise</h2>
          <p className="text-gray-600">
            Gestion des membres de la cellule de crise selon les fonctions définies dans le guide méthodologique.
          </p>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg text-gray-800">Composition de la cellule</h3>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-3 py-1 flex items-center text-sm text-blue-600 bg-blue-50 rounded-full"
          >
            {showAddForm ? <X size={16} className="mr-1" /> : <Plus size={16} className="mr-1" />}
            {showAddForm ? 'Annuler' : 'Ajouter un membre'}
          </button>
        </div>

        {showAddForm && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
            <h4 className="font-medium mb-3">Nouveau membre</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newMember.name}
                  onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profession / Rôle</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newMember.role}
                  onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newMember.contact}
                  onChange={(e) => setNewMember({...newMember, contact: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newMember.email}
                  onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Fonction dans la cellule de crise</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {functions.map(func => (
                    <button
                      key={func.id}
                      className={`p-2 border rounded-md flex items-center ${
                        newMember.function === func.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                      onClick={() => setNewMember({...newMember, function: func.id})}
                    >
                      <div className="mr-2">{func.icon}</div>
                      <span className="text-sm">{func.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleAddMember}
                className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center"
                disabled={!newMember.name || !newMember.role}
              >
                <UserPlus size={18} className="mr-2" />
                Ajouter à la cellule
              </button>
            </div>
          </div>
        )}

        <div className="space-y-1">
          {functions.map(func => {
            const membersWithFunction = crisisTeamMembers.filter(m => m.function === func.id);
            if (membersWithFunction.length === 0) return null;

            return (
              <div key={func.id} className="border border-gray-200 rounded-lg overflow-hidden mb-4">
                <div className="bg-gray-50 px-4 py-3 flex items-center">
                  <div className="mr-2">{func.icon}</div>
                  <h4 className="font-medium">{func.title}</h4>
                </div>
                <div className="divide-y divide-gray-200">
                  {membersWithFunction.map(member => (
                    <div key={member.id} className="p-4 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium mr-3">
                          {member.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-gray-500">{member.role}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          className="p-2 rounded-full bg-gray-100 text-gray-600"
                          onClick={() => updateCrisisTeamMember(member.id, {present: !member.present})}
                        >
                          {member.present ? <Check size={16} /> : <X size={16} />}
                        </button>
                        <button 
                          className="p-2 rounded-full bg-red-50 text-red-600"
                          onClick={() => removeCrisisTeamMember(member.id)}
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {crisisTeamMembers.length === 0 && (
          <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
            <UserPlus size={48} className="mx-auto text-gray-400 mb-2" />
            <p className="text-gray-500">Aucun membre ajouté à la cellule de crise</p>
            <button 
              onClick={() => setShowAddForm(true)}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md inline-flex items-center"
            >
              <Plus size={16} className="mr-1" />
              Ajouter un membre
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CrisisTeamManager;