import { Bot, Globe, GraduationCap, Rocket } from 'lucide-react';
import { useData } from '../context/DataContext';

const iconMap = {
  bot: Bot,
  globe: Globe,
  'graduation-cap': GraduationCap,
  rocket: Rocket,
};

export default function Services() {
  const { services } = useData();

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
          Услуги
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap];
            return (
              <div
                key={service.id}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-3">{service.description}</p>
                    <p className="text-sm text-blue-600 font-medium">
                      Длительность: {service.duration}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
