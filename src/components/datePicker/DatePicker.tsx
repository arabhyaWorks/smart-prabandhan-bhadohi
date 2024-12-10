import React, { useState, useRef, useEffect } from 'react';
import { Calendar } from './Calender';
import { Calendar as CalendarIcon } from 'lucide-react';
import { formatDate } from '../../utils/dateUtils';

interface DatePickerProps {
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
}

export function DatePicker({ value, onChange, placeholder = 'Select date...' }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(value || new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMonthChange = (direction: 'prev' | 'next') => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleMonthYearChange = (month: number, year: number) => {
    setCurrentDate(new Date(year, month, 1));
  };

  const handleDateSelect = (date: Date) => {
    onChange(date);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      <div
        className="flex items-center w-full px-3 py-2 border rounded-lg cursor-pointer hover:border-gray-400"
        onClick={() => setIsOpen(!isOpen)}
      >
        <CalendarIcon className="w-5 h-5 text-gray-500 mr-2" />
        <span className={value ? 'text-gray-900' : 'text-gray-500'}>
          {value ? formatDate(value) : placeholder}
        </span>
      </div>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 w-[280px]">
          <Calendar
            date={currentDate}
            selectedDate={value}
            onDateSelect={handleDateSelect}
            onMonthChange={handleMonthChange}
            onMonthYearChange={handleMonthYearChange}
          />
        </div>
      )}
    </div>
  );
}