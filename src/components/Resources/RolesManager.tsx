import { useState } from 'react';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import type { Role } from '../../types';

interface RolesManagerProps {
  roles: Role[];
  onAddRole: (role: Role) => void;
  onUpdateRole: (id: string, role: Role) => void;
  onDeleteRole: (id: string) => void;
}

export function RolesManager({ roles, onAddRole, onUpdateRole, onDeleteRole }: RolesManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ id: '', fr: '', en: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.id.trim() || !formData.fr.trim() || !formData.en.trim()) return;

    if (editingId) {
      onUpdateRole(editingId, { id: formData.id, fr: formData.fr, en: formData.en });
      setEditingId(null);
    } else {
      onAddRole({ id: formData.id, fr: formData.fr, en: formData.en });
    }
    setFormData({ id: '', fr: '', en: '' });
    setShowForm(false);
  };

  const handleEdit = (role: Role) => {
    setFormData(role);
    setEditingId(role.id);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ id: '', fr: '', en: '' });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Gestion des Rôles</h2>
        <button
          onClick={() => {
            handleCancel();
            setShowForm(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition"
        >
          <Plus size={20} />
          Ajouter un rôle
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 border-2 border-green-200">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ID (clé unique, ex: animator)
                </label>
                <input
                  type="text"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value.toLowerCase().replace(/\s+/g, '_') })}
                  disabled={!!editingId}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Français 🇫🇷
                </label>
                <input
                  type="text"
                  value={formData.fr}
                  onChange={(e) => setFormData({ ...formData, fr: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Ex: Animateur"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  English 🇺🇸
                </label>
                <input
                  type="text"
                  value={formData.en}
                  onChange={(e) => setFormData({ ...formData, en: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Ex: Animator"
                  required
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                {editingId ? 'Mettre à jour' : 'Ajouter'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-3">
        {roles.map((role) => (
          <div key={role.id} className="bg-white rounded-lg shadow p-4 flex items-center justify-between hover:shadow-md transition">
            <div className="flex-1">
              <div className="flex gap-4 items-center">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{role.fr}</p>
                  <p className="text-sm text-gray-500">{role.en}</p>
                </div>
                <div className="text-xs bg-gray-100 px-3 py-1 rounded text-gray-600 font-mono">
                  {role.id}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(role)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => onDeleteRole(role.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded transition"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
