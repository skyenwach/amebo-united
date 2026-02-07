import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Realistic teddy bear image URL
const TEDDY_IMAGE = 'https://images.unsplash.com/photo-1747847386084-2b299514f40c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHw0fHxjdXRlJTIwcGx1c2glMjB0ZWRkeSUyMGJlYXIlMjBob2xkaW5nJTIwaGVhcnQlMjB2YWxlbnRpbmUlMjByb21hbnRpY3xlbnwwfHx8fDE3NzA1MDcwMzN8MA&ixlib=rb-4.1.0&q=85';

// Floating Heart component
const FloatingHeart = ({ delay, left, size, duration }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: `${left}%`, bottom: '-20px' }}
    initial={{ y: 0, opacity: 0 }}
    animate={{ 
      y: '-110vh', 
      opacity: [0, 0.5, 0.5, 0],
      rotate: [0, 15, -15, 0]
    }}
    transition={{ 
      duration: duration, 
      delay: delay, 
      repeat: Infinity,
      ease: 'linear'
    }}
  >
    <svg viewBox="0 0 24 24" fill="#FF6B6B" style={{ width: size, height: size, opacity: 0.6 }}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  </motion.div>
);

export const Landing3D = ({ onProceed }) => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

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
    }, 700);
  };

  // Generate floating hearts
  const hearts = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 10,
    size: 16 + Math.random() * 20,
    duration: 10 + Math.random() * 8
  }));

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-10 flex items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #1a1a1a 0%, #2d1f1f 50%, #1a1a1a 100%)'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          data-testid="landing-3d"
        >
          {/* Warm ambient light effect */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center bottom, rgba(255, 180, 120, 0.15) 0%, transparent 60%)'
            }}
          />
          
          {/* Floating hearts background */}
          {!reducedMotion && hearts.map((heart) => (
            <FloatingHeart
              key={heart.id}
              left={heart.left}
              delay={heart.delay}
              size={heart.size}
              duration={heart.duration}
            />
          ))}
          
          {/* Main content - Big Teddy Bear */}
          <motion.div
            className="relative flex flex-col items-center cursor-pointer"
            onClick={handleClick}
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ 
              type: 'spring', 
              stiffness: 80, 
              damping: 15,
              delay: 0.2 
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            role="button"
            aria-label="Click to open the Valentine's letter"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleClick()}
          >
            {/* Teddy Bear Image - Large and centered */}
            <motion.div
              className="relative"
              animate={!reducedMotion ? {
                y: [0, -10, 0],
              } : {}}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              {/* Glow effect behind teddy */}
              <div 
                className="absolute inset-0 blur-3xl opacity-40"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 180, 120, 0.5) 0%, transparent 70%)',
                  transform: 'scale(1.2)'
                }}
              />
              
              {/* Teddy image */}
              <motion.img
                src={TEDDY_IMAGE}
                alt="Cute teddy bear holding a heart"
                className="relative w-72 h-72 sm:w-96 sm:h-96 md:w-[450px] md:h-[450px] object-cover rounded-3xl"
                style={{
                  boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 100px rgba(255, 107, 107, 0.1)'
                }}
                onLoad={() => setImageLoaded(true)}
                initial={{ opacity: 0 }}
                animate={{ opacity: imageLoaded ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Envelope overlay on teddy */}
              <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                animate={!reducedMotion ? {
                  y: [0, -5, 0],
                  rotate: [0, 2, -2, 0]
                } : {}}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                {/* Envelope */}
                <div 
                  className="relative w-32 sm:w-40 h-20 sm:h-24"
                  style={{
                    background: 'linear-gradient(145deg, #FFF8E7 0%, #F5E6D3 100%)',
                    borderRadius: '4px',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.4)'
                  }}
                >
                  {/* Envelope flap */}
                  <div 
                    className="absolute -top-6 sm:-top-8 left-0 right-0"
                    style={{
                      width: 0,
                      height: 0,
                      borderLeft: '64px solid transparent',
                      borderRight: '64px solid transparent',
                      borderTop: '40px solid #E8D5C4',
                      margin: '0 auto'
                    }}
                  />
                  <div 
                    className="absolute -top-6 sm:-top-8 left-0 right-0 hidden sm:block"
                    style={{
                      width: 0,
                      height: 0,
                      borderLeft: '80px solid transparent',
                      borderRight: '80px solid transparent',
                      borderTop: '48px solid #E8D5C4',
                      margin: '0 auto'
                    }}
                  />
                  
                  {/* Heart seal */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <svg viewBox="0 0 24 24" fill="#FF6B6B" className="w-8 h-8 drop-shadow-lg">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </motion.div>
                  
                  {/* Click me text */}
                  <span 
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-script text-lg sm:text-xl text-white/90 whitespace-nowrap"
                    style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
                  >
                    Click me
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Hint text */}
          <motion.div
            className="absolute bottom-6 sm:bottom-10 left-0 right-0 flex justify-center pointer-events-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
          >
            <p 
              className="font-body text-sm text-white/60 bg-black/30 backdrop-blur-sm px-5 py-2.5 rounded-full"
            >
              Tap to open your letter 💕
            </p>
          </motion.div>
          
          {/* Skip button */}
          <motion.button
            className="absolute top-4 right-4 font-body text-sm text-white/50 hover:text-white/80 
                       bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full 
                       transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
            onClick={handleClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            aria-label="Skip animation and proceed to envelope"
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
