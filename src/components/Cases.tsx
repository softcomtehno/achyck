import { useData } from '../context/DataContext';

export default function Cases() {
  const { cases } = useData();

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
          Кейсы
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cases.map((caseStudy) => (
            <div
              key={caseStudy.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-200"
            >
              {caseStudy.imageUrl && (
                <img
                  src={caseStudy.imageUrl}
                  alt={caseStudy.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {caseStudy.title}
                </h3>
                <p className="text-gray-600 mb-4">{caseStudy.description}</p>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
