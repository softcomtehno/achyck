import { createContext, useContext, useState, ReactNode } from 'react';
import { Profile, Service, CaseStudy, Review, WorkingHours, Booking } from '../types';

interface DataContextType {
  profile: Profile;
  updateProfile: (profile: Profile) => void;
  services: Service[];
  addService: (service: Service) => void;
  updateService: (id: string, service: Service) => void;
  deleteService: (id: string) => void;
  cases: CaseStudy[];
  addCase: (caseStudy: CaseStudy) => void;
  updateCase: (id: string, caseStudy: CaseStudy) => void;
  deleteCase: (id: string) => void;
  reviews: Review[];
  workingHours: WorkingHours;
  updateWorkingHours: (hours: WorkingHours) => void;
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const mockProfile: Profile = {
  id: '1',
  name: 'Максат Каныбеков',
  avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
  title: '4 года в IT · 3 года в менторстве',
  experienceYears: 4,
  mentoringYears: 3,
  phone: '+996 552 077 970',
  about: 'Я IT-специалист и ментор с 4-летним опытом в разработке и 3-летним опытом преподавания и менторства. Работаю с веб-приложениями, Telegram-ботами, образовательными проектами и организацией хакатонов.',
};

const mockServices: Service[] = [
  {
    id: '1',
    title: 'Создание Telegram-ботов',
    description: 'Разработка функциональных ботов для автоматизации бизнес-процессов, интеграция с платежами и внешними API',
    duration: '2-4 недели',
    icon: 'bot',
  },
  {
    id: '2',
    title: 'Web Application (Frontend / MVP)',
    description: 'Создание современных веб-приложений с использованием React, TypeScript и современного стека технологий',
    duration: '3-6 недель',
    icon: 'globe',
  },
  {
    id: '3',
    title: 'Образовательные курсы и менторство',
    description: 'Индивидуальное и групповое обучение программированию, code review, карьерное консультирование',
    duration: '1-3 месяца',
    icon: 'graduation-cap',
  },
  {
    id: '4',
    title: 'Проведение и организация хакатонов',
    description: 'Полный цикл организации хакатонов: от концепции до проведения мероприятия',
    duration: '1-2 месяца',
    icon: 'rocket',
  },
];

const mockCases: CaseStudy[] = [
  {
    id: '1',
    title: 'BilimTrack',
    description: 'Платформа рейтингов студентов с системой отслеживания успеваемости и аналитикой',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'],
    imageUrl: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '2',
    title: 'MakalaBox',
    description: 'Платформа для публикации научных статей с системой рецензирования и поиска',
    technologies: ['React', 'Express', 'MongoDB', 'Redux'],
    imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '3',
    title: 'Hackathon BashtUp',
    description: 'Организация и проведение хакатона для колледжа с онлайн-платформой для участников',
    technologies: ['Next.js', 'Supabase', 'Tailwind CSS'],
    imageUrl: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

const mockReviews: Review[] = [
  {
    id: '1',
    name: 'Айжан Сманова',
    text: 'Максат помог мне разобраться в React и TypeScript. Очень структурированный подход к обучению, всегда готов ответить на вопросы.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    id: '2',
    name: 'Нурбек Асанов',
    text: 'Создали Telegram-бота для нашего бизнеса за 3 недели. Работает стабильно, все требования были учтены. Рекомендую!',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    id: '3',
    name: 'Гульмира Токтогулова',
    text: 'Отличный организатор! Хакатон прошел на высоком уровне, все участники были довольны. Максат продумал каждую деталь.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
];

const mockWorkingHours: WorkingHours = {
  monday: true,
  tuesday: true,
  wednesday: true,
  thursday: true,
  friday: true,
  saturday: false,
  sunday: false,
  startTime: '10:00',
  endTime: '18:00',
};

export function DataProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile>(mockProfile);
  const [services, setServices] = useState<Service[]>(mockServices);
  const [cases, setCases] = useState<CaseStudy[]>(mockCases);
  const [reviews] = useState<Review[]>(mockReviews);
  const [workingHours, setWorkingHours] = useState<WorkingHours>(mockWorkingHours);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const updateProfile = (newProfile: Profile) => {
    setProfile(newProfile);
  };

  const addService = (service: Service) => {
    setServices([...services, service]);
  };

  const updateService = (id: string, updatedService: Service) => {
    setServices(services.map((s) => (s.id === id ? updatedService : s)));
  };

  const deleteService = (id: string) => {
    setServices(services.filter((s) => s.id !== id));
  };

  const addCase = (caseStudy: CaseStudy) => {
    setCases([...cases, caseStudy]);
  };

  const updateCase = (id: string, updatedCase: CaseStudy) => {
    setCases(cases.map((c) => (c.id === id ? updatedCase : c)));
  };

  const deleteCase = (id: string) => {
    setCases(cases.filter((c) => c.id !== id));
  };

  const updateWorkingHours = (hours: WorkingHours) => {
    setWorkingHours(hours);
  };

  const addBooking = (booking: Booking) => {
    setBookings([...bookings, booking]);
  };

  return (
    <DataContext.Provider
      value={{
        profile,
        updateProfile,
        services,
        addService,
        updateService,
        deleteService,
        cases,
        addCase,
        updateCase,
        deleteCase,
        reviews,
        workingHours,
        updateWorkingHours,
        bookings,
        addBooking,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
