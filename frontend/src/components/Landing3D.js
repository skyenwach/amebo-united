import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Animated Teddy Bear using CSS/SVG
const TeddyBearSVG = ({ className }) => (
  <svg viewBox="0 0 200 220" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Body */}
    <ellipse cx="100" cy="145" rx="55" ry="65" fill="#D7B59C"/>
    
    {/* Left Leg */}
    <ellipse cx="65" cy="200" rx="22" ry="18" fill="#D7B59C"/>
    <ellipse cx="65" cy="200" rx="12" ry="10" fill="#B8956E"/>
    
    {/* Right Leg */}
    <ellipse cx="135" cy="200" rx="22" ry="18" fill="#D7B59C"/>
    <ellipse cx="135" cy="200" rx="12" ry="10" fill="#B8956E"/>
    
    {/* Left Arm */}
    <ellipse cx="45" cy="130" rx="18" ry="28" fill="#D7B59C" transform="rotate(-20 45 130)"/>
    
    {/* Right Arm */}
    <ellipse cx="155" cy="130" rx="18" ry="28" fill="#D7B59C" transform="rotate(20 155 130)"/>
    
    {/* Head */}
    <circle cx="100" cy="65" r="50" fill="#D7B59C"/>
    
    {/* Left Ear */}
    <circle cx="55" cy="25" r="18" fill="#D7B59C"/>
    <circle cx="55" cy="25" r="10" fill="#B8956E"/>
    
    {/* Right Ear */}
    <circle cx="145" cy="25" r="18" fill="#D7B59C"/>
    <circle cx="145" cy="25" r="10" fill="#B8956E"/>
    
    {/* Snout */}
    <ellipse cx="100" cy="80" rx="22" ry="18" fill="#B8956E"/>
    
    {/* Nose */}
    <ellipse cx="100" cy="75" rx="8" ry="6" fill="#4A4A4A"/>
    
    {/* Left Eye */}
    <circle cx="80" cy="55" r="8" fill="#2D2D2D"/>
    <circle cx="82" cy="53" r="3" fill="#FFFFFF"/>
    
    {/* Right Eye */}
    <circle cx="120" cy="55" r="8" fill="#2D2D2D"/>
    <circle cx="122" cy="53" r="3" fill="#FFFFFF"/>
    
    {/* Mouth (smile) */}
    <path d="M90 88 Q100 95 110 88" stroke="#4A4A4A" strokeWidth="2" fill="none" strokeLinecap="round"/>
    
    {/* Belly patch */}
    <ellipse cx="100" cy="150" rx="30" ry="35" fill="#E5CDB5"/>
  </svg>
);

// Envelope SVG
const EnvelopeSVG = ({ className, children }) => (
  <div className={`relative ${className}`}>
    {/* Envelope body */}
    <svg viewBox="0 0 120 80" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="10" width="110" height="65" rx="4" fill="#FFFDD0" stroke="#FFE4B5" strokeWidth="2"/>
      {/* Flap */}
      <polygon points="5,10 60,45 115,10" fill="#FFE4B5" stroke="#FFDAB9" strokeWidth="1"/>
      {/* Heart seal */}
      <circle cx="60" cy="35" r="8" fill="#FF6B6B"/>
    </svg>
    {children}
  </div>
);

// Floating Heart component
const FloatingHeart = ({ delay, left, size, duration }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: `${left}%`, bottom: '-20px' }}
    initial={{ y: 0, opacity: 0 }}
    animate={{ 
      y: '-100vh', 
      opacity: [0, 0.6, 0.6, 0],
      rotate: [0, 10, -10, 0]
    }}
    transition={{ 
      duration: duration, 
      delay: delay, 
      repeat: Infinity,
      ease: 'linear'
    }}
  >
    <svg viewBox="0 0 24 24" fill="#FFD1DC" style={{ width: size, height: size }}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  </motion.div>
);

export const Landing3D = ({ onProceed }) => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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

  // Generate floating hearts
  const hearts = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    size: 12 + Math.random() * 16,
    duration: 8 + Math.random() * 6
  }));

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-10 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          data-testid="landing-3d"
        >
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
          
          {/* Main content */}
          <motion.div
            className="relative flex flex-col items-center cursor-pointer"
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ 
              type: 'spring', 
              stiffness: 100, 
              damping: 15,
              delay: 0.3 
            }}
            whileHover={{ scale: 1.02 }}
            role="button"
            aria-label="Click to open the Valentine's letter"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleClick()}
          >
            {/* Teddy Bear */}
            <motion.div
              className="relative w-48 h-56 sm:w-56 sm:h-64"
              animate={!reducedMotion ? {
                y: [0, -8, 0],
                rotate: [-1, 1, -1]
              } : {}}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <TeddyBearSVG className="w-full h-full drop-shadow-xl" />
              
              {/* Envelope in teddy's arms */}
              <motion.div
                className="absolute bottom-12 left-1/2 -translate-x-1/2 w-28 sm:w-32"
                animate={!reducedMotion ? {
                  y: [0, -3, 0],
                  rotate: [0, 2, -2, 0]
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <EnvelopeSVG className="drop-shadow-lg">
                  {/* Click me text */}
                  <motion.span
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                               font-script text-base sm:text-lg text-[#5D4037] whitespace-nowrap
                               pointer-events-none select-none"
                    animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                  >
                    Click me
                  </motion.span>
                </EnvelopeSVG>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Hint text */}
          <motion.div
            className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <p 
              className="font-body text-sm text-[#5D4037] bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm"
              aria-hidden="true"
            >
              Tap the teddy to open the letter 💕
            </p>
          </motion.div>
          
          {/* Skip button for accessibility */}
          <motion.button
            className="absolute top-4 right-4 font-body text-sm text-[#5D4037]/60 hover:text-[#5D4037] 
                       bg-white/40 hover:bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full 
                       transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
            onClick={handleClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
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
