import React, { useState } from 'react';
import { 
  Shield, 
  Activity, 
  Map, 
  Building, 
  Users, 
  UserPlus, 
  ChevronDown, 
  ChevronUp, 
  AlertTriangle, 
  MessageSquare,
  Edit
} from 'lucide-react';

const EcosystemView = () => {
  const [activeTab, setActiveTab] = useState('risks');
  const [expandedSection, setExpandedSection] = useState('');
  
  // Données fictives pour la démonstration
  const risksMock = [
    { type: 'epidemic', name: 'Cluster COVID-19', level: 'high', description: 'Zone avec incidence élevée', location: 'Communes A, B, C' },
    { type: 'natural', name: 'Zone inondable', level: 'medium', description: 'Risque d\'inondation saisonnier', location: 'Commune D' },
    { type: 'health', name: 'Désert médical', level: 'high', description: 'Faible densité médicale', location: 'Communes E, F' }
  ];
  
  const resourcesMock = {
    establishments: [
      { name: 'CH Marseille', type: 'firstLine', address: '80 Rue Brochier, 13005 Marseille', contact: 'Dr. Martin, 04 91 XX XX XX' },
      { name: 'Clinique Saint-Michel', type: 'secondLine', address: '25 Avenue de la Liberté, 13010 Marseille', contact: 'Dr. Dupont, 04 91 XX XX XX' },
      { name: 'EHPAD Les Oliviers', type: 'ems', address: '10 Rue des Oliviers, 13008 Marseille', contact: 'Mme Robert, 04 91 XX XX XX' }
    ],
    coordinated: [
      { name: 'MSP Centre', type: 'msp', address: '15 Rue Centrale, 13001 Marseille', contact: 'Dr. Blanc, 04 91 XX XX XX' },
      { name: 'Centre de Santé Est', type: 'cds', address: '42 Avenue de l\'Est, 13012 Marseille', contact: 'Dr. Noir, 04 91 XX XX XX' }
    ],
    authorities: [
      { name: 'ARS PACA', type: 'ars', contact: 'Point Focal Régional, 04 13 55 80 00, ars13-alerte@ars.sante.fr' },
      { name: 'Préfecture Bouches-du-Rhône', type: 'prefecture', contact: 'Cellule de crise, 04 84 XX XX XX' },
      { name: 'Mairie de Marseille', type: 'city', contact: 'Service Santé, 04 91 XX XX XX' }
    ],
    interCPTS: [
      { name: 'CPTS Nord', contact: 'Dr. Moreau, Référent SSE, 06 XX XX XX XX' },
      { name: 'CPTS Est', contact: 'Dr. Petit, Référent SSE, 06 XX XX XX XX' }
    ]
  };
  
  const zonesMock = [
    { name: 'Zone Nord', municipalities: ['Commune A', 'Commune B'], population: 45000, 
      resources: { doctors: 18, nurses: 32, pharmacies: 8 }, 
      referent: { name: 'Dr. Durant', contact: '06 XX XX XX XX' } },
    { name: 'Zone Sud', municipalities: ['Commune C', 'Commune D'], population: 32000, 
      resources: { doctors: 12, nurses: 24, pharmacies: 6 }, 
      referent: { name: 'Dr. Bernard', contact: '06 XX XX XX XX' } },
    { name: 'Zone Est', municipalities: ['Commune E', 'Commune F'], population: 28000, 
      resources: { doctors: 8, nurses: 20, pharmacies: 4 }, 
      referent: { name: 'Dr. Leroy', contact: '06 XX XX XX XX' } }
  ];
  
  const swotMock = {
    strengths: [
      'Bonne collaboration ville-hôpital',
      'Personnel médical et paramédical engagé',
      'Expérience COVID valorisable'
    ],
    weaknesses: [
      'Zones avec faible densité médicale',
      'Système d\'information fragmenté',
      'Coordination des acteurs perfectible'
    ],
    opportunities: [
      'Développement d\'exercice coordonné',
      'Digitalisation des processus',
      'Partenariats avec les collectivités'
    ],
    threats: [
      'Vieillissement de la population médicale',
      'Risques naturels sur certaines zones',
      'Épuisement professionnel post-COVID'
    ]
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="md:w-64 bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold text-lg text-gray-800 mb-4">Écosystème CPTS</h3>
          <nav className="space-y-1">
            <button
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'risks' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setActiveTab('risks')}
            >
              <AlertTriangle className="mr-3 h-5 w-5" />
              Cartographie des risques
            </button>
            <button
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'resources' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setActiveTab('resources')}
            >
              <Building className="mr-3 h-5 w-5" />
              Ressources territoriales
            </button>
            <button
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'zones' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setActiveTab('zones')}
            >
              <Map className="mr-3 h-5 w-5" />
              Zones intraCPTS
            </button>
            <button
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'swot' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setActiveTab('swot')}
            >
              <Activity className="mr-3 h-5 w-5" />
              Analyse SWOT
            </button>
          </nav>
        </div>
        
        {/* Main content */}
        <div className="flex-1 bg-white rounded-lg shadow p-6">
          {activeTab === 'risks' && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Cartographie des risques du territoire</h2>
                <button className="px-3 py-1 flex items-center text-sm text-blue-600 bg-blue-50 rounded-full">
                  <Edit size={14} className="mr-1" /> Modifier
                </button>
              </div>
              
              <p className="text-gray-600 mb-4">
                Cette cartographie répertorie les principaux risques identifiés sur le territoire de la CPTS conformément au guide méthodologique.
              </p>
              
              <div className="overflow-hidden border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risque</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Niveau</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Localisation</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {risksMock.map((risk, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center">
                            <span className={`h-8 w-8 rounded-full flex items-center justify-center ${
                              risk.type === 'epidemic' ? 'bg-red-100 text-red-600' : 
                              risk.type === 'natural' ? 'bg-amber-100 text-amber-600' : 
                              'bg-blue-100 text-blue-600'
                            }`}>
                              {risk.type === 'epidemic' ? <Activity size={18} /> : 
                               risk.type === 'natural' ? <AlertTriangle size={18} /> : 
                               <Shield size={18} />}
                            </span>
                            <span className="ml-2 font-medium">{
                              risk.type === 'epidemic' ? 'Épidémie' : 
                              risk.type === 'natural' ? 'Naturel' : 
                              'Sanitaire'
                            }</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{risk.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            risk.level === 'high' ? 'bg-red-100 text-red-800' : 
                            risk.level === 'medium' ? 'bg-amber-100 text-amber-800' : 
                            'bg-green-100 text-green-800'
                          }`}>
                            {risk.level === 'high' ? 'Élevé' : 
                             risk.level === 'medium' ? 'Moyen' : 
                             'Faible'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{risk.description}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{risk.location}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 text-right">
                <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md">
                  Ajouter un risque
                </button>
              </div>
            </>
          )}
          
          {activeTab === 'resources' && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Ressources du territoire</h2>
                <button className="px-3 py-1 flex items-center text-sm text-blue-600 bg-blue-50 rounded-full">
                  <Edit size={14} className="mr-1" /> Modifier
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <button 
                    onClick={() => setExpandedSection(expandedSection === 'establishments' ? '' : 'establishments')}
                    className="flex justify-between items-center w-full px-4 py-2 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <Building size={20} className="mr-2 text-blue-600" />
                      <span className="font-medium">Établissements sanitaires et médico-sociaux</span>
                    </div>
                    {expandedSection === 'establishments' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  
                  {expandedSection === 'establishments' && (
                    <div className="mt-2 overflow-hidden border border-gray-200 rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adresse</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {resourcesMock.establishments.map((est, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{est.name}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  est.type === 'firstLine' ? 'bg-blue-100 text-blue-800' : 
                                  est.type === 'secondLine' ? 'bg-green-100 text-green-800' : 
                                  'bg-purple-100 text-purple-800'
                                }`}>
                                  {est.type === 'firstLine' ? 'Établissement 1ère ligne' : 
                                   est.type === 'secondLine' ? 'Établissement 2ème ligne' : 
                                   'EMS'}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-500">{est.address}</td>
                              <td className="px-6 py-4 text-sm text-gray-500">{est.contact}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
                
                <div>
                  <button 
                    onClick={() => setExpandedSection(expandedSection === 'coordinated' ? '' : 'coordinated')}
                    className="flex justify-between items-center w-full px-4 py-2 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <Users size={20} className="mr-2 text-green-600" />
                      <span className="font-medium">Structures d'exercice coordonné</span>
                    </div>
                    {expandedSection === 'coordinated' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  
                  {expandedSection === 'coordinated' && (
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {resourcesMock.coordinated.map((struct, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            <span className="h-8 w-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-2">
                              <Users size={18} />
                            </span>
                            <h3 className="font-medium">{struct.name}</h3>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">Type: {struct.type === 'msp' ? 'Maison de Santé Pluriprofessionnelle' : 'Centre de Santé'}</p>
                          <p className="text-sm text-gray-600 mb-1">Adresse: {struct.address}</p>
                          <p className="text-sm text-gray-600">Contact: {struct.contact}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div>
                  <button 
                    onClick={() => setExpandedSection(expandedSection === 'authorities' ? '' : 'authorities')}
                    className="flex justify-between items-center w-full px-4 py-2 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <Shield size={20} className="mr-2 text-amber-600" />
                      <span className="font-medium">Autorités et institutions</span>
                    </div>
                    {expandedSection === 'authorities' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  
                  {expandedSection === 'authorities' && (
                    <div className="mt-2 space-y-2">
                      {resourcesMock.authorities.map((auth, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">{auth.name}</h3>
                            <p className="text-sm text-gray-600">Contact: {auth.contact}</p>
                          </div>
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full">
                            <MessageSquare size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div>
                  <button 
                    onClick={() => setExpandedSection(expandedSection === 'interCPTS' ? '' : 'interCPTS')}
                    className="flex justify-between items-center w-full px-4 py-2 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <UserPlus size={20} className="mr-2 text-purple-600" />
                      <span className="font-medium">InterCPTS et coordination externe</span>
                    </div>
                    {expandedSection === 'interCPTS' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  
                  {expandedSection === 'interCPTS' && (
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {resourcesMock.interCPTS.map((cpts, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            <span className="h-8 w-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-2">
                              <UserPlus size={18} />
                            </span>
                            <h3 className="font-medium">{cpts.name}</h3>
                          </div>
                          <p className="text-sm text-gray-600">Contact référent SSE: {cpts.contact}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
          
          {activeTab === 'zones' && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Zones intraCPTS et référents</h2>
                <button className="px-3 py-1 flex items-center text-sm text-blue-600 bg-blue-50 rounded-full">
                  <Edit size={14} className="mr-1" /> Modifier
                </button>
              </div>
              
              <p className="text-gray-600 mb-4">
                Découpage du territoire en zones pour faciliter la gestion de crise et identifier les référents locaux.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                {zonesMock.map((zone, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-blue-50 px-4 py-3">
                      <h3 className="font-medium text-blue-800">{zone.name}</h3>
                    </div>
                    <div className="p-4">
                      <div className="mb-2">
                        <span className="text-sm font-medium text-gray-500">Communes :</span>
                        <p className="text-sm">{zone.municipalities.join(', ')}</p>
                      </div>
                      <div className="mb-2">
                        <span className="text-sm font-medium text-gray-500">Population :</span>
                        <p className="text-sm">{zone.population.toLocaleString()} habitants</p>
                      </div>
                      <div className="mb-2">
                        <span className="text-sm font-medium text-gray-500">Ressources :</span>
                        <p className="text-sm">
                          {zone.resources.doctors} médecins, {zone.resources.nurses} infirmiers, {zone.resources.pharmacies} pharmacies
                        </p>
                      </div>
                      <div className="border-t pt-2 mt-2">
                        <span className="text-sm font-medium text-gray-500">Référent zone :</span>
                        <div className="flex items-center mt-1">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <Shield size={16} className="text-blue-700" />
                          </div>
                          <div className="ml-2">
                            <p className="text-sm font-medium">{zone.referent.name}</p>
                            <p className="text-xs text-gray-500">{zone.referent.contact}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          
          {activeTab === 'swot' && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Analyse SWOT de la CPTS</h2>
                <button className="px-3 py-1 flex items-center text-sm text-blue-600 bg-blue-50 rounded-full">
                  <Edit size={14} className="mr-1" /> Modifier
                </button>
              </div>
              
              <p className="text-gray-600 mb-4">
                Analyse des forces, faiblesses, opportunités et menaces pour la CPTS face aux situations sanitaires exceptionnelles.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-green-200 rounded-lg overflow-hidden">
                  <div className="bg-green-50 px-4 py-3">
                    <h3 className="font-medium text-green-800">Forces (Strengths)</h3>
                  </div>
                  <div className="p-4">
                    <ul className="space-y-2">
                      {swotMock.strengths.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                            <span className="text-xs font-medium text-green-700">{index + 1}</span>
                          </div>
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="border border-red-200 rounded-lg overflow-hidden">
                  <div className="bg-red-50 px-4 py-3">
                    <h3 className="font-medium text-red-800">Faiblesses (Weaknesses)</h3>
                  </div>
                  <div className="p-4">
                    <ul className="space-y-2">
                      {swotMock.weaknesses.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center mr-2 mt-0.5">
                            <span className="text-xs font-medium text-red-700">{index + 1}</span>
                          </div>
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="border border-blue-200 rounded-lg overflow-hidden">
                  <div className="bg-blue-50 px-4 py-3">
                    <h3 className="font-medium text-blue-800">Opportunités (Opportunities)</h3>
                  </div>
                  <div className="p-4">
                    <ul className="space-y-2">
                      {swotMock.opportunities.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                            <span className="text-xs font-medium text-blue-700">{index + 1}</span>
                          </div>
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="border border-amber-200 rounded-lg overflow-hidden">
                  <div className="bg-amber-50 px-4 py-3">
                    <h3 className="font-medium text-amber-800">Menaces (Threats)</h3>
                  </div>
                  <div className="p-4">
                    <ul className="space-y-2">
                      {swotMock.threats.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center mr-2 mt-0.5">
                            <span className="text-xs font-medium text-amber-700">{index + 1}</span>
                          </div>
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EcosystemView;