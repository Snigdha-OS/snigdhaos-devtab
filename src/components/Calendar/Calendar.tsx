import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
    >
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={prevMonth}
          className="p-2 hover:bg-white/20 rounded-lg transition-colors"
        >
          <ChevronLeft className="text-white" />
        </button>
        <h2 className="text-xl font-bold text-white">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <button 
          onClick={nextMonth}
          className="p-2 hover:bg-white/20 rounded-lg transition-colors"
        >
          <ChevronRight className="text-white" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="text-white/50 text-sm font-medium">
            {day}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={format(currentDate, 'yyyy-MM')}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="grid grid-cols-7 gap-1"
        >
          {days.map(day => (
            <motion.div
              key={format(day, 'yyyy-MM-dd')}
              whileHover={{ scale: 1.1 }}
              className={`
                aspect-square flex items-center justify-center rounded-full text-sm
                ${!isSameMonth(day, currentDate) ? 'text-white/30' : 'text-white'}
                ${isToday(day) ? 'bg-white/20 font-bold' : ''}
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