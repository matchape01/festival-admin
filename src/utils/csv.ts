import type { Person, Workshop, VolunteerAssignment, ScheduleItem } from '../types';

function escapeCSV(value: any): string {
  if (value === null || value === undefined) return '';
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function exportPeopleAsCSV(people: Person[]): string {
  const headers = ['Nom', 'Email', 'Téléphone', 'Rôles'];
  const rows = people.map(person => [
    escapeCSV(person.name),
    escapeCSV(person.email),
    escapeCSV(person.phone),
    escapeCSV(person.roles.join('; ')),
  ]);
  return [headers, ...rows].map(row => row.join(',')).join('\n');
}

export function exportWorkshopsAsCSV(workshops: Workshop[]): string {
  const headers = ['Atelier', 'Catégorie', 'Capacité', 'Animateurs', 'Statut', 'Équipement', 'Besoins Spéciaux'];
  const rows = workshops.map(workshop => [
    escapeCSV(workshop.name),
    escapeCSV(workshop.category),
    workshop.capacity,
    escapeCSV(workshop.animators.join('; ')),
    escapeCSV(workshop.status),
    escapeCSV(workshop.logistics.equipment.join('; ')),
    escapeCSV(workshop.logistics.specialNeeds),
  ]);
  return [headers, ...rows].map(row => row.join(',')).join('\n');
}

export function exportAssignmentsAsCSV(assignments: VolunteerAssignment[]): string {
  const headers = ['ID Affectation', 'ID Bénévole', 'ID Atelier', 'Rôle', 'Statut'];
  const rows = assignments.map(assignment => [
    escapeCSV(assignment.id),
    escapeCSV(assignment.volunteerId),
    escapeCSV(assignment.workshopId),
    escapeCSV(assignment.role),
    escapeCSV(assignment.status),
  ]);
  return [headers, ...rows].map(row => row.join(',')).join('\n');
}

export function exportScheduleAsCSV(schedule: ScheduleItem[], workshopMap: Record<string, string>): string {
  const headers = ['Atelier', 'Salle', 'Début', 'Fin'];
  const rows = schedule.map(item => {
    const startDate = new Date(item.startTime);
    const endDate = new Date(item.endTime);
    return [
      escapeCSV(workshopMap[item.workshopId] || item.workshopId),
      escapeCSV(item.room),
      startDate.toLocaleString('fr-FR'),
      endDate.toLocaleString('fr-FR'),
    ];
  });
  return [headers, ...rows].map(row => row.join(',')).join('\n');
}

export function downloadCSV(csv: string, filename: string): void {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
