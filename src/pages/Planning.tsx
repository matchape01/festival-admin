import { useState } from 'react';
import { useSchedule, useWorkshops } from '../hooks/useData';
import { PlanningBoard } from '../components/Planning/PlanningBoard';
import { Calendar, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { exportScheduleAsICal, downloadICal } from '../utils/ical';
import { exportScheduleAsCSV, downloadCSV } from '../utils/csv';

export function Planning() {
  const { data: schedule, updateScheduleItemDrop } = useSchedule();
  const { data: workshops } = useWorkshops();
  const [selectedDate, setSelectedDate] = useState<string>('2026-09-15');

  const festivalStart = new Date(schedule.festivalDates.start);
  const festivalEnd = new Date(schedule.festivalDates.end);
  const currentDate = new Date(selectedDate);

  const handlePrevDay = () => {
    const prev = new Date(currentDate);
    prev.setDate(prev.getDate() - 1);
    if (prev >= festivalStart) {
      setSelectedDate(prev.toISOString().split('T')[0]);
    }
  };

  const handleNextDay = () => {
    const next = new Date(currentDate);
    next.setDate(next.getDate() + 1);
    if (next <= festivalEnd) {
      setSelectedDate(next.toISOString().split('T')[0]);
    }
  };

  const scheduleForDay = {
    ...schedule,
    schedule: schedule.schedule.filter(item => {
      const itemDate = new Date(item.startTime).toISOString().split('T')[0];
      return itemDate === selectedDate;
    })
  };

  const isPrevDisabled = currentDate <= festivalStart;
  const isNextDisabled = currentDate >= festivalEnd;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Planning du Festival</h1>
        <p className="text-gray-600 mt-2">Organisez le programme jour par jour (glissez-déposez pour modifier)</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar size={24} />
          Dates du festival
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Début</p>
            <p className="text-lg font-medium text-gray-900">{schedule.festivalDates.start}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Fin</p>
            <p className="text-lg font-medium text-gray-900">{schedule.festivalDates.end}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {currentDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </h3>
            <p className="text-sm text-gray-600">
              {scheduleForDay.schedule.length} atelier(s) programmé(s)
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrevDay}
              disabled={isPrevDisabled}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNextDay}
              disabled={isNextDisabled}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {scheduleForDay.schedule.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Aucun atelier programmé pour ce jour</p>
          </div>
        ) : (
          <PlanningBoard
            schedule={scheduleForDay}
            workshops={workshops.workshops}
            onUpdateScheduleItem={updateScheduleItemDrop}
          />
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => {
            const ical = exportScheduleAsICal(schedule.schedule, workshops.workshops);
            downloadICal(ical, 'festival-2026.ics');
          }}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          <Download size={20} />
          Export iCal
        </button>
        <button
          onClick={() => {
            const workshopMap = Object.fromEntries(
              workshops.workshops.map(w => [w.id, w.name])
            );
            const csv = exportScheduleAsCSV(schedule.schedule, workshopMap);
            downloadCSV(csv, 'festival-planning.csv');
          }}
          className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
        >
          <Download size={20} />
          Export CSV
        </button>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-700 mb-2">
          💡 Conseil : Glissez-déposez les ateliers pour les déplacer entre les salles ou les heures.
        </p>
        <p className="text-xs text-blue-600">
          Note : Les conflits horaires sont détectés automatiquement et empêchent le placement.
        </p>
      </div>
    </div>
  );
}
