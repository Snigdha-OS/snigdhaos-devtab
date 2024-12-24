import { motion } from 'framer-motion';
import { useSettings } from '../../hooks/useSettings';
import { useGreeting } from '../../hooks/useGreeting';

export function Welcome() {
  const { settings } = useSettings();
  const greeting = useGreeting();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center justify-center text-center mb-8 space-y-4"
    >
      <motion.h1
        className="text-5xl font-extrabold text-white tracking-wide"
        animate={{
          scale: [1, 1.05, 1],
          textShadow: [
            "0 0 10px rgba(255,255,255,0.7)",
            "0 0 20px rgba(255,255,255,0.5)",
            "0 0 30px rgba(255,255,255,0.3)"
          ]
        }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
      >
        {greeting}, <span className="text-indigo-400">{settings.user.name}</span>
      </motion.h1>
      <motion.p
        className="text-lg text-white/80 max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Let's make today <span className="text-indigo-300 font-medium">productive</span> and inspiring!
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="pt-4"
      >
        <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition transform hover:scale-105">
          Get Started
        </button>
      </motion.div>
    </motion.div>
  );
}
