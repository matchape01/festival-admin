import { useState } from 'react';
import { useVolunteers, useResources, useWorkshops } from '../hooks/useData';
import { Plus, Trash2, Download } from 'lucide-react';
import { exportAssignmentsAsCSV, downloadCSV } from '../utils/csv';

export function Volunteers() {
  const { data: volunteers, addAssignment, deleteAssignment } = useVolunteers();
  const { data: resources } = useResources();
  const { data: workshops } = useWorkshops();
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    volunteerId: '',
    workshopId: '',
    role: '',
    status: 'Pending' as const,
  });

  const handleAddAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.volunteerId && formData.workshopId && formData.role) {
      addAssignment(formData);
      setFormData({ volunteerId: '', workshopId: '', role: '', status: 'Pending' });
      setShowForm(false);
    }
  };

  const getVolunteerName = (id: string) => {
    return resources.people.find(p => p.id === id)?.name || 'Unknown';
  };

  const getWorkshopName = (id: string) => {
    return workshops.workshops.find(w => w.id === id)?.name || 'Unknown';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Affectations des bénévoles</h1>
          <p className="text-gray-600 mt-2">Assignez les bénévoles aux ateliers</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              const csv = exportAssignmentsAsCSV(volunteers.assignments);
              downloadCSV(csv, 'festival-affectations.csv');
            }}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-700 transition"
          >
            <Download size={20} />
            Export CSV
          </button>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
          >
            <Plus size={20} />
            Ajouter une affectation
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Nouvelle affectation</h2>
          <form onSubmit={handleAddAssignment} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bénévole *
                </label>
                <select
                  required
                  value={formData.volunteerId}
                  onChange={(e) => setFormData(prev => ({ ...prev, volunteerId: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Sélectionner un bénévole</option>
                  {resources.people.map(person => (
                    <option key={person.id} value={person.id}>
                      {person.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Atelier *
                </label>
                <select
                  required
                  value={formData.workshopId}
                  onChange={(e) => setFormData(prev => ({ ...prev, workshopId: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Sélectionner un atelier</option>
                  {workshops.workshops.map(workshop => (
                    <option key={workshop.id} value={workshop.id}>
                      {workshop.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rôle *
                </label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: Translator, Helper"
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
                  <option>Pending</option>
                  <option>Confirmed</option>
                  <option>Rejected</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Ajouter
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Bénévole</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Atelier</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Rôle</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Statut</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {volunteers.assignments.map(assignment => (
              <tr key={assignment.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {getVolunteerName(assignment.volunteerId)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {getWorkshopName(assignment.workshopId)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{assignment.role}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    assignment.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                    assignment.status === 'Pending' ? 'bg-blue-100 text-blue-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {assignment.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => deleteAssignment(assignment.id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
