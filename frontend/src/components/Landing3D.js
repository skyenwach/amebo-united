import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Bear image as a rotatable interactive element
const InteractiveBearImage = ({ onHeartClick }) => {
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current || !isHovering) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      targetRotationRef.current.y = x * 15;
      targetRotationRef.current.x = y * 10;
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
      setIsHovering(false);
      targetRotationRef.current = { x: 0, y: 0 };
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isHovering]);

  // Animation loop for smooth rotation
  useEffect(() => {
    let animationId;
    const animate = () => {
      setRotation((prev) => ({
        x: prev.x + (targetRotationRef.current.x - prev.x) * 0.1,
        y: prev.y + (targetRotationRef.current.y - prev.y) * 0.1,
      }));
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        perspective: "1200px",
      }}
    >
      <motion.div
        onClick={onHeartClick}
        style={{
          rotateX: rotation.x,
          rotateY: rotation.y,
          transformStyle: "preserve-3d",
        }}
        animate={!isHovering ? { rotateY: [0, 360] } : {}}
        transition={
          !isHovering ? { duration: 8, repeat: Infinity, ease: "linear" } : {}
        }
        className="relative"
      >
        {/* SVG Bear with Pink Heart */}
        <svg
          viewBox="0 0 200 250"
          xmlns="http://www.w3.org/2000/svg"
          className="w-72 h-96 drop-shadow-2xl"
          style={{
            filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.4))",
          }}
        >
          {/* Bear holding heart - SVG */}
          <defs>
            <radialGradient id="bearGradient" cx="40%" cy="40%">
              <stop
                offset="0%"
                style={{ stopColor: "#ffffff", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#e8e8e8", stopOpacity: 1 }}
              />
            </radialGradient>
            <radialGradient id="heartGradient" cx="35%" cy="35%">
              <stop
                offset="0%"
                style={{ stopColor: "#ff7fb3", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#ff1493", stopOpacity: 1 }}
              />
            </radialGradient>
          </defs>

          {/* Body */}
          <ellipse
            cx="100"
            cy="140"
            rx="55"
            ry="65"
            fill="url(#bearGradient)"
            stroke="#d0d0d0"
            strokeWidth="1"
          />

          {/* Head */}
          <circle
            cx="100"
            cy="65"
            r="45"
            fill="url(#bearGradient)"
            stroke="#d0d0d0"
            strokeWidth="1"
          />

          {/* Left Ear */}
          <circle
            cx="65"
            cy="25"
            r="18"
            fill="url(#bearGradient)"
            stroke="#d0d0d0"
            strokeWidth="1"
          />

          {/* Right Ear */}
          <circle
            cx="135"
            cy="25"
            r="18"
            fill="url(#bearGradient)"
            stroke="#d0d0d0"
            strokeWidth="1"
          />

          {/* Snout */}
          <ellipse
            cx="100"
            cy="75"
            rx="22"
            ry="20"
            fill="#f5f5f5"
            stroke="#d0d0d0"
            strokeWidth="1"
          />

          {/* Eyes */}
          <circle cx="85" cy="55" r="5" fill="#000" />
          <circle cx="115" cy="55" r="5" fill="#000" />

          {/* Nose */}
          <ellipse cx="100" cy="78" rx="6" ry="7" fill="#000" />

          {/* Smile */}
          <path
            d="M 100 78 Q 94 87 88 85"
            stroke="#000"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 100 78 Q 106 87 112 85"
            stroke="#000"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Left Arm */}
          <ellipse
            cx="60"
            cy="110"
            rx="14"
            ry="40"
            fill="url(#bearGradient)"
            stroke="#d0d0d0"
            strokeWidth="1"
            transform="rotate(-30 60 110)"
          />

          {/* Right Arm */}
          <ellipse
            cx="140"
            cy="110"
            rx="14"
            ry="40"
            fill="url(#bearGradient)"
            stroke="#d0d0d0"
            strokeWidth="1"
            transform="rotate(30 140 110)"
          />

          {/* Left Leg */}
          <ellipse
            cx="75"
            cy="200"
            rx="16"
            ry="30"
            fill="url(#bearGradient)"
            stroke="#d0d0d0"
            strokeWidth="1"
          />

          {/* Right Leg */}
          <ellipse
            cx="125"
            cy="200"
            rx="16"
            ry="30"
            fill="url(#bearGradient)"
            stroke="#d0d0d0"
            strokeWidth="1"
          />

          {/* Heart - held by bear */}
          <g transform="translate(145, 105)">
            <motion.g
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path
                d="M 0,-10 C -10,-20 -25,-20 -25,-10 C -25,5 0,30 0,30 C 0,30 25,5 25,-10 C 25,-20 10,-20 0,-10 Z"
                fill="url(#heartGradient)"
                stroke="#ff1493"
                strokeWidth="0.5"
              />
            </motion.g>
          </g>
        </svg>
      </motion.div>
    </div>
  );
};

// Floating Heart component
const FloatingHeart = ({ delay, left, size, duration }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: `${left}%`, bottom: "-20px" }}
    initial={{ y: 0, opacity: 0 }}
    animate={{
      y: "-110vh",
      opacity: [0, 0.5, 0.5, 0],
      rotate: [0, 15, -15, 0],
    }}
    transition={{
      duration: duration,
      delay: delay,
      repeat: Infinity,
      ease: "linear",
    }}
  >
    <svg
      viewBox="0 0 24 24"
      fill="#FF6B6B"
      style={{ width: size, height: size, opacity: 0.6 }}
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  </motion.div>
);

export const Landing3D = ({ onProceed }) => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const handleHeartClick = () => {
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
    duration: 10 + Math.random() * 8,
  }));

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-10 flex items-center justify-center overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, #1a1a1a 0%, #2d1f1f 50%, #1a1a1a 100%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          data-testid="landing-3d"
        >
          {/* Warm ambient light effect */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center bottom, rgba(255, 180, 120, 0.15) 0%, transparent 60%)",
            }}
          />

          {/* Floating hearts background */}
          {!reducedMotion &&
            hearts.map((heart) => (
              <FloatingHeart
                key={heart.id}
                left={heart.left}
                delay={heart.delay}
                size={heart.size}
                duration={heart.duration}
              />
            ))}

          {/* Main content - Interactive Bear */}
          <motion.div
            className="relative w-full h-full md:w-[600px] md:h-[700px] flex items-center justify-center"
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 15,
              delay: 0.2,
            }}
          >
            <InteractiveBearImage onHeartClick={handleHeartClick} />
          </motion.div>

          {/* "Click the heart" text with glow effect */}
          <motion.div
            className="absolute bottom-24 sm:bottom-32 left-0 right-0 flex justify-center pointer-events-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <motion.p
              className="font-body text-lg sm:text-xl text-white/90 relative"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                textShadow: "0 0 20px rgba(255, 107, 107, 0.6)",
                letterSpacing: "0.05em",
                fontWeight: "500",
              }}
            >
              click the heart 💕
            </motion.p>
          </motion.div>

          {/* Hint text */}
          <motion.div
            className="absolute bottom-6 sm:bottom-10 left-0 right-0 flex justify-center pointer-events-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
          >
            <p className="font-body text-sm text-white/60 bg-black/30 backdrop-blur-sm px-5 py-2.5 rounded-full">
              hover to rotate 🐻
            </p>
          </motion.div>

          {/* Skip button */}
          <motion.button
            className="absolute top-4 right-4 font-body text-sm text-white/50 hover:text-white/80 
                       bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full 
                       transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
            onClick={handleHeartClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            aria-label="Skip animation and proceed"
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
