import type { Workshop } from '../../types';
import { Grip } from 'lucide-react';

interface WorkshopBlockProps {
  workshop: Workshop;
  startTime: string;
  durationMins: number;
  hasConflict: boolean;
  room: string;
}

export function WorkshopBlock({
  workshop,
  startTime,
  durationMins,
  hasConflict,
  room,
}: WorkshopBlockProps) {
  const height = Math.ceil((durationMins / 30) * 40);
  const startDate = new Date(startTime);
  const endDate = new Date(startDate.getTime() + durationMins * 60000);

  const statusColors: Record<string, string> = {
    Confirmed: 'bg-green-100 border-green-300 text-green-900',
    Planned: 'bg-blue-100 border-blue-300 text-blue-900',
    Cancelled: 'bg-gray-100 border-gray-300 text-gray-900',
  };

  const conflictClass = hasConflict
    ? 'border-2 border-red-500 bg-red-50 animate-pulse'
    : statusColors[workshop.status] || 'bg-blue-100 border-blue-300 text-blue-900';

  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData(
          'application/json',
          JSON.stringify({
            workshopId: workshop.id,
            workshopName: workshop.name,
            currentRoom: room,
            startTime,
            durationMins,
          })
        );
      }}
      className={`p-2 rounded border cursor-move select-none transition-all hover:shadow-lg ${conflictClass}`}
      style={{
        minHeight: `${height}px`,
        backgroundColor: hasConflict ? 'rgba(255,0,0,0.1)' : undefined,
      }}
      title={`${workshop.name}\n${startDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} - ${endDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`}
    >
      <div className="flex items-start gap-1">
        <Grip size={14} className="flex-shrink-0 opacity-50 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="font-medium text-xs truncate">{workshop.name}</p>
          <p className="text-xs opacity-75">
            {startDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
          </p>
          {hasConflict && (
            <p className="text-xs font-semibold text-red-600 mt-1">
              ⚠️ Conflit
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
