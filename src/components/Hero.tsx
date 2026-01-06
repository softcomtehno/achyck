import { useData } from '../context/DataContext';

export default function Hero() {
  const { profile } = useData();

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-48 h-48 rounded-full object-cover shadow-lg"
          />
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              {profile.name}
            </h1>
            <p className="text-xl text-gray-600 mb-6">{profile.title}</p>
            <p className="text-lg text-gray-700 leading-relaxed max-w-2xl">
              Помогаю создавать цифровые продукты и обучать команды
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
