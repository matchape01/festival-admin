import { useState } from 'react';
import { useWorkshops, useResources } from '../hooks/useData';
import { Plus, Trash2, Edit, Download } from 'lucide-react';
import { WorkshopForm } from '../components/Forms/WorkshopForm';
import { exportWorkshopsAsCSV, downloadCSV } from '../utils/csv';

export function Workshops() {
  const { data: workshops, addWorkshop, updateWorkshop, deleteWorkshop } = useWorkshops();
  const { data: resources } = useResources();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddWorkshop = (formData: any) => {
    addWorkshop(formData);
    setShowForm(false);
  };

  const handleEditWorkshop = (id: string, formData: any) => {
    updateWorkshop(id, formData);
    setEditingId(null);
  };

  const editingWorkshop = editingId ? workshops.workshops.find(w => w.id === editingId) : null;

  const getAnimatorName = (id: string) => {
    return resources.people.find(p => p.id === id)?.name || 'Unknown';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ateliers</h1>
          <p className="text-gray-600 mt-2">Gérez tous les ateliers du festival</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              const csv = exportWorkshopsAsCSV(workshops.workshops);
              downloadCSV(csv, 'festival-ateliers.csv');
            }}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-700 transition"
          >
            <Download size={20} />
            Export CSV
          </button>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingId(null);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
          >
            <Plus size={20} />
            Ajouter un atelier
          </button>
        </div>
      </div>

      {(showForm || editingWorkshop) && (
        <WorkshopForm
          workshop={editingWorkshop}
          people={resources.people}
          onSubmit={editingWorkshop ?
            (formData) => handleEditWorkshop(editingWorkshop.id, formData) :
            handleAddWorkshop
          }
          onCancel={() => {
            setShowForm(false);
            setEditingId(null);
          }}
        />
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nom</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Animateurs</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Catégorie</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Capacité</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Statut</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {workshops.workshops.map(workshop => (
              <tr key={workshop.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{workshop.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {workshop.animators.map(id => getAnimatorName(id)).join(', ')}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{workshop.category}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{workshop.capacity}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    workshop.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                    workshop.status === 'Planned' ? 'bg-blue-100 text-blue-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {workshop.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => setEditingId(workshop.id)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded transition"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => deleteWorkshop(workshop.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
