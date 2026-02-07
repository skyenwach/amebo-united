import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const envelopeStates = ['closed', 'flap_open', 'slide_out', 'unfolding', 'unfolded'];

export const EnvelopeReveal = ({ onRevealComplete }) => {
  const [state, setState] = useState('closed');
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleEnvelopeClick = () => {
    if (state === 'closed') {
      if (reducedMotion) {
        setState('unfolded');
        setTimeout(() => onRevealComplete?.(), 100);
      } else {
        setState('flap_open');
        setTimeout(() => setState('slide_out'), 500);
        setTimeout(() => setState('unfolding'), 1200);
        setTimeout(() => {
          setState('unfolded');
          onRevealComplete?.();
        }, 2000);
      }
    }
  };

  const springTransition = { type: 'spring', stiffness: 100, damping: 20 };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      data-testid="envelope-reveal"
    >
      <AnimatePresence mode="wait">
        {state !== 'unfolded' ? (
          <motion.div
            key="envelope"
            className="relative cursor-pointer"
            onClick={handleEnvelopeClick}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={springTransition}
            whileHover={state === 'closed' ? { scale: 1.02 } : {}}
            role="button"
            aria-label="Click to open envelope"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleEnvelopeClick()}
            data-testid="envelope-clickable"
          >
            {/* Envelope body */}
            <div 
              className="relative w-72 h-48 sm:w-80 sm:h-52 rounded-lg shadow-xl overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, #FFFDD0 0%, #FFE4B5 100%)',
                boxShadow: '0 10px 40px -10px rgba(255,107,107,0.3)'
              }}
            >
              {/* Envelope inner pattern */}
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    45deg,
                    #FF6B6B 0px,
                    #FF6B6B 1px,
                    transparent 1px,
                    transparent 10px
                  )`
                }}
              />
              
              {/* Heart seal */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                animate={state !== 'closed' ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="#FF6B6B" className="w-10 h-10 drop-shadow-md">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </div>
              </motion.div>
              
              {/* Letter inside */}
              <motion.div
                className="absolute left-4 right-4 bottom-4 h-36 bg-white rounded-md shadow-inner"
                initial={{ y: 0 }}
                animate={
                  state === 'slide_out' || state === 'unfolding' || state === 'unfolded'
                    ? { y: -180 }
                    : { y: 0 }
                }
                transition={{ duration: 0.7, ease: 'easeOut' }}
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1695131021220-2f3514baaf9e?crop=entropy&cs=srgb&fm=jpg&q=85)',
                  backgroundSize: 'cover',
                  backgroundBlendMode: 'overlay',
                  backgroundColor: 'rgba(255,255,255,0.95)'
                }}
              />
            </div>
            
            {/* Envelope flap */}
            <motion.div
              className="absolute -top-1 left-0 right-0 h-24 origin-bottom"
              initial={{ rotateX: 0 }}
              animate={
                state === 'flap_open' || state === 'slide_out' || state === 'unfolding'
                  ? { rotateX: 180 }
                  : { rotateX: 0 }
              }
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{ 
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              <div 
                className="w-0 h-0 mx-auto"
                style={{
                  borderLeft: '144px solid transparent',
                  borderRight: '144px solid transparent',
                  borderTop: '96px solid #FFE4B5',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                }}
              />
            </motion.div>
            
            {/* Click hint */}
            {state === 'closed' && (
              <motion.p
                className="absolute -bottom-10 left-0 right-0 text-center font-body text-sm text-[#5D4037]/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Tap to open 💌
              </motion.p>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="card"
            className="relative"
            initial={{ opacity: 0, scale: 0.5, rotateX: 90 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ 
              duration: reducedMotion ? 0.1 : 0.8, 
              ease: [0.34, 1.56, 0.64, 1] 
            }}
            data-testid="revealed-card"
          >
            {/* Unfolded card */}
            <div 
              className="relative w-80 sm:w-96 rounded-3xl shadow-2xl overflow-hidden"
              style={{
                boxShadow: '0 25px 60px -15px rgba(255,107,107,0.4)'
              }}
            >
              {/* Paper texture background */}
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1695131021220-2f3514baaf9e?crop=entropy&cs=srgb&fm=jpg&q=85)',
                  backgroundSize: 'cover',
                  mixBlendMode: 'multiply'
                }}
              />
              
              {/* Card content */}
              <div className="relative bg-white/95 p-6 sm:p-8">
                {/* Placeholder image area */}
                <div 
                  className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-gradient-to-br from-[#FFD1DC] to-[#FFFDD0] flex items-center justify-center"
                  data-testid="card-image-placeholder"
                >
                  {/* Instructions: Replace this with your own image */}
                  {/* Use: <img src="/assets/val-card-placeholder.png" alt="Valentine card" className="w-full h-full object-cover" /> */}
                  <div className="text-center p-4">
                    <p className="font-script text-3xl sm:text-4xl text-[#5D4037] mb-2">
                      Will you be my Valentine?
                    </p>
                    <p className="font-body text-sm text-[#5D4037]/60">
                      — for Koco 💕
                    </p>
                  </div>
                </div>
                
                {/* Decorative hearts */}
                <div className="flex justify-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <svg viewBox="0 0 24 24" fill="#FF6B6B" className="w-4 h-4 opacity-60">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnvelopeReveal;
