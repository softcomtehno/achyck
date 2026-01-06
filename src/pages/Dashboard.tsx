import { useState } from 'react';
import { User, Briefcase, FolderOpen, Clock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProfileEditor from '../components/dashboard/ProfileEditor';
import ServicesManager from '../components/dashboard/ServicesManager';
import CasesManager from '../components/dashboard/CasesManager';
import WorkingHoursEditor from '../components/dashboard/WorkingHoursEditor';

type TabType = 'profile' | 'services' | 'cases' | 'schedule';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('profile');

  const tabs = [
    { id: 'profile' as TabType, label: 'Профиль', icon: User },
    { id: 'services' as TabType, label: 'Услуги', icon: Briefcase },
    { id: 'cases' as TabType, label: 'Кейсы', icon: FolderOpen },
    { id: 'schedule' as TabType, label: 'Рабочий график', icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Панель управления</h1>
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              К публичной странице
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 font-medium border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'profile' && <ProfileEditor />}
            {activeTab === 'services' && <ServicesManager />}
            {activeTab === 'cases' && <CasesManager />}
            {activeTab === 'schedule' && <WorkingHoursEditor />}
          </div>
        </div>
      </div>
    </div>
  );
}
