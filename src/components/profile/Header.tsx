import { Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockSpecialist } from '../../data/mockData';

interface HeaderProps {
  onBookClick: () => void;
}

export default function Header({ onBookClick }: HeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex justify-end mb-2">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 px-3 h-9 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <Settings className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
        </div>
        <div className="flex items-start gap-4">
          <img
            src={mockSpecialist.avatar}
            alt={mockSpecialist.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {mockSpecialist.name}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {mockSpecialist.title}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
              {mockSpecialist.bio}
            </p>
          </div>
        </div>
        <button
          onClick={onBookClick}
          className="w-full mt-6 h-12 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
        >
          Book a session
        </button>
      </div>
    </header>
  );
}
