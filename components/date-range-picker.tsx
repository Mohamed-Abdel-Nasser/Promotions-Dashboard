import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; // Monday is 0, Sunday is 6
};

const MONTH_NAMES = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
];

const DAY_NAMES = ['الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت', 'الأحد'];

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (start: Date | null, end: Date | null) => void;
}

export function DateRangePicker({ startDate, endDate, onChange }: DateRangePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date(2026, 2, 1); // Default to March 2026
    return now;
  });
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDateClick = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      onChange(date, null);
    } else {
      if (date < startDate) {
        onChange(date, null);
      } else {
        onChange(startDate, date);
      }
    }
  };

  const isSelected = (date: Date) => {
    if (startDate && date.getTime() === startDate.getTime()) return true;
    if (endDate && date.getTime() === endDate.getTime()) return true;
    return false;
  };

  const isInRange = (date: Date) => {
    if (startDate && endDate) {
      return date > startDate && date < endDate;
    }
    if (startDate && hoverDate && !endDate) {
      return date > startDate && date < hoverDate;
    }
    return false;
  };

  const renderMonth = (year: number, month: number) => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days = [];

    const prevMonthDays = getDaysInMonth(year, month - 1);
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(
        <div key={`prev-${i}`} className="py-1 text-gray-300 text-center text-sm">
          {prevMonthDays - i}
        </div>
      );
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const selected = isSelected(date);
      const inRange = isInRange(date);
      const isStart = startDate && date.getTime() === startDate.getTime();
      const isEnd = endDate && date.getTime() === endDate.getTime();

      let bgClass = '';
      if (inRange) bgClass = 'bg-blue-50';
      if (isStart && (endDate || hoverDate) && date < (endDate || hoverDate!)) bgClass = 'bg-blue-50 rounded-r-full';
      if (isEnd) bgClass = 'bg-blue-50 rounded-l-full';
      if (isStart && isEnd) bgClass = 'bg-blue-50 rounded-full';

      days.push(
        <div 
          key={`current-${i}`} 
          className={`py-1 text-center text-sm cursor-pointer relative ${bgClass}`}
          onClick={() => handleDateClick(date)}
          onMouseEnter={() => setHoverDate(date)}
          onMouseLeave={() => setHoverDate(null)}
        >
          <div className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full transition-colors
            ${selected ? 'bg-blue-600 text-white font-bold' : 'hover:bg-gray-100 text-gray-900'}
          `}>
            {i}
          </div>
        </div>
      );
    }

    return (
      <div className="flex-1">
        <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-500 mb-2">
          {DAY_NAMES.map(day => <div key={day}>{day}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-y-1 gap-x-0">
          {days}
        </div>
      </div>
    );
  };

  const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);

  return (
    <div className="border-[3px] border-[#84cc16] rounded-xl p-4 mb-6 bg-white select-none">
      <div className="flex justify-between items-center mb-6 px-2">
        <button onClick={handleNextMonth} className="p-1 hover:bg-gray-100 rounded-full text-gray-600">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-32">
          <h3 className="font-bold text-lg text-gray-900">
            {MONTH_NAMES[nextMonth.getMonth()]} {nextMonth.getFullYear()}
          </h3>
          <h3 className="font-bold text-lg text-gray-900">
            {MONTH_NAMES[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h3>
        </div>
        <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 rounded-full text-gray-600">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      <div className="flex gap-8" dir="rtl">
        {renderMonth(currentMonth.getFullYear(), currentMonth.getMonth())}
        {renderMonth(nextMonth.getFullYear(), nextMonth.getMonth())}
      </div>
    </div>
  );
}
