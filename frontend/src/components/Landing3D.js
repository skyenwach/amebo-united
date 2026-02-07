import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TeddyScene from './canvas/TeddyScene';

export const Landing3D = ({ onProceed }) => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleClick = () => {
    setIsExiting(true);
    setTimeout(() => {
      onProceed();
    }, 600);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          data-testid="landing-3d"
        >
          {/* 3D Canvas */}
          <div className="absolute inset-0">
            <TeddyScene 
              onTeddyClick={handleClick} 
              reducedMotion={reducedMotion}
            />
          </div>
          
          {/* Hint text */}
          <motion.div
            className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <p 
              className="font-body text-sm text-[#5D4037] bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full"
              aria-hidden="true"
            >
              Tap the teddy 💕
            </p>
          </motion.div>
          
          {/* Skip button for accessibility */}
          <motion.button
            className="absolute top-4 right-4 font-body text-sm text-[#5D4037]/60 hover:text-[#5D4037] 
                       bg-white/40 hover:bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full 
                       transition-colors pointer-events-auto focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
            onClick={handleClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            aria-label="Skip 3D animation and proceed to envelope"
            data-testid="skip-button"
          >
            Skip
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Landing3D;
