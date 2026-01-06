import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Cases from '../components/Cases';
import Reviews from '../components/Reviews';
import BookingCalendar from '../components/BookingCalendar';

export default function PublicProfile() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <About />
      <Services />
      <Cases />
      <Reviews />
      <BookingCalendar />

      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">Weasy - Платформа для инди-специалистов</p>
        </div>
      </footer>
    </div>
  );
}
