import type { ResourcesData, WorkshopsData, Schedule, VolunteersData } from '../types';

export interface AllData {
  resources: ResourcesData;
  workshops: WorkshopsData;
  schedule: Schedule;
  volunteers: VolunteersData;
}

export function exportAllData(data: AllData): string {
  return JSON.stringify(data, null, 2);
}

export function downloadJSON(data: AllData, filename: string = 'festival-backup.json'): void {
  const json = exportAllData(data);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function importJSON(file: File): Promise<AllData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string) as AllData;
        resolve(json);
      } catch (error) {
        reject(new Error('Invalid JSON format'));
      }
    };
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    reader.readAsText(file);
  });
}

export function validateImportedData(data: unknown): data is AllData {
  if (!data || typeof data !== 'object') return false;
  const obj = data as Record<string, unknown>;
  return !!(
    obj.resources &&
    typeof obj.resources === 'object' &&
    obj.workshops &&
    typeof obj.workshops === 'object' &&
    obj.schedule &&
    typeof obj.schedule === 'object' &&
    obj.volunteers &&
    typeof obj.volunteers === 'object'
  );
}
