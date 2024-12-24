import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-effect rounded-xl p-4 w-full max-w-xs"
    >
      <div className="flex justify-between items-center mb-2">
        <button 
          onClick={() => setCurrentDate(subMonths(currentDate, 1))}
          className="p-1 hover:bg-white/20 rounded transition-colors"
        >
          <ChevronLeft className="text-white w-4 h-4" />
        </button>
        <h2 className="text-sm font-bold text-white">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <button 
          onClick={() => setCurrentDate(addMonths(currentDate, 1))}
          className="p-1 hover:bg-white/20 rounded transition-colors"
        >
          <ChevronRight className="text-white w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-1">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="text-white/50 text-xs">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map(day => (
          <div
            key={format(day, 'yyyy-MM-dd')}
            className={`
              aspect-square flex items-center justify-center text-xs rounded
              ${!isSameMonth(day, currentDate) ? 'text-white/30' : 'text-white'}
              ${isToday(day) ? 'bg-white/20 font-bold' : ''}
            `}
          >
            {format(day, 'd')}
          </div>
        ))}
      </div>
    </motion.div>
  );
}