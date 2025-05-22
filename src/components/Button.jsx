import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, className = '', icon = null, ...props }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05, boxShadow: '0 4px 24px 0 rgba(59,130,246,0.15)' }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white rounded-full px-6 py-2 font-semibold shadow-lg transition-all duration-200 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 hover:from-blue-600 hover:to-blue-800 active:scale-95 ${className}`}
      {...props}
    >
      {icon && <span className="text-lg flex items-center">{icon}</span>}
      {children}
    </motion.button>
  );
};

export default Button; 