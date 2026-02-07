import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ValentineButtons = ({ onYes, onNo }) => {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [dodgeCount, setDodgeCount] = useState(0);
  const [showCaption, setShowCaption] = useState(false);
  const containerRef = useRef(null);
  const noButtonRef = useRef(null);

  const dodgeButton = useCallback(() => {
    if (!containerRef.current || !noButtonRef.current) return;
    
    const container = containerRef.current.getBoundingClientRect();
    const button = noButtonRef.current.getBoundingClientRect();
    
    // Calculate safe bounds
    const maxX = (container.width / 2) - (button.width / 2) - 20;
    const maxY = 60;
    
    // Random position within bounds
    const newX = (Math.random() - 0.5) * 2 * maxX;
    const newY = (Math.random() - 0.5) * 2 * maxY;
    
    setNoPosition({ x: newX, y: newY });
    setDodgeCount(prev => prev + 1);
    setShowCaption(true);
    
    // Hide caption after a moment
    setTimeout(() => setShowCaption(false), 1500);
  }, []);

  const handleNoInteraction = (e) => {
    e.preventDefault();
    dodgeButton();
  };

  return (
    <motion.div
      ref={containerRef}
      className="flex flex-col items-center gap-6 p-8 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      data-testid="valentine-buttons"
    >
      {/* Yes Button */}
      <motion.button
        className="valentine-btn-yes text-lg sm:text-xl"
        onClick={onYes}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Yes, I will be your Valentine"
        data-testid="yes-button"
      >
        Yes! 💕
      </motion.button>
      
      {/* No Button Container */}
      <div className="relative h-20 w-full flex items-center justify-center">
        <motion.button
          ref={noButtonRef}
          className="valentine-btn-no absolute"
          animate={{ 
            x: noPosition.x, 
            y: noPosition.y,
            transition: { type: 'spring', stiffness: 300, damping: 20 }
          }}
          onMouseEnter={handleNoInteraction}
          onTouchStart={handleNoInteraction}
          onClick={handleNoInteraction}
          aria-label="No button - this button will dodge your click"
          data-testid="no-button"
        >
          No
        </motion.button>
      </div>
      
      {/* Dodge caption */}
      <AnimatePresence>
        {showCaption && (
          <motion.p
            className="absolute bottom-0 font-body text-sm text-[#5D4037]/70"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            data-testid="dodge-caption"
          >
            Nice try 😌
          </motion.p>
        )}
      </AnimatePresence>
      
      {/* Easter egg after many dodges */}
      {dodgeCount >= 5 && (
        <motion.p
          className="text-xs text-[#5D4037]/50 font-body"
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
