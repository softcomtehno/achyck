import { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { CaseStudy } from '../../types';

export default function CasesManager() {
  const { cases, addCase, updateCase, deleteCase } = useData();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<CaseStudy>>({
    title: '',
    description: '',
    technologies: [],
    imageUrl: '',
  });
  const [techInput, setTechInput] = useState('');

  const resetForm = () => {
    setFormData({ title: '', description: '', technologies: [], imageUrl: '' });
    setTechInput('');
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
      updateCase(editingId, formData as CaseStudy);
      alert('Кейс обновлен!');
    } else {
      const newCase: CaseStudy = {
        id: Date.now().toString(),
        title: formData.title!,
        description: formData.description!,
        technologies: formData.technologies || [],
        imageUrl: formData.imageUrl,
      };
      addCase(newCase);
      alert('Кейс добавлен!');
    }
    resetForm();
  };

  const handleEdit = (caseStudy: CaseStudy) => {
    setFormData(caseStudy);
    setEditingId(caseStudy.id);
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Вы уверены, что хотите удалить этот кейс?')) {
      deleteCase(id);
    }
  };

  const addTechnology = () => {
    if (techInput.trim()) {
      setFormData({
        ...formData,
        technologies: [...(formData.technologies || []), techInput.trim()],
      });
      setTechInput('');
    }
  };

  const removeTechnology = (index: number) => {
    setFormData({
      ...formData,
      technologies: formData.technologies?.filter((_, i) => i !== index),
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Управление кейсами</h2>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Добавить кейс
          </button>
        )}
      </div>

      {isAdding && (
        <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-xl font-semibold mb-4">
            {editingId ? 'Редактировать кейс' : 'Новый кейс'}
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
                placeholder="Например: BilimTrack"
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
                placeholder="Краткое описание проекта"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Изображение (URL)
              </label>
              <input
                type="text"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Технологии
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Например: React"
                />
                <button
                  type="button"
                  onClick={addTechnology}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Добавить
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.technologies?.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full flex items-center gap-2"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTechnology(index)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cases.map((caseStudy) => (
          <div
            key={caseStudy.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            {caseStudy.imageUrl && (
              <img
                src={caseStudy.imageUrl}
                alt={caseStudy.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-gray-900">{caseStudy.title}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(caseStudy)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(caseStudy.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 mb-3">{caseStudy.description}</p>
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
  );
}
