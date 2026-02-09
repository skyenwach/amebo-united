import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

// Interactive Bear Image with 3D rotation effect
const InteractiveBearImage = ({ onHeartClick, isHovering }) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });
  let animationId;

  // Handle mouse move for rotation
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isHovering || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      targetRotationRef.current.y = x * 15;
      targetRotationRef.current.x = y * 10;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isHovering]);

  // Smooth rotation animation loop
  useEffect(() => {
    const animate = () => {
      setRotation((prev) => ({
        x: prev.x + (targetRotationRef.current.x - prev.x) * 0.1,
        y: prev.y + (targetRotationRef.current.y - prev.y) * 0.1,
      }));

      // Auto-rotate when not hovering
      if (!isHovering) {
        targetRotationRef.current.y += 0.002;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isHovering]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
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
        className="relative"
        whileHover={{ scale: 1.05 }}
      >
        {/* Glow effect behind image */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-300 blur-3xl opacity-40 rounded-full scale-150" />

        <img
          ref={imageRef}
          src="/bear-heart.png"
          alt="Bear holding heart"
          className="w-80 h-auto drop-shadow-2xl rounded-lg relative z-10"
          style={{
            filter: "drop-shadow(0 30px 60px rgba(236, 72, 153, 0.4))",
            objectFit: "contain",
          }}
        />
      </motion.div>
    </div>
  );
};

// Rose petal component
const RosePetal = ({ delay, duration }) => (
  <motion.div
    className="absolute pointer-events-none"
    initial={{ x: 0, y: -50, opacity: 1, rotate: 0 }}
    animate={{
      y: window.innerHeight + 100,
      x: Math.sin(delay) * 100,
      opacity: 0,
      rotate: 360,
    }}
    transition={{ duration, delay, ease: "easeIn" }}
    style={{ fontSize: "24px" }}
  >
    🌹
  </motion.div>
);

// Envelope opening animation
const EnvelopeTransition = ({ isVisible }) => (
  <motion.div
    className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
    initial={{ opacity: 0 }}
    animate={{ opacity: isVisible ? 1 : 0 }}
    transition={{ duration: 0.3 }}
  >
    {/* Background blur */}
    <motion.div
      className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
    />

    {/* Envelope */}
    <motion.div
      className="relative w-80 h-48 rounded-lg overflow-hidden"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: isVisible ? 1 : 0.5, opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      {/* Envelope body */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-100 to-pink-50 rounded-lg shadow-2xl" />

      {/* Envelope flap - opens */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-rose-300 to-pink-200 origin-top rounded-t-lg"
        initial={{ rotateX: 0 }}
        animate={{ rotateX: isVisible ? -90 : 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        style={{ transformStyle: "preserve-3d" }}
      />

      {/* Light glow inside */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-transparent via-yellow-100 to-yellow-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 0.8 : 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      />

      {/* Sparkles */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3, delay: 0.7 }}
      >
        <div className="text-4xl">✨💕✨</div>
      </motion.div>
    </motion.div>
  </motion.div>
);

// Main Interactive Bear Component
export const InteractiveBear3D = ({ onProceed }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleHeartClick = () => {
    setIsClicked(true);
    // Faster transition - just 1 second
    setTimeout(() => {
      onProceed();
    }, 1000);
  };

  return (
    <motion.div
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isClicked ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, delay: isClicked ? 0.5 : 0 }}
    >
      {/* Background with romantic gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-200 via-pink-100 to-red-100" />

      {/* Animated background shapes */}
      <motion.div
        className="absolute top-10 right-20 w-72 h-72 bg-gradient-to-r from-pink-300 to-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 left-20 w-72 h-72 bg-gradient-to-r from-purple-300 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-rose-200 to-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Main 3D Bear */}
        <div
          className="relative w-full max-w-2xl h-96"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          style={{ cursor: "grab" }}
        >
          <InteractiveBearImage
            onHeartClick={handleHeartClick}
            isHovering={isHovering}
          />
        </div>

        {/* "Click the Heart" Text with enhanced styling */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.p
            className="text-3xl md:text-4xl font-light text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 mb-2"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ letterSpacing: "0.05em" }}
          >
            Click the heart
          </motion.p>
          <motion.p
            className="text-5xl"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            💕
          </motion.p>
        </motion.div>
      </div>

      {/* Floating Hearts - animated more artistically */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl opacity-40 pointer-events-none"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
          }}
          animate={{
            y: -100,
            x: Math.random() * window.innerWidth,
            rotate: Math.random() * 360,
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            delay: i * 0.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ❤️
        </motion.div>
      ))}

      {/* Skip button - subtle */}
      <motion.button
        className="absolute bottom-4 right-4 px-4 py-2 text-xs text-white/40 hover:text-white/70 transition-colors font-light tracking-widest"
        onClick={handleHeartClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: isClicked ? 0 : 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.1 }}
      >
        skip
      </motion.button>

      {/* Envelope Transition Overlay */}
      <EnvelopeTransition isVisible={isClicked} />
    </motion.div>
  );
};

export default InteractiveBear3D;
