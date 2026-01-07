import { mockCases } from '../../data/mockData';

export default function Cases() {
  return (
    <section className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Cases
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {mockCases.map((caseItem) => (
            <div
              key={caseItem.id}
              className="flex-none w-72 p-4 border border-gray-200 dark:border-gray-800 rounded-lg"
            >
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                {caseItem.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {caseItem.description}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
                {caseItem.stack}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
