import { User, Briefcase, Calendar } from 'lucide-react';

interface DashboardNavProps {
  activeTab: 'profile' | 'services' | 'schedule';
  onTabChange: (tab: 'profile' | 'services' | 'schedule') => void;
}

export default function DashboardNav({
  activeTab,
  onTabChange,
}: DashboardNavProps) {
  const tabs = [
    { id: 'profile' as const, label: 'Profile', icon: User },
    { id: 'services' as const, label: 'Services', icon: Briefcase },
    { id: 'schedule' as const, label: 'Schedule', icon: Calendar },
  ];

  return (
    <nav className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-4 h-14 font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-gray-900 dark:text-gray-100 border-b-2 border-gray-900 dark:border-gray-100'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
