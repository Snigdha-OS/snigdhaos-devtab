import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg text-white"
    >
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={prevMonth}
          className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-all"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <h2 className="text-2xl font-semibold tracking-wide">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <button
          onClick={nextMonth}
          className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-all"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-2 text-center mb-4">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
          <div key={day} className="text-sm font-medium text-white/70">
            {day}
          </div>
        ))}
      </div>

      {/* Dates */}
      <AnimatePresence mode="wait">
        <motion.div
          key={format(currentDate, 'yyyy-MM')}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="grid grid-cols-7 gap-2"
        >
          {days.map((day) => (
            <motion.div
              key={format(day, 'yyyy-MM-dd')}
              whileHover={{ scale: 1.1 }}
              className={`aspect-square flex items-center justify-center rounded-lg text-sm font-medium 
                transition-all duration-200 cursor-pointer
                ${
                  !isSameMonth(day, currentDate)
                    ? 'text-white/40 bg-transparent'
                    : 'text-white bg-white/10'
                }
                ${isToday(day) ? 'bg-purple-500 text-white font-bold shadow-lg' : ''}
              `}
            >
              {format(day, 'd')}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
