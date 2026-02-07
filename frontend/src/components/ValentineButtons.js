import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ValentineButtons = ({ onYes, onNo }) => {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [dodgeCount, setDodgeCount] = useState(0);
  const [showCaption, setShowCaption] = useState(false);

  const dodgeButton = useCallback(() => {
    // Random position within bounds
    const maxX = 120;
    const maxY = 50;
    
    const newX = (Math.random() - 0.5) * 2 * maxX;
    const newY = (Math.random() - 0.5) * 2 * maxY;
    
    setNoPosition({ x: newX, y: newY });
    setDodgeCount(prev => prev + 1);
    setShowCaption(true);
    
    setTimeout(() => setShowCaption(false), 1500);
  }, []);

  const handleNoInteraction = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dodgeButton();
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-5 py-6 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      data-testid="valentine-buttons"
    >
      {/* Yes Button */}
      <motion.button
        className="relative px-12 py-4 text-lg sm:text-xl font-semibold text-white rounded-full
                   focus:outline-none focus:ring-4 focus:ring-[#E74C3C]/30"
        style={{
          background: 'linear-gradient(135deg, #E74C3C 0%, #C0392B 100%)',
          boxShadow: '0 8px 30px rgba(231, 76, 60, 0.4), 0 0 20px rgba(231, 76, 60, 0.2)'
        }}
        onClick={onYes}
        whileHover={{ scale: 1.05, boxShadow: '0 12px 40px rgba(231, 76, 60, 0.5)' }}
        whileTap={{ scale: 0.98 }}
        aria-label="Yes, I will be your Valentine"
        data-testid="yes-button"
      >
        <span className="relative z-10 font-body">Yes! 💕</span>
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 rounded-full overflow-hidden"
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        >
          <div 
            className="w-1/3 h-full"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)'
            }}
          />
        </motion.div>
      </motion.button>
      
      {/* No Button Container */}
      <div className="relative h-16 w-64 flex items-center justify-center">
        <motion.button
          className="absolute px-10 py-3 text-base font-medium text-white/70 rounded-full
                     border border-white/20 bg-white/5 backdrop-blur-sm
                     hover:bg-white/10 transition-colors
                     focus:outline-none focus:ring-2 focus:ring-white/30"
          animate={{ 
            x: noPosition.x, 
            y: noPosition.y,
            transition: { type: 'spring', stiffness: 400, damping: 25 }
          }}
          onMouseEnter={handleNoInteraction}
          onTouchStart={handleNoInteraction}
          onClick={handleNoInteraction}
          aria-label="No button - this button will dodge your click"
          data-testid="no-button"
        >
          <span className="font-body">No</span>
        </motion.button>
      </div>
      
      {/* Dodge caption */}
      <AnimatePresence>
        {showCaption && (
          <motion.p
            className="absolute -bottom-2 font-body text-sm text-white/60"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            data-testid="dodge-caption"
          >
            Nice try 😌
          </motion.p>
        )}
      </AnimatePresence>
      
      {/* Easter egg */}
      {dodgeCount >= 5 && (
        <motion.p
          className="text-xs text-white/40 font-body mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          The button really doesn't want to be clicked 💔
        </motion.p>
      )}
    </motion.div>
  );
};

export default ValentineButtons;
