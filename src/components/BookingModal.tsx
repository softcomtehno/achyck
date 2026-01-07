import { useState } from 'react';
import { X, Calendar, Clock } from 'lucide-react';
import { generateMockTimeSlots, TimeSlot } from '../data/mockData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type View = 'today' | 'week' | 'month';

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [view, setView] = useState<View>('week');
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', contact: '' });

  const timeSlots = generateMockTimeSlots();

  if (!isOpen) return null;

  const getVisibleSlots = () => {
    if (view === 'today') {
      const today = new Date().toISOString().split('T')[0];
      return timeSlots.filter((slot) => slot.date === today);
    }
    if (view === 'week') {
      return timeSlots;
    }
    return timeSlots;
  };

  const visibleSlots = getVisibleSlots();

  const groupSlotsByDate = () => {
    const grouped: { [key: string]: TimeSlot[] } = {};
    visibleSlots.forEach((slot) => {
      if (!grouped[slot.date]) {
        grouped[slot.date] = [];
      }
      grouped[slot.date].push(slot);
    });
    return grouped;
  };

  const groupedSlots = groupSlotsByDate();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (dateStr === today.toISOString().split('T')[0]) return 'Today';
    if (dateStr === tomorrow.toISOString().split('T')[0]) return 'Tomorrow';

    return date.toLocaleDateString('ru-RU', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSlot && formData.name && formData.contact) {
      alert(
        `Вы успешно записались!\n\nДата: ${formatDate(selectedSlot.date)}\nВремя: ${selectedSlot.time}\nИмя: ${formData.name}\nКонтакт: ${formData.contact}`
      );
      onClose();
      setShowForm(false);
      setSelectedSlot(null);
      setFormData({ name: '', contact: '' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-950 rounded-t-2xl sm:rounded-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 px-4 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Book a session
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {!showForm ? (
          <>
            <div className="flex gap-2 p-4 border-b border-gray-200 dark:border-gray-800">
              <button
                onClick={() => setView('today')}
                className={`px-4 h-10 rounded-lg font-medium transition-colors ${
                  view === 'today'
                    ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                    : 'bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100'
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setView('week')}
                className={`px-4 h-10 rounded-lg font-medium transition-colors ${
                  view === 'week'
                    ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                    : 'bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setView('month')}
                className={`px-4 h-10 rounded-lg font-medium transition-colors ${
                  view === 'month'
                    ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                    : 'bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100'
                }`}
              >
                Month
              </button>
            </div>

            <div className="p-4">
              {Object.entries(groupedSlots).map(([date, slots]) => (
                <div key={date} className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">
                      {formatDate(date)}
                    </h3>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {slots.map((slot) => (
                      <button
                        key={slot.id}
                        disabled={!slot.available}
                        onClick={() => setSelectedSlot(slot)}
                        className={`h-12 rounded-lg font-medium transition-colors ${
                          selectedSlot?.id === slot.id
                            ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                            : slot.available
                            ? 'bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800'
                            : 'bg-gray-50 dark:bg-gray-950 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex items-center justify-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span className="text-sm">{slot.time}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="sticky bottom-0 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 p-4">
              <button
                onClick={() => setShowForm(true)}
                disabled={!selectedSlot}
                className={`w-full h-12 rounded-lg font-medium transition-colors ${
                  selectedSlot
                    ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                }`}
              >
                Confirm booking
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="p-4">
            <div className="mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(selectedSlot!.date)}</span>
                <Clock className="w-4 h-4 ml-2" />
                <span>{selectedSlot!.time}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Your name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full h-12 px-4 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100"
                  placeholder="Введите ваше имя"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Phone or Email
                </label>
                <input
                  type="text"
                  value={formData.contact}
                  onChange={(e) =>
                    setFormData({ ...formData, contact: e.target.value })
                  }
                  required
                  className="w-full h-12 px-4 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100"
                  placeholder="+996 XXX XXX XXX или email"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 h-12 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 h-12 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                Confirm
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
