import { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Service } from '../../types';

export default function ServicesManager() {
  const { services, addService, updateService, deleteService } = useData();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Service>>({
    title: '',
    description: '',
    duration: '',
    icon: 'briefcase',
  });

  const iconOptions = [
    { value: 'bot', label: 'Бот' },
    { value: 'globe', label: 'Глобус' },
    { value: 'graduation-cap', label: 'Образование' },
    { value: 'rocket', label: 'Ракета' },
  ];

  const resetForm = () => {
    setFormData({ title: '', description: '', duration: '', icon: 'briefcase' });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      alert('Заполните все обязательные поля');
      return;
    }

    if (editingId) {
      updateService(editingId, formData as Service);
      alert('Услуга обновлена!');
    } else {
      const newService: Service = {
        id: Date.now().toString(),
        title: formData.title!,
        description: formData.description!,
        duration: formData.duration || '',
        icon: formData.icon || 'briefcase',
      };
      addService(newService);
      alert('Услуга добавлена!');
    }
    resetForm();
  };

  const handleEdit = (service: Service) => {
    setFormData(service);
    setEditingId(service.id);
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Вы уверены, что хотите удалить эту услугу?')) {
      deleteService(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Управление услугами</h2>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Добавить услугу
          </button>
        )}
      </div>

      {isAdding && (
        <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-xl font-semibold mb-4">
            {editingId ? 'Редактировать услугу' : 'Новая услуга'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Название *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Например: Создание Telegram-ботов"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Описание *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Краткое описание услуги"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Длительность
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Например: 2-4 недели"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Иконка
              </label>
              <select
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {iconOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-5 h-5" />
                {editingId ? 'Обновить' : 'Добавить'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="flex items-center gap-2 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <X className="w-5 h-5" />
                Отмена
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-2">{service.description}</p>
                {service.duration && (
                  <p className="text-sm text-blue-600">Длительность: {service.duration}</p>
                )}
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(service)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
