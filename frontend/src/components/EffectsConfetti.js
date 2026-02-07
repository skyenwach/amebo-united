import React, { useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';

export const EffectsConfetti = ({ active = false, onComplete }) => {
  const fireConfetti = useCallback(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    
    // Custom heart shape
    const heart = confetti.shapeFromPath({
      path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
    });
    
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 100,
      colors: ['#FF6B6B', '#FFD1DC', '#FFFDD0', '#FF8E8E', '#FFC0CB'],
      shapes: ['circle', 'square', heart],
      scalar: 1.2
    };
    
    const randomInRange = (min, max) => Math.random() * (max - min) + min;
    
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      
      if (timeLeft <= 0) {
        clearInterval(interval);
        onComplete?.();
        return;
      }
      
      const particleCount = 50 * (timeLeft / duration);
      
      // Confetti from both sides
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
    
    // Initial burst from center
    confetti({
      ...defaults,
      particleCount: 100,
      origin: { x: 0.5, y: 0.5 }
    });
    
    return () => clearInterval(interval);
  }, [onComplete]);
  
  useEffect(() => {
    if (active) {
      const cleanup = fireConfetti();
      return cleanup;
    }
  }, [active, fireConfetti]);
  
  return null; // Confetti renders on its own canvas
};

export default EffectsConfetti;
