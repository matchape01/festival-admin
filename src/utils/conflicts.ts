import type { ScheduleItem } from '../types';

export interface Conflict {
  workshopIds: string[];
  room: string;
  startTime: string;
  endTime: string;
}

export function detectConflicts(schedule: ScheduleItem[]): Conflict[] {
  const conflicts: Conflict[] = [];

  for (let i = 0; i < schedule.length; i++) {
    for (let j = i + 1; j < schedule.length; j++) {
      const item1 = schedule[i];
      const item2 = schedule[j];

      if (item1.room === item2.room) {
        const start1 = new Date(item1.startTime).getTime();
        const end1 = new Date(item1.endTime).getTime();
        const start2 = new Date(item2.startTime).getTime();
        const end2 = new Date(item2.endTime).getTime();

        if (!(end1 <= start2 || end2 <= start1)) {
          conflicts.push({
            workshopIds: [item1.workshopId, item2.workshopId],
            room: item1.room,
            startTime: new Date(Math.max(start1, start2)).toISOString(),
            endTime: new Date(Math.min(end1, end2)).toISOString(),
          });
        }
      }
    }
  }

  return conflicts;
}

export function hasConflict(
  workshopId: string,
  room: string,
  startTime: string,
  endTime: string,
  schedule: ScheduleItem[]
): boolean {
  const newStart = new Date(startTime).getTime();
  const newEnd = new Date(endTime).getTime();

  for (const item of schedule) {
    if (item.workshopId === workshopId) continue;
    if (item.room !== room) continue;

    const itemStart = new Date(item.startTime).getTime();
    const itemEnd = new Date(item.endTime).getTime();

    if (!(newEnd <= itemStart || newStart >= itemEnd)) {
      return true;
    }
  }

  return false;
}
