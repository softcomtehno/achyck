import { Star } from 'lucide-react';
import { mockReviews } from '../../data/mockData';

export default function Reviews() {
  return (
    <section className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Reviews
        </h2>
        <div className="space-y-4">
          {mockReviews.map((review) => (
            <div
              key={review.id}
              className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {review.name}
                </span>
                <div className="flex gap-0.5">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-gray-900 dark:fill-gray-100 text-gray-900 dark:text-gray-100"
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {review.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
