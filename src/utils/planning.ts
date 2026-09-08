export const SLOT_HEIGHT = 40; // pixels
export const SLOT_INTERVAL = 30; // minutes

export function generateTimeSlots(startHour: number = 9, endHour: number = 18, intervalMins: number = SLOT_INTERVAL): string[] {
  const slots: string[] = [];
  for (let hour = startHour; hour < endHour; hour++) {
    for (let min = 0; min < 60; min += intervalMins) {
      const time = `${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
      slots.push(time);
    }
  }
  return slots;
}

export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

export function getGridPosition(startTime: string, endTime: string): { row: number; height: number } {
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  const startHours = startDate.getHours();
  const startMins = startDate.getMinutes();
  const totalMins = startHours * 60 + startMins;

  const durationMins = (endDate.getTime() - startDate.getTime()) / (1000 * 60);

  const row = Math.floor(totalMins / SLOT_INTERVAL);
  const height = Math.ceil((durationMins / SLOT_INTERVAL) * SLOT_HEIGHT);

  return { row, height };
}

export function minToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

export function getDateFromTimeSlot(date: Date, timeString: string): Date {
  const [hours, minutes] = timeString.split(':').map(Number);
  const result = new Date(date);
  result.setHours(hours, minutes, 0, 0);
  return result;
}

export function getEndTimeFromDuration(startTime: Date, durationMins: number): Date {
  return new Date(startTime.getTime() + durationMins * 60000);
}
