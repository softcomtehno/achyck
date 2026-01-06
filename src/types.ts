export interface Profile {
  id: string;
  name: string;
  avatar: string;
  title: string;
  experienceYears: number;
  mentoringYears: number;
  phone: string;
  about: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  duration: string;
  icon: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
}

export interface Review {
  id: string;
  name: string;
  text: string;
  rating: number;
  avatar?: string;
}

export interface TimeSlot {
  date: Date;
  time: string;
  available: boolean;
}

export interface WorkingHours {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  startTime: string;
  endTime: string;
}

export interface Booking {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  date: Date;
  time: string;
  serviceId?: string;
}
