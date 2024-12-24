import { motion } from 'framer-motion';
import { useGreeting } from '../../hooks/useGreeting';

export function Welcome() {
  const greeting = useGreeting();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-8"
    >
      <motion.h1 
        className="text-4xl font-bold text-white mb-2"
        animate={{ 
          scale: [1, 1.02, 1],
          textShadow: ["0 0 8px rgba(255,255,255,0.5)", "0 0 16px rgba(255,255,255,0.2)"]
        }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      >
        {greeting}
      </motion.h1>
      <motion.p 
        className="text-white/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Let's make today productive
      </motion.p>
    </motion.div>
  );
}