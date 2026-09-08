import type { ScheduleItem, Workshop } from '../types';

function formatDate(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const mins = String(date.getUTCMinutes()).padStart(2, '0');
  const secs = String(date.getUTCSeconds()).padStart(2, '0');
  return `${year}${month}${day}T${hours}${mins}${secs}Z`;
}

function escapeICAL(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;')
    .replace(/\n/g, '\\n');
}

export function exportScheduleAsICal(schedule: ScheduleItem[], workshops: Workshop[]): string {
  const workshopMap = new Map(workshops.map(w => [w.id, w]));
  const events = schedule.map(item => {
    const workshop = workshopMap.get(item.workshopId);
    if (!workshop) return '';

    const startDate = new Date(item.startTime);
    const endDate = new Date(item.endTime);
    const dtstart = formatDate(startDate);
    const dtend = formatDate(endDate);
    const dtstamp = formatDate(new Date());
    const uid = `${item.workshopId}-${item.startTime}@festival`;

    return `BEGIN:VEVENT
UID:${uid}
DTSTAMP:${dtstamp}
DTSTART:${dtstart}
DTEND:${dtend}
SUMMARY:${escapeICAL(workshop.name)}
DESCRIPTION:${escapeICAL(workshop.description)}
LOCATION:${escapeICAL(item.room)}
CATEGORIES:${escapeICAL(workshop.category)}
END:VEVENT`;
  }).filter(Boolean).join('\n');

  const calName = escapeICAL('Festival 2026');
  const ical = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Festival Admin//Festival//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:${calName}
X-WR-TIMEZONE:Europe/Paris
BEGIN:VTIMEZONE
TZID:Europe/Paris
BEGIN:STANDARD
DTSTART:19701025T030000
RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU
TZOFFSETFROM:+0200
TZOFFSETTO:+0100
TZNAME:CET
END:STANDARD
BEGIN:DAYLIGHT
DTSTART:19700329T020000
RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU
TZOFFSETFROM:+0100
TZOFFSETTO:+0200
TZNAME:CEST
END:DAYLIGHT
END:VTIMEZONE
${events}
END:VCALENDAR`;

  return ical;
}

export function downloadICal(ical: string, filename: string = 'festival.ics'): void {
  const blob = new Blob([ical], { type: 'text/calendar;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
