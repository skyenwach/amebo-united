import React, { useMemo, useEffect, useState } from 'react';

const HeartSVG = ({ size = 20, color = '#FFD1DC', opacity = 0.4 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={color}
    style={{ opacity }}
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

export const FloatingHearts = ({ count = 12 }) => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const hearts = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 12 + Math.random() * 16,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 6,
      opacity: 0.2 + Math.random() * 0.3,
      color: ['#FFD1DC', '#FFC0CB', '#FF8E8E', '#FFFDD0'][Math.floor(Math.random() * 4)]
    }));
  }, [count]);

  if (reducedMotion) {
    // Static hearts for reduced motion
    return (
      <div className="floating-hearts" aria-hidden="true">
        {hearts.slice(0, 6).map((heart) => (
          <div
            key={heart.id}
            className="heart-particle"
            style={{
              left: `${heart.left}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
          >
            <HeartSVG 
              size={heart.size} 
              color={heart.color} 
              opacity={heart.opacity * 0.5}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="floating-hearts" aria-hidden="true">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart-particle"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
          }}
        >
          <HeartSVG 
            size={heart.size} 
            color={heart.color} 
            opacity={heart.opacity}
          />
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
