import { useState } from 'react';
import Header from '../components/profile/Header';
import About from '../components/profile/About';
import Services from '../components/profile/Services';
import Cases from '../components/profile/Cases';
import Reviews from '../components/profile/Reviews';
import BookingModal from '../components/BookingModal';

export default function ProfilePage() {
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
