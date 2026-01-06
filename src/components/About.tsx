import { useData } from '../context/DataContext';

export default function About() {
  const { profile } = useData();

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">О себе</h2>
        <p className="text-lg text-gray-700 leading-relaxed">{profile.about}</p>
      </div>
    </section>
  );
}
