import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PAPER_TEXTURE = 'https://images.unsplash.com/photo-1706271952285-01b5e3fc2d78?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHwyfHxvbGQlMjBwYXBlciUyMGxldHRlciUyMHRleHR1cmUlMjBjcmVhbSUyMHZpbnRhZ2V8ZW58MHx8fHwxNzcwNTA3MDU5fDA&ixlib=rb-4.1.0&q=85';

export const EnvelopeReveal = ({ onRevealComplete }) => {
  const [state, setState] = useState('envelope'); // 'envelope' -> 'opening' -> 'unfolding' -> 'unfolded'
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleEnvelopeClick = () => {
    if (state === 'envelope') {
      if (reducedMotion) {
        setState('unfolded');
        setTimeout(() => onRevealComplete?.(), 100);
      } else {
        setState('opening');
        setTimeout(() => setState('unfolding'), 800);
        setTimeout(() => {
          setState('unfolded');
          onRevealComplete?.();
        }, 2200);
      }
    }
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{
        background: state === 'unfolded' || state === 'unfolding' 
          ? 'rgba(10, 10, 10, 0.95)' 
          : 'linear-gradient(180deg, #1a1a1a 0%, #2d1f1f 50%, #1a1a1a 100%)'
      }}
      data-testid="envelope-reveal"
    >
      {/* Dark overlay transition */}
      <motion.div
        className="absolute inset-0 bg-black pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: state === 'unfolded' || state === 'unfolding' ? 0.85 : 0 }}
        transition={{ duration: 0.8 }}
      />

      <AnimatePresence mode="wait">
        {/* Envelope State */}
        {(state === 'envelope' || state === 'opening') && (
          <motion.div
            key="envelope"
            className="relative cursor-pointer z-10"
            onClick={handleEnvelopeClick}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -50 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            whileHover={state === 'envelope' ? { scale: 1.03 } : {}}
            role="button"
            aria-label="Click to open envelope"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleEnvelopeClick()}
            data-testid="envelope-clickable"
          >
            {/* Glow behind envelope */}
            <div 
              className="absolute inset-0 blur-3xl opacity-30"
              style={{
                background: 'radial-gradient(circle, rgba(255, 180, 120, 0.4) 0%, transparent 70%)',
                transform: 'scale(1.5)'
              }}
            />
            
            {/* Envelope body */}
            <div 
              className="relative w-72 h-48 sm:w-96 sm:h-64 rounded-lg overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, #FFF8E7 0%, #F5E6D3 100%)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(255, 180, 120, 0.15)'
              }}
            >
              {/* Envelope texture pattern */}
              <div 
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    45deg,
                    #8B7355 0px,
                    #8B7355 1px,
                    transparent 1px,
                    transparent 15px
                  )`
                }}
              />
              
              {/* Letter inside (visible peeking) */}
              <motion.div
                className="absolute left-4 right-4 bottom-3 h-44 sm:h-56 bg-white rounded-sm"
                initial={{ y: 0 }}
                animate={state === 'opening' ? { y: -200 } : { y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{
                  background: 'linear-gradient(180deg, #FFFEF5 0%, #FFF8E7 100%)',
                  boxShadow: 'inset 0 0 30px rgba(0,0,0,0.05)'
                }}
              />
              
              {/* Heart seal */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                animate={state === 'opening' ? { scale: 0, opacity: 0, rotate: 180 } : { scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <svg viewBox="0 0 24 24" fill="#E74C3C" className="w-14 h-14 drop-shadow-lg">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Envelope flap */}
            <motion.div
              className="absolute -top-1 left-0 right-0 h-32 origin-bottom"
              initial={{ rotateX: 0 }}
              animate={state === 'opening' ? { rotateX: 180 } : { rotateX: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
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
                  borderTop: '110px solid #E8D5C4',
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
                }}
              />
            </motion.div>
            
            {/* Hint text */}
            {state === 'envelope' && (
              <motion.p
                className="absolute -bottom-12 left-0 right-0 text-center font-body text-sm text-white/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Tap to open 💌
              </motion.p>
            )}
          </motion.div>
        )}

        {/* Unfolding Paper State */}
        {(state === 'unfolding' || state === 'unfolded') && (
          <motion.div
            key="paper"
            className="relative z-20 w-full h-full flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Paper unfolding animation */}
            <motion.div
              className="relative"
              initial={{ 
                scaleY: 0.3,
                scaleX: 0.8,
                rotateX: 80,
                y: 100
              }}
              animate={{ 
                scaleY: 1,
                scaleX: 1,
                rotateX: 0,
                y: 0
              }}
              transition={{ 
                duration: reducedMotion ? 0.1 : 1.2,
                ease: [0.34, 1.56, 0.64, 1]
              }}
              style={{
                transformOrigin: 'center top',
                perspective: '1000px'
              }}
              data-testid="revealed-card"
            >
              {/* Main paper/card */}
              <div 
                className="relative w-[90vw] max-w-lg sm:max-w-xl md:max-w-2xl aspect-[3/4] rounded-lg overflow-hidden"
                style={{
                  boxShadow: '0 30px 100px rgba(0,0,0,0.6), 0 0 60px rgba(255, 200, 150, 0.1)',
                  background: 'linear-gradient(180deg, #FFFEF5 0%, #FFF8E7 100%)'
                }}
              >
                {/* Paper texture overlay */}
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `url(${PAPER_TEXTURE})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    mixBlendMode: 'multiply'
                  }}
                />
                
                {/* Subtle fold lines */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/3 left-0 right-0 h-px bg-black/5" />
                  <div className="absolute top-2/3 left-0 right-0 h-px bg-black/5" />
                </div>
                
                {/* Content area - Placeholder for user's image */}
                <div className="relative h-full flex flex-col items-center justify-center p-6 sm:p-10">
                  {/* Decorative top hearts */}
                  <motion.div
                    className="flex gap-2 mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} viewBox="0 0 24 24" fill="#E74C3C" className="w-4 h-4 opacity-60">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    ))}
                  </motion.div>
                  
                  {/* Placeholder Image Area - User will replace this */}
                  <div 
                    className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-[#FFE4E1] via-[#FFF0F5] to-[#FFE4E1] flex items-center justify-center border-2 border-dashed border-[#E74C3C]/20"
                    data-testid="card-image-placeholder"
                    style={{
                      boxShadow: 'inset 0 0 30px rgba(231, 76, 60, 0.05)'
                    }}
                  >
                    {/* 
                      INSTRUCTIONS: Replace this div with your custom image:
                      <img src="/assets/val-card-placeholder.png" alt="Valentine card" className="w-full h-full object-cover" />
                    */}
                    <p className="font-body text-sm text-[#8B6B61]/60 text-center px-4">
                      Your custom image here
                    </p>
                  </div>
                  
                  {/* Main Valentine text */}
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8 }}
                  >
                    <h1 
                      className="font-script text-3xl sm:text-4xl md:text-5xl text-[#5D4037] leading-tight mb-2"
                      style={{ textShadow: '0 2px 10px rgba(0,0,0,0.05)' }}
                    >
                      Koco, my love,
                    </h1>
                    <h2 
                      className="font-script text-2xl sm:text-3xl md:text-4xl text-[#E74C3C]"
                      style={{ textShadow: '0 2px 10px rgba(231, 76, 60, 0.15)' }}
                    >
                      will you be my Valentine?
                    </h2>
                  </motion.div>
                  
                  {/* Bottom decorative hearts */}
                  <motion.div
                    className="flex gap-2 mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2 }}
                  >
                    {[...Array(3)].map((_, i) => (
                      <svg key={i} viewBox="0 0 24 24" fill="#E74C3C" className="w-5 h-5 opacity-50">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnvelopeReveal;
