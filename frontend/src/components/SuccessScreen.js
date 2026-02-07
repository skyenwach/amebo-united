import React, { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';

export const SuccessScreen = ({ name = 'Koco' }) => {
  const cardRef = useRef(null);

  const handleSave = useCallback(async () => {
    if (!cardRef.current) return;
    
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#FFF5F7',
        scale: 2,
        useCORS: true
      });
      
      const link = document.createElement('a');
      link.download = `valentine-for-${name.toLowerCase()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Failed to save image:', error);
    }
  }, [name]);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      data-testid="success-screen"
    >
      {/* Success card */}
      <motion.div
        ref={cardRef}
        className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-2xl max-w-md w-full text-center"
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ 
          type: 'spring', 
          stiffness: 100, 
          damping: 15,
          delay: 0.2 
        }}
        style={{
          boxShadow: '0 25px 60px -15px rgba(255,107,107,0.4)'
        }}
      >
        {/* Celebration hearts */}
        <div className="flex justify-center gap-3 mb-6">
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                delay: 0.5 + i * 0.1,
                type: 'spring',
                stiffness: 200
              }}
            >
              <svg 
                viewBox="0 0 24 24" 
                fill="#FF6B6B" 
                className="w-5 h-5 sm:w-6 sm:h-6"
                style={{ opacity: 0.7 + (i % 3) * 0.1 }}
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </motion.div>
          ))}
        </div>
        
        {/* Main message */}
        <motion.h1
          className="font-script text-4xl sm:text-5xl text-[#5D4037] mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          Yay!
        </motion.h1>
        
        <motion.p
          className="font-script text-2xl sm:text-3xl text-[#FF6B6B] mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          Happy Valentine's, {name} 💗
        </motion.p>
        
        {/* Decorative line */}
        <motion.div
          className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FFD1DC] to-transparent mx-auto mb-6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        />
        
        {/* Sweet message */}
        <motion.p
          className="font-body text-[#5D4037]/80 text-sm sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          You make every day feel like Valentine's Day ✨
        </motion.p>
      </motion.div>
      
      {/* Save button */}
      <motion.button
        className="mt-8 font-body text-sm text-[#5D4037]/70 hover:text-[#5D4037] 
                   bg-white/60 hover:bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full
                   transition-all shadow-md hover:shadow-lg
                   focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
        onClick={handleSave}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6 }}
        aria-label="Save this moment as an image"
        data-testid="save-button"
      >
        📸 Save this moment
      </motion.button>
    </motion.div>
  );
};

export default SuccessScreen;
