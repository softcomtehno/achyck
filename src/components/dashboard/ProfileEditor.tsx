import { useState } from 'react';
import { Save } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function ProfileEditor() {
  const { profile, updateProfile } = useData();
  const [formData, setFormData] = useState(profile);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    alert('Профиль успешно обновлен!');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Редактирование профиля</h2>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Имя
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Фото (URL)
          </label>
          <input
            type="text"
            value={formData.avatar}
            onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {formData.avatar && (
            <img
              src={formData.avatar}
              alt="Preview"
              className="mt-3 w-32 h-32 rounded-full object-cover"
            />
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Опыт в IT (лет)
            </label>
            <input
              type="number"
              value={formData.experienceYears}
              onChange={(e) =>
                setFormData({ ...formData, experienceYears: parseInt(e.target.value) })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Опыт в менторстве (лет)
            </label>
            <input
              type="number"
              value={formData.mentoringYears}
              onChange={(e) =>
                setFormData({ ...formData, mentoringYears: parseInt(e.target.value) })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Телефон
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            О себе
          </label>
          <textarea
            value={formData.about}
            onChange={(e) => setFormData({ ...formData, about: e.target.value })}
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Save className="w-5 h-5" />
          Сохранить изменения
        </button>
      </form>
    </div>
  );
}
