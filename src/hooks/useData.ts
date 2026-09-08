import { useState, useEffect } from 'react';
import resourcesData from '../data/resources.json';
import workshopsData from '../data/workshops.json';
import scheduleData from '../data/schedule.json';
import volunteersData from '../data/volunteers.json';
import type { ResourcesData, WorkshopsData, Schedule, VolunteersData } from '../types';
import { detectConflicts, hasConflict } from '../utils/conflicts';

export function useResources() {
  const [data, setData] = useState<ResourcesData>(() => {
    try {
      const stored = localStorage.getItem('festival-resources');
      return stored ? JSON.parse(stored) : resourcesData;
    } catch {
      return resourcesData;
    }
  });

  useEffect(() => {
    localStorage.setItem('festival-resources', JSON.stringify(data));
  }, [data]);

  const updatePerson = (id: string, updatedPerson: any) => {
    setData(prev => ({
      ...prev,
      people: prev.people.map(p => p.id === id ? { ...p, ...updatedPerson } : p)
    }));
  };

  const addPerson = (person: any) => {
    setData(prev => ({
      ...prev,
      people: [...prev.people, { ...person, id: Date.now().toString() }]
    }));
  };

  const deletePerson = (id: string) => {
    setData(prev => ({
      ...prev,
      people: prev.people.filter(p => p.id !== id)
    }));
  };

  return { data, updatePerson, addPerson, deletePerson };
}

export function useWorkshops() {
  const [data, setData] = useState<WorkshopsData>(() => {
    try {
      const stored = localStorage.getItem('festival-workshops');
      return stored ? JSON.parse(stored) : workshopsData;
    } catch {
      return workshopsData;
    }
  });

  useEffect(() => {
    localStorage.setItem('festival-workshops', JSON.stringify(data));
  }, [data]);

  const updateWorkshop = (id: string, updatedWorkshop: any) => {
    setData(prev => ({
      ...prev,
      workshops: prev.workshops.map(w => w.id === id ? { ...w, ...updatedWorkshop } : w)
    }));
  };

  const addWorkshop = (workshop: any) => {
    setData(prev => ({
      ...prev,
      workshops: [...prev.workshops, { ...workshop, id: `w${Date.now()}` }]
    }));
  };

  const deleteWorkshop = (id: string) => {
    setData(prev => ({
      ...prev,
      workshops: prev.workshops.filter(w => w.id !== id)
    }));
  };

  return { data, updateWorkshop, addWorkshop, deleteWorkshop };
}

export function useSchedule() {
  const [data, setData] = useState<Schedule>(() => {
    try {
      const stored = localStorage.getItem('festival-schedule');
      return stored ? JSON.parse(stored) : scheduleData;
    } catch {
      return scheduleData;
    }
  });

  useEffect(() => {
    localStorage.setItem('festival-schedule', JSON.stringify(data));
  }, [data]);

  const updateScheduleItem = (workshopId: string, updates: any) => {
    setData(prev => ({
      ...prev,
      schedule: prev.schedule.map(item =>
        item.workshopId === workshopId ? { ...item, ...updates } : item
      )
    }));
  };

  const updateScheduleItemDrop = (
    workshopId: string,
    newRoom: string,
    newStartTime: string,
    newEndTime: string
  ) => {
    setData(prev => {
      const conflict = hasConflict(workshopId, newRoom, newStartTime, newEndTime, prev.schedule);
      if (conflict) {
        console.warn('Conflict detected! Ignoring drop.');
        return prev;
      }

      return {
        ...prev,
        schedule: prev.schedule.map(item =>
          item.workshopId === workshopId
            ? { ...item, room: newRoom, startTime: newStartTime, endTime: newEndTime }
            : item
        )
      };
    });
  };

  const addScheduleItem = (item: any) => {
    setData(prev => ({
      ...prev,
      schedule: [...prev.schedule, item]
    }));
  };

  const deleteScheduleItem = (workshopId: string) => {
    setData(prev => ({
      ...prev,
      schedule: prev.schedule.filter(item => item.workshopId !== workshopId)
    }));
  };

  const getConflicts = () => detectConflicts(data.schedule);

  return { data, updateScheduleItem, updateScheduleItemDrop, addScheduleItem, deleteScheduleItem, getConflicts };
}

export function useVolunteers() {
  const [data, setData] = useState<VolunteersData>(() => {
    try {
      const stored = localStorage.getItem('festival-volunteers');
      return stored ? JSON.parse(stored) : volunteersData;
    } catch {
      return volunteersData;
    }
  });

  useEffect(() => {
    localStorage.setItem('festival-volunteers', JSON.stringify(data));
  }, [data]);

  const updateAssignment = (id: string, updates: any) => {
    setData(prev => ({
      ...prev,
      assignments: prev.assignments.map(a => a.id === id ? { ...a, ...updates } : a)
    }));
  };

  const addAssignment = (assignment: any) => {
    setData(prev => ({
      ...prev,
      assignments: [...prev.assignments, { ...assignment, id: `a${Date.now()}` }]
    }));
  };

  const deleteAssignment = (id: string) => {
    setData(prev => ({
      ...prev,
      assignments: prev.assignments.filter(a => a.id !== id)
    }));
  };

  return { data, updateAssignment, addAssignment, deleteAssignment };
}
