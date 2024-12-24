import { useState } from 'react';
import { motion } from 'framer-motion';

export function Calculator() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleNumber = (num: string) => {
    setDisplay(prev => prev === '0' ? num : prev + num);
  };

  const handleOperator = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const calculate = () => {
    try {
      const result = eval(equation + display);
      setDisplay(result.toString());
      setEquation('');
    } catch (error) {
      setDisplay('Error');
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
    >
      <div className="bg-black/20 rounded-lg p-4 mb-4">
        <div className="text-white/60 text-sm h-6">{equation}</div>
        <div className="text-white text-2xl font-bold text-right">{display}</div>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', '0', '.', '=', '+'].map((btn) => (
          <button
            key={btn}
            onClick={() => {
              switch (btn) {
                case '=': calculate(); break;
                case '÷': handleOperator('/'); break;
                case '×': handleOperator('*'); break;
                case '+':
                case '-': handleOperator(btn); break;
                default: handleNumber(btn);
              }
            }}
            className={`p-3 rounded-lg backdrop-blur-sm text-white font-medium
              ${btn === '=' ? 'bg-purple-500/50 hover:bg-purple-500/70' : 'bg-white/10 hover:bg-white/20'}
              transition-colors`}
          >
            {btn}
          </button>
        ))}
      </div>
    </motion.div>
  );
}