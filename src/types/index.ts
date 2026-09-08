export interface Person {
  id: string;
  name: string;
  email: string;
  phone: string;
  roles: string[];
}

export interface Workshop {
  id: string;
  name: string;
  description: string;
  animators: string[];
  category: string;
  capacity: number;
  logistics: {
    equipment: string[];
    specialNeeds: string;
  };
  status: string;
}

export interface ScheduleItem {
  workshopId: string;
  startTime: string;
  endTime: string;
  room: string;
}

export interface Schedule {
  schedule: ScheduleItem[];
  rooms: string[];
  festivalDates: {
    start: string;
    end: string;
  };
}

export interface VolunteerAssignment {
  id: string;
  volunteerId: string;
  workshopId: string;
  role: string;
  status: string;
}

export interface ResourcesData {
  people: Person[];
  roles: string[];
}

export interface WorkshopsData {
  workshops: Workshop[];
}

export interface VolunteersData {
  assignments: VolunteerAssignment[];
}
