import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

export function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center text-white"
    >
      <motion.h1 
        className="text-8xl font-bold mb-2"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
      >
        {format(time, 'HH:mm')}
      </motion.h1>
      <p className="text-2xl opacity-80">{format(time, 'EEEE, MMMM d')}</p>
    </motion.div>
  );
}