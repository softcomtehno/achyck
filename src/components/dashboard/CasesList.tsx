import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { mockCases, Case } from '../../data/mockData';

export default function CasesList() {
  const [cases, setCases] = useState<Case[]>(mockCases);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    stack: '',
  });

  const handleAdd = () => {
    if (formData.name && formData.description && formData.stack) {
      const newCase: Case = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        stack: formData.stack,
      };
      setCases([...cases, newCase]);
      setFormData({ name: '', description: '', stack: '' });
      setIsAdding(false);
    }
  };

  const handleEdit = (caseItem: Case) => {
    setEditingId(caseItem.id);
    setFormData({
      name: caseItem.name,
      description: caseItem.description,
      stack: caseItem.stack,
    });
  };

  const handleUpdate = () => {
    if (formData.name && formData.description && formData.stack) {
      setCases(
        cases.map((c) =>
          c.id === editingId
            ? {
                ...c,
                name: formData.name,
                description: formData.description,
                stack: formData.stack,
              }
            : c
        )
      );
      setFormData({ name: '', description: '', stack: '' });
      setEditingId(null);
    }
  };

  const handleDelete = (id: string) => {
    setCases(cases.filter((c) => c.id !== id));
  };

  return (
    <div className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Cases
        </h2>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 h-10 px-4 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>

      {(isAdding || editingId) && (
        <div className="mb-4 p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Case name"
            className="w-full h-12 px-4 mb-3 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100"
          />
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Description"
            rows={3}
            className="w-full px-4 py-3 mb-3 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 resize-none"
          />
          <input
            type="text"
            value={formData.stack}
            onChange={(e) => setFormData({ ...formData, stack: e.target.value })}
            placeholder="Stack (e.g., React, Node.js, PostgreSQL)"
            className="w-full h-12 px-4 mb-3 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100"
          />
          <div className="flex gap-2">
            <button
              onClick={() => {
                setIsAdding(false);
                setEditingId(null);
                setFormData({ name: '', description: '', stack: '' });
              }}
              className="flex-1 h-10 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={editingId ? handleUpdate : handleAdd}
              className="flex-1 h-10 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              {editingId ? 'Update' : 'Add'}
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {cases.map((caseItem) => (
          <div
            key={caseItem.id}
            className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 dark:text-gray-100">
                  {caseItem.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {caseItem.description}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                  {caseItem.stack}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(caseItem)}
                  className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900"
                >
                  <Edit2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
                <button
                  onClick={() => handleDelete(caseItem.id)}
                  className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900"
                >
                  <Trash2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
