import { useState } from 'react';
import { useResources } from '../hooks/useData';
import { Plus, Trash2, Edit, Download } from 'lucide-react';
import { PersonForm } from '../components/Forms/PersonForm';
import { exportPeopleAsCSV, downloadCSV } from '../utils/csv';

export function Resources() {
  const { data, addPerson, updatePerson, deletePerson } = useResources();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddPerson = (formData: any) => {
    addPerson(formData);
    setShowForm(false);
  };

  const handleEditPerson = (id: string, formData: any) => {
    updatePerson(id, formData);
    setEditingId(null);
  };

  const editingPerson = editingId ? data.people.find(p => p.id === editingId) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ressources</h1>
          <p className="text-gray-600 mt-2">Gérez les personnes et les rôles du festival</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              const csv = exportPeopleAsCSV(data.people);
              downloadCSV(csv, 'festival-ressources.csv');
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
            Ajouter une personne
          </button>
        </div>
      </div>

      {(showForm || editingPerson) && (
        <PersonForm
          person={editingPerson}
          roles={data.roles}
          onSubmit={editingPerson ?
            (formData) => handleEditPerson(editingPerson.id, formData) :
            handleAddPerson
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
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Téléphone</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Rôles</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.people.map(person => (
              <tr key={person.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{person.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{person.email}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{person.phone}</td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex flex-wrap gap-1">
                    {person.roles.map(role => (
                      <span key={role} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                        {role}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => setEditingId(person.id)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded transition"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => deletePerson(person.id)}
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
