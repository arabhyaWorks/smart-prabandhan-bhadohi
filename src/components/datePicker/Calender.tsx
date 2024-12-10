import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getDaysInMonth, MONTHS, generateYearRange } from '../../utils/dateUtils';

interface CalendarProps {
  date: Date;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  onMonthChange: (direction: 'prev' | 'next') => void;
  onMonthYearChange: (month: number, year: number) => void;
}

export function Calendar({ date, selectedDate, onDateSelect, onMonthChange, onMonthYearChange }: CalendarProps) {
  const days = getDaysInMonth(date);
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();
  const years = generateYearRange(new Date().getFullYear());

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onMonthYearChange(parseInt(e.target.value), currentYear);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onMonthYearChange(currentMonth, parseInt(e.target.value));
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => onMonthChange('prev')}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <div className="flex gap-2">
          <select
            value={currentMonth}
            onChange={handleMonthChange}
            className="text-sm border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {MONTHS.map((month, index) => (
              <option key={month} value={index}>
                {month}
              </option>
            ))}
          </select>
          
          <select
            value={currentYear}
            onChange={handleYearChange}
            className="text-sm border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => onMonthChange('next')}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <button
            key={index}
            onClick={() => day && onDateSelect(new Date(currentYear, currentMonth, day))}
            disabled={!day}
            className={`
              h-8 w-8 rounded-full flex items-center justify-center text-sm
              ${!day ? 'invisible' : 'hover:bg-gray-100'}
              ${selectedDate && day === selectedDate.getDate() && 
                currentMonth === selectedDate.getMonth() && 
                currentYear === selectedDate.getFullYear()
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'text-gray-700'}
            `}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
}