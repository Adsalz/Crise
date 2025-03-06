import React, { useState } from 'react';
import { AlertTriangle, MapPin, Package, UserPlus, Shield, Plus, Info } from 'lucide-react';
import { useAlertStore, Risk, Resource, RiskType, ResourceType, RiskLevel, ResourceStatus } from '../store/useAlertStore';

const MapView: React.FC = () => {
  const { territory, addRisk, addResource } = useAlertStore();
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [newMarkerType, setNewMarkerType] = useState<'risk' | 'resource' | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<Risk | Resource | null>(null);
  
  // Forme simplifiée pour la démonstration - utiliser une vraie carte dans l'implémentation finale
  const mockMap = {
    width: 800,
    height: 500
  };
  
  const getMarkerIcon = (type: RiskType | ResourceType) => {
    switch(type) {
      case 'natural':
      case 'health':
      case 'technological':
      case 'transport':
      case 'daily':
        return <AlertTriangle size={20} />;
      case 'medical':
        return <Shield size={20} />;
      case 'paramedical':
        return <UserPlus size={20} />;
      case 'facility':
        return <MapPin size={20} />;
      case 'equipment':
        return <Package size={20} />;
      default:
        return <Info size={20} />;
    }
  };
  
  const getMarkerColor = (marker: Risk | Resource) => {
    if ('level' in marker) {
      switch(marker.level) {
        case 'low': return 'bg-green-100 text-green-700 border-green-300';
        case 'medium': return 'bg-amber-100 text-amber-700 border-amber-300';
        case 'high': return 'bg-red-100 text-red-700 border-red-300';
        default: return 'bg-blue-100 text-blue-700 border-blue-300';
      }
    } else {
      switch(marker.availability) {
        case 'available': return 'bg-green-100 text-green-700 border-green-300';
        case 'limited': return 'bg-amber-100 text-amber-700 border-amber-300';
        case 'unavailable': return 'bg-red-100 text-red-700 border-red-300';
        default: return 'bg-blue-100 text-blue-700 border-blue-300';
      }
    }
  };
  
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!newMarkerType) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const position = {
      x: (x / mockMap.width) * 100,
      y: (y / mockMap.height) * 100
    };
    
    if (newMarkerType === 'risk') {
      addRisk({
        type: 'health',
        name: 'Nouveau risque',
        position,
        description: 'Description du risque',
        level: 'medium'
      });
    } else {
      addResource({
        type: 'medical',
        name: 'Nouvelle ressource',
        position,
        description: 'Description de la ressource',
        availability: 'available'
      });
    }
    
    setNewMarkerType(null);
  };
  
  const handleMarkerClick = (marker: Risk | Resource) => {
    setSelectedMarker(marker);
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg text-gray-800">Cartographie des risques et ressources</h3>
        <div className="relative">
          <button 
            onClick={() => setShowAddMenu(!showAddMenu)}
            className="text-blue-600 text-sm flex items-center bg-blue-50 px-3 py-1 rounded-full"
          >
            <Plus size={16} className="mr-1" /> Ajouter
          </button>
          
          {showAddMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
              <button 
                className="flex items-center w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                onClick={() => {
                  setNewMarkerType('risk');
                  setShowAddMenu(false);
                }}
              >
                <AlertTriangle size={16} className="mr-2 text-amber-600" />
                Ajouter un risque
              </button>
              <button 
                className="flex items-center w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                onClick={() => {
                  setNewMarkerType('resource');
                  setShowAddMenu(false);
                }}
              >
                <Package size={16} className="mr-2 text-blue-600" />
                Ajouter une ressource
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex space-x-4 mb-4">
        <div className="flex items-center text-xs">
          <div className="h-3 w-3 bg-red-100 border border-red-300 rounded-full mr-1"></div>
          <span>Risque élevé</span>
        </div>
        <div className="flex items-center text-xs">
          <div className="h-3 w-3 bg-amber-100 border border-amber-300 rounded-full mr-1"></div>
          <span>Risque moyen</span>
        </div>
        <div className="flex items-center text-xs">
          <div className="h-3 w-3 bg-green-100 border border-green-300 rounded-full mr-1"></div>
          <span>Ressource disponible</span>
        </div>
      </div>
      
      <div 
        className="relative border border-gray-300 rounded-lg overflow-hidden bg-gray-100"
        style={{ width: '100%', height: '500px' }}
        onClick={newMarkerType ? handleMapClick : undefined}
      >
        {newMarkerType && (
          <div className="absolute inset-0 bg-blue-500 bg-opacity-10 flex items-center justify-center cursor-crosshair">
            <div className="bg-white p-3 rounded-md shadow-md">
              Cliquez sur la carte pour placer {newMarkerType === 'risk' ? 'un risque' : 'une ressource'}
            </div>
          </div>
        )}
        
        {/* Emplacement pour la carte réelle */}
        <div className="p-4 text-center text-gray-500">
          Carte du territoire CPTS
        </div>
        
        {/* Marqueurs de risques */}
        {territory.risks.map(risk => (
          <div 
            key={`risk-${risk.id}`}
            className={`absolute p-1 border rounded-full cursor-pointer ${getMarkerColor(risk)}`}
            style={{ 
              left: `${risk.position.x}%`, 
              top: `${risk.position.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            onClick={() => handleMarkerClick(risk)}
          >
            {getMarkerIcon(risk.type)}
          </div>
        ))}
        
        {/* Marqueurs de ressources */}
        {territory.resources.map(resource => (
          <div 
            key={`resource-${resource.id}`}
            className={`absolute p-1 border rounded-full cursor-pointer ${getMarkerColor(resource)}`}
            style={{ 
              left: `${resource.position.x}%`, 
              top: `${resource.position.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            onClick={() => handleMarkerClick(resource)}
          >
            {getMarkerIcon(resource.type)}
          </div>
        ))}
      </div>
      
      {selectedMarker && (
        <div className="mt-4 p-4 border border-gray-200 rounded-lg">
          <div className="flex justify-between">
            <h4 className="font-medium">{'level' in selectedMarker ? 'Risque' : 'Ressource'}: {selectedMarker.name}</h4>
            <button onClick={() => setSelectedMarker(null)} className="text-gray-500">×</button>
          </div>
          <p className="text-sm text-gray-600">{selectedMarker.description}</p>
          {'level' in selectedMarker ? (
            <p className="text-sm mt-2">
              <span className="font-medium">Niveau de risque:</span> {selectedMarker.level}
            </p>
          ) : (
            <p className="text-sm mt-2">
              <span className="font-medium">Disponibilité:</span> {selectedMarker.availability}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default MapView;
