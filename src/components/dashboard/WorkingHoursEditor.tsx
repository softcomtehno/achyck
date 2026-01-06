import { useState } from 'react';
import { Save } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function WorkingHoursEditor() {
  const { workingHours, updateWorkingHours } = useData();
  const [formData, setFormData] = useState(workingHours);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateWorkingHours(formData);
    alert('Рабочий график обновлен!');
  };

  const days = [
    { key: 'monday' as const, label: 'Понедельник' },
    { key: 'tuesday' as const, label: 'Вторник' },
    { key: 'wednesday' as const, label: 'Среда' },
    { key: 'thursday' as const, label: 'Четверг' },
    { key: 'friday' as const, label: 'Пятница' },
    { key: 'saturday' as const, label: 'Суббота' },
    { key: 'sunday' as const, label: 'Воскресенье' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Рабочий график</h2>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Рабочие дни</h3>
          <div className="space-y-3">
            {days.map((day) => (
              <label key={day.key} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData[day.key]}
                  onChange={(e) =>
                    setFormData({ ...formData, [day.key]: e.target.checked })
                  }
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-700 font-medium">{day.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Рабочие часы</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Начало работы
              </label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Конец работы
              </label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Предпросмотр</h4>
          <p className="text-blue-800">
            Рабочие дни:{' '}
            {days
              .filter((day) => formData[day.key])
              .map((day) => day.label)
              .join(', ') || 'Не выбраны'}
          </p>
          <p className="text-blue-800 mt-1">
            Рабочие часы: {formData.startTime} - {formData.endTime}
          </p>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Save className="w-5 h-5" />
          Сохранить график
        </button>
      </form>
    </div>
  );
}
