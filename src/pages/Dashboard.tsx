import { useResources, useWorkshops, useSchedule, useVolunteers } from '../hooks/useData';
import { Users, BookOpen, Calendar, Users2, Settings } from 'lucide-react';
import { ExportImportPanel } from '../components/Export/ExportImportPanel';
import { detectConflicts } from '../utils/conflicts';
import type { AllData } from '../utils/export';
import { validateImportedData } from '../utils/export';

export function Dashboard() {
  const resources = useResources();
  const workshops = useWorkshops();
  const schedule = useSchedule();
  const volunteers = useVolunteers();

  const handleImportData = (importedData: AllData) => {
    if (validateImportedData(importedData)) {
      resources.data.people = importedData.resources.people;
      resources.data.roles = importedData.resources.roles;
      workshops.data.workshops = importedData.workshops.workshops;
      schedule.data.schedule = importedData.schedule.schedule;
      schedule.data.rooms = importedData.schedule.rooms;
      schedule.data.festivalDates = importedData.schedule.festivalDates;
      volunteers.data.assignments = importedData.volunteers.assignments;
    }
  };

  const handleResetData = () => {
    location.reload();
  };

  const allData: AllData = {
    resources: resources.data,
    workshops: workshops.data,
    schedule: schedule.data,
    volunteers: volunteers.data,
  };

  const conflicts = detectConflicts(schedule.data.schedule);

  const stats = [
    {
      icon: Users,
      label: 'Personnes',
      value: resources.data.people.length,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: BookOpen,
      label: 'Ateliers',
      value: workshops.data.workshops.length,
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: Calendar,
      label: 'Créneaux',
      value: schedule.data.schedule.length,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: Users2,
      label: 'Affectations',
      value: volunteers.data.assignments.length,
      color: 'bg-orange-100 text-orange-600',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-600 mt-2">Bienvenue dans le back office de gestion du festival</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="bg-white rounded-lg shadow p-6">
            <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center mb-4`}>
              <Icon size={24} />
            </div>
            <p className="text-gray-600 text-sm">{label}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Ateliers récents</h2>
          <div className="space-y-3">
            {workshops.data.workshops.slice(0, 5).map(workshop => (
              <div key={workshop.id} className="flex items-start justify-between border-b pb-3 last:border-0">
                <div>
                  <p className="font-medium text-gray-900">{workshop.name}</p>
                  <p className="text-sm text-gray-500">{workshop.category}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  workshop.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                  workshop.status === 'Planned' ? 'bg-blue-100 text-blue-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {workshop.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Équipe</h2>
          <div className="space-y-3">
            {resources.data.people.slice(0, 5).map(person => (
              <div key={person.id} className="flex items-start justify-between border-b pb-3 last:border-0">
                <div>
                  <p className="font-medium text-gray-900">{person.name}</p>
                  <p className="text-xs text-gray-500">{person.roles.join(', ')}</p>
                </div>
                <span className="text-xs text-gray-500">{person.email}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Settings size={24} />
          Gestion des données
        </h2>
        <div className="space-y-4">
          {conflicts.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-red-700">
                ⚠️ {conflicts.length} conflit(s) détecté(s) dans le planning
              </p>
            </div>
          )}
          <ExportImportPanel
            data={allData}
            onImport={handleImportData}
            onReset={handleResetData}
          />
        </div>
      </div>
    </div>
  );
}
