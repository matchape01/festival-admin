import { useState } from 'react';
import type { Schedule, Workshop } from '../../types';
import { generateTimeSlots, SLOT_HEIGHT } from '../../utils/planning';
import { detectConflicts } from '../../utils/conflicts';
import { WorkshopBlock } from './WorkshopBlock';

interface PlanningBoardProps {
  schedule: Schedule;
  workshops: Workshop[];
  onUpdateScheduleItem: (workshopId: string, room: string, startTime: string, endTime: string) => void;
}

export function PlanningBoard({ schedule, workshops, onUpdateScheduleItem }: PlanningBoardProps) {
  const timeSlots = generateTimeSlots(9, 18, 30);
  const rooms = schedule.rooms;
  const conflicts = detectConflicts(schedule.schedule);
  const [dragOverCell, setDragOverCell] = useState<string | null>(null);

  const getWorkshop = (id: string) => workshops.find(w => w.id === id);
  const getConflictingWorkshops = (workshopId: string) => {
    return conflicts
      .filter(c => c.workshopIds.includes(workshopId))
      .flatMap(c => c.workshopIds)
      .filter(id => id !== workshopId);
  };

  const handleDragOver = (e: React.DragEvent, cellId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverCell(cellId);
  };

  const handleDrop = (e: React.DragEvent, time: string, room: string) => {
    e.preventDefault();
    setDragOverCell(null);

    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      const [hours, minutes] = time.split(':').map(Number);

      const startDate = new Date(schedule.schedule[0].startTime);
      startDate.setHours(hours, minutes, 0, 0);

      const endDate = new Date(startDate);
      endDate.setMinutes(endDate.getMinutes() + data.durationMins);

      const newStartTime = startDate.toISOString();
      const newEndTime = endDate.toISOString();

      onUpdateScheduleItem(data.workshopId, room, newStartTime, newEndTime);
    } catch (error) {
      console.error('Error processing drop:', error);
    }
  };

  const handleDragLeave = () => {
    setDragOverCell(null);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-32 min-w-32 sticky left-0 z-10 bg-gray-50">
                Horaire
              </th>
              {rooms.map(room => (
                <th
                  key={room}
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-80 min-w-80 border-l border-gray-200"
                >
                  {room}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((time) => (
              <tr key={time} className="border-b border-gray-100">
                <td className="px-4 py-2 text-xs font-medium text-gray-500 align-top border-r border-gray-200 bg-gray-50 sticky left-0 z-10">
                  {time}
                </td>
                {rooms.map(room => {
                  const cellId = `${time}-${room}`;
                  return (
                    <td
                      key={cellId}
                      className={`px-4 py-2 align-top border-r border-gray-200 relative transition-colors ${
                        dragOverCell === cellId
                          ? 'bg-blue-50 border-blue-300'
                          : 'bg-white hover:bg-gray-50/50'
                      }`}
                      style={{ minHeight: SLOT_HEIGHT }}
                      onDragOver={(e) => handleDragOver(e, cellId)}
                      onDrop={(e) => handleDrop(e, time, room)}
                      onDragLeave={handleDragLeave}
                    >
                      <div className="relative space-y-1">
                        {schedule.schedule
                          .filter(item => {
                            const itemDate = new Date(item.startTime);
                            const itemTime = `${String(itemDate.getHours()).padStart(2, '0')}:${String(itemDate.getMinutes()).padStart(2, '0')}`;
                            return item.room === room && itemTime === time;
                          })
                          .map(item => {
                            const workshop = getWorkshop(item.workshopId);
                            const conflicting = getConflictingWorkshops(item.workshopId);
                            if (!workshop) return null;

                            const startDate = new Date(item.startTime);
                            const endDate = new Date(item.endTime);
                            const durationMins = (endDate.getTime() - startDate.getTime()) / (1000 * 60);

                            return (
                              <WorkshopBlock
                                key={`${item.workshopId}-${item.startTime}`}
                                workshop={workshop}
                                startTime={item.startTime}
                                durationMins={durationMins}
                                hasConflict={conflicting.length > 0}
                                room={room}
                              />
                            );
                          })}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {conflicts.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm font-semibold text-red-700 mb-2">
            ⚠️ {conflicts.length} conflit(s) détecté(s)
          </p>
          <div className="space-y-1">
            {conflicts.map((conflict, idx) => (
              <p key={idx} className="text-xs text-red-600">
                • <strong>{conflict.room}</strong>: {new Date(conflict.startTime).toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'})} - {new Date(conflict.endTime).toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'})}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
