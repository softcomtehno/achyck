import { Metadata } from 'next';
import SpecialistProfile from '../app/maksat/page';

// Данные специалиста
const specialist = {
  name: 'Максат Каныбеков',
  experience: '4 года в IT, 3 года в менторстве',
  services: [
    'Создание Telegram-ботов',
    'Web Application',
    'Образовательные курсы',
    'Проведение хакатонов',
  ],
  phone: '+996 552 077970',
  bio: 'Я IT-специалист и ментор, помогаю создавать цифровые продукты и обучать команды.',
  image: '/maksat.jpg',
};

// ✅ Метаданные для OG/Twitter
export const metadata: Metadata = {
  title: specialist.name,
  description: specialist.bio,
  openGraph: {
    title: specialist.name,
    description: specialist.bio,
    images: [{ url: specialist.image }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: specialist.name,
    description: specialist.bio,
    images: [specialist.image],
  },
};

// ✅ Статическая страница
export default function Maksat() {
  return <SpecialistProfile />;
}
