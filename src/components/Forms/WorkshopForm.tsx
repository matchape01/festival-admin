import { useState } from 'react';
import { X } from 'lucide-react';
import type { Workshop, Person } from '../../types';

interface WorkshopFormProps {
  workshop?: Workshop | null;
  people: Person[];
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function WorkshopForm({ workshop, people, onSubmit, onCancel }: WorkshopFormProps) {
  const [formData, setFormData] = useState({
    name: workshop?.name || '',
    description: workshop?.description || '',
    category: workshop?.category || '',
    capacity: workshop?.capacity || 20,
    animators: workshop?.animators || [],
    logistics: workshop?.logistics || {
      equipment: [],
      specialNeeds: '',
    },
    status: workshop?.status || 'Planned',
  });

  const [equipmentInput, setEquipmentInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.category) {
      onSubmit(formData);
    }
  };

  const toggleAnimator = (id: string) => {
    setFormData(prev => ({
      ...prev,
      animators: prev.animators.includes(id)
        ? prev.animators.filter(a => a !== id)
        : [...prev.animators, id]
    }));
  };

  const addEquipment = () => {
    if (equipmentInput.trim()) {
      setFormData(prev => ({
        ...prev,
        logistics: {
          ...prev.logistics,
          equipment: [...prev.logistics.equipment, equipmentInput]
        }
      }));
      setEquipmentInput('');
    }
  };

  const removeEquipment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      logistics: {
        ...prev.logistics,
        equipment: prev.logistics.equipment.filter((_, i) => i !== index)
      }
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">
          {workshop ? 'Modifier l\'atelier' : 'Ajouter un atelier'}
        </h2>
        <button
          onClick={onCancel}
          className="p-1 hover:bg-gray-100 rounded transition"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom de l'atelier *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: Atelier Yoga"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Catégorie *
            </label>
            <input
              type="text"
              required
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: Wellness"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Capacité
            </label>
            <input
              type="number"
              value={formData.capacity}
              onChange={(e) => setFormData(prev => ({ ...prev, capacity: parseInt(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Statut
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>Planned</option>
              <option>Confirmed</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            placeholder="Décrivez l'atelier..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Animateurs
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {people.filter(p => p.roles.includes('Animator')).map(person => (
              <label key={person.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.animators.includes(person.id)}
                  onChange={() => toggleAnimator(person.id)}
                  className="rounded border-gray-300 text-blue-600"
                />
                <span className="text-sm text-gray-700">{person.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Équipement nécessaire
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={equipmentInput}
              onChange={(e) => setEquipmentInput(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Ex: Tapis de yoga"
              onKeyPress={(e) => e.key === 'Enter' && addEquipment()}
            />
            <button
              type="button"
              onClick={addEquipment}
              className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Ajouter
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.logistics.equipment.map((item, idx) => (
              <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                {item}
                <button
                  type="button"
                  onClick={() => removeEquipment(idx)}
                  className="ml-1 hover:bg-blue-200 rounded-full"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Besoins spéciaux
          </label>
          <textarea
            value={formData.logistics.specialNeeds}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              logistics: { ...prev.logistics, specialNeeds: e.target.value }
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={2}
            placeholder="Ex: Climatisation, Accès PMR..."
          />
        </div>

        <div className="flex gap-2 justify-end pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {workshop ? 'Mettre à jour' : 'Ajouter'}
          </button>
        </div>
      </form>
    </div>
  );
}
