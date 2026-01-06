import { useState } from 'react';
import { Calendar, Clock, X } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function BookingCalendar() {
  const { workingHours, addBooking } = useData();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');

  const generateTimeSlots = () => {
    const slots: string[] = [];
    const [startHour] = workingHours.startTime.split(':').map(Number);
    const [endHour] = workingHours.endTime.split(':').map(Number);

    for (let hour = startHour; hour < endHour; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    return slots;
  };

  const getDaysInWeek = (date: Date) => {
    const days: Date[] = [];
    const currentDate = new Date(date);
    const dayOfWeek = currentDate.getDay();
    const diff = currentDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);

    for (let i = 0; i < 7; i++) {
      const day = new Date(currentDate);
      day.setDate(diff + i);
      days.push(day);
    }
    return days;
  };

  const isWorkingDay = (date: Date) => {
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayName = dayNames[date.getDay()] as keyof typeof workingHours;
    return workingHours[dayName];
  };

  const handleBooking = () => {
    if (!clientName || !clientEmail || !selectedTime) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    const booking = {
      id: Date.now().toString(),
      clientName,
      clientEmail,
      clientPhone,
      date: selectedDate,
      time: selectedTime,
    };

    addBooking(booking);
    alert('Вы успешно записались!');
    setShowModal(false);
    setClientName('');
    setClientEmail('');
    setClientPhone('');
    setSelectedTime('');
  };

  const weekDays = getDaysInWeek(selectedDate);
  const timeSlots = generateTimeSlots();

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
          Запись к специалисту
        </h2>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('week')}
                className={`px-4 py-2 rounded-lg ${
                  viewMode === 'week'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                Неделя
              </button>
              <button
                onClick={() => setViewMode('month')}
                className={`px-4 py-2 rounded-lg ${
                  viewMode === 'month'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                Месяц
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  const newDate = new Date(selectedDate);
                  newDate.setDate(newDate.getDate() - 7);
                  setSelectedDate(newDate);
                }}
                className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                ←
              </button>
              <span className="font-semibold text-gray-900">
                {selectedDate.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}
              </span>
              <button
                onClick={() => {
                  const newDate = new Date(selectedDate);
                  newDate.setDate(newDate.getDate() + 7);
                  setSelectedDate(newDate);
                }}
                className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                →
              </button>
            </div>

            <button
              onClick={() => setSelectedDate(new Date())}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Сегодня
            </button>
          </div>

          {viewMode === 'week' && (
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              {weekDays.map((day) => {
                const isToday = day.toDateString() === new Date().toDateString();
                const isWorking = isWorkingDay(day);
                const isSelected = day.toDateString() === selectedDate.toDateString();

                return (
                  <div
                    key={day.toISOString()}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    } ${!isWorking ? 'opacity-50 bg-gray-50' : ''}`}
                    onClick={() => isWorking && setSelectedDate(day)}
                  >
                    <div className="text-center mb-2">
                      <div className="text-sm text-gray-600">
                        {day.toLocaleDateString('ru-RU', { weekday: 'short' })}
                      </div>
                      <div
                        className={`text-xl font-semibold ${
                          isToday ? 'text-blue-600' : 'text-gray-900'
                        }`}
                      >
                        {day.getDate()}
                      </div>
                    </div>
                    {isWorking && (
                      <div className="text-xs text-center text-green-600">
                        Доступно
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {isWorkingDay(selectedDate) && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Доступное время на {selectedDate.toLocaleDateString('ru-RU')}
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => {
                      setSelectedTime(time);
                      setShowModal(true);
                    }}
                    className="px-4 py-3 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center font-medium"
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>

              <h3 className="text-2xl font-bold mb-6">Подтверждение записи</h3>

              <div className="mb-4">
                <div className="flex items-center gap-2 text-gray-700 mb-2">
                  <Calendar className="w-5 h-5" />
                  <span>{selectedDate.toLocaleDateString('ru-RU')}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Clock className="w-5 h-5" />
                  <span>{selectedTime}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ваше имя *
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Введите ваше имя"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="example@mail.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+996 XXX XXX XXX"
                  />
                </div>
              </div>

              <button
                onClick={handleBooking}
                className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Подтвердить запись
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
