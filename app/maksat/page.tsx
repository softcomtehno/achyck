// сlient сomponent
'use client';

import { useState } from 'react';
import BookingModal from '@/components/BookingModal';
import About from '@/components/profile/About';
import Cases from '@/components/profile/Cases';
import Header from '@/components/profile/Header';
import Reviews from '@/components/profile/Reviews';
import Services from '@/components/profile/Services';
import { notFound, useParams } from 'next/navigation';

interface Specialist {
  name: string;
  experience: string;
  services: string[];
  phone: string;
  bio: string;
  image?: string;
}
const specialists: Record<string, Specialist> = {
  maksat: {
    name: 'Максат Каныбеков',
    experience: '4 года в IT, 3 года в менторстве',
    services: [
      'Создание Telegram-ботов',
      'Web Application',
      'Образовательные курсы',
      'Проведение хакатонов',
    ],
    phone: '+996 552 077970',
    bio: 'IT-специалист и ментор, помогаю создавать цифровые продукты и команды',
  },
};

export default function Maksat() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header onBookClick={() => setIsBookingOpen(true)} />
      <About />
      <Services />
      <Cases />
      <Reviews />
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
}
