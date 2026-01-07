import { useState } from 'react';
import { mockSchedule } from '../../data/mockData';

const weekDays = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье',
];

export default function ScheduleGrid() {
  const [workingDays, setWorkingDays] = useState<string[]>(
    mockSchedule.workingDays
  );
  const [timeRange, setTimeRange] = useState(mockSchedule.timeRange);

  const toggleDay = (day: string) => {
    if (workingDays.includes(day)) {
      setWorkingDays(workingDays.filter((d) => d !== day));
    } else {
      setWorkingDays([...workingDays, day]);
    }
  };

  const handleSave = () => {
    alert('Расписание сохранено!');
  };

  return (
    <div className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
        Schedule
      </h2>

      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
          Working Days
        </h3>
        <div className="space-y-2">
          {weekDays.map((day) => (
            <label
              key={day}
              className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-800 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900"
            >
              <input
                type="checkbox"
                checked={workingDays.includes(day)}
                onChange={() => toggleDay(day)}
                className="w-5 h-5 rounded border-gray-300 text-gray-900 focus:ring-gray-900 dark:border-gray-700 dark:text-gray-100 dark:focus:ring-gray-100"
              />
              <span className="text-gray-900 dark:text-gray-100">{day}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
          Working Hours
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
              Start Time
            </label>
            <input
              type="time"
              value={timeRange.start}
              onChange={(e) =>
                setTimeRange({ ...timeRange, start: e.target.value })
              }
              className="w-full h-12 px-4 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
              End Time
            </label>
            <input
              type="time"
              value={timeRange.end}
              onChange={(e) =>
                setTimeRange({ ...timeRange, end: e.target.value })
              }
              className="w-full h-12 px-4 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100"
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="w-full h-12 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
      >
        Save Schedule
      </button>
    </div>
  );
}
