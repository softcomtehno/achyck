import { mockServices } from '../../data/mockData';

export default function Services() {
  return (
    <section className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Services
        </h2>
        <div className="space-y-3">
          {mockServices.map((service) => (
            <div
              key={service.id}
              className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                {service.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
