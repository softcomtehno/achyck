import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardNav from '../components/dashboard/DashboardNav';
import ProfileForm from '../components/dashboard/ProfileForm';
import ServicesList from '../components/dashboard/ServicesList';
import CasesList from '../components/dashboard/CasesList';
import ScheduleGrid from '../components/dashboard/ScheduleGrid';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'services' | 'schedule'>(
    'profile'
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Profile</span>
          </Link>
        </div>
      </header>

      <DashboardNav activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="max-w-4xl mx-auto px-4 py-6">
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <ProfileForm />
          </div>
        )}

        {activeTab === 'services' && (
          <div className="space-y-6">
            <ServicesList />
            <CasesList />
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="space-y-6">
            <ScheduleGrid />
          </div>
        )}
      </main>
    </div>
  );
}
