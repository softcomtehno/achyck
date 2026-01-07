import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { mockSpecialist } from '../../data/mockData';

export default function About() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between text-left"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            About
          </h2>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          )}
        </button>
        {isExpanded && (
          <div className="mt-4 text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {mockSpecialist.about}
          </div>
        )}
      </div>
    </section>
  );
}
