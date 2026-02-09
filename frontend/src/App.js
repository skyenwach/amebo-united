import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import html2canvas from "html2canvas";
import InteractiveBear3D from "./components/InteractiveBear3D";

const PAPER_TEXTURE =
  "https://images.unsplash.com/photo-1706271952285-01b5e3fc2d78?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHwyfHxvbGQlMjBwYXBlciUyMGxldHRlciUyMHRleHR1cmUlMjBjcmVhbSUyMHZpbnRhZ2V8ZW58MHx8fHwxNzcwNTA3MDU5fDA&ixlib=rb-4.1.0&q=85";

const CONFIG = {
  GIRLFRIEND_NAME: "Koco",
};

// Floating Heart
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

// Typewriter effect component
const Typewriter = ({ text, delay = 0, speed = 60, className = "" }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          // Hide cursor after typing is done
          setTimeout(() => setShowCursor(false), 500);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay, speed]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && <span className="animate-pulse">|</span>}
    </span>
  );
};

function App() {
  const [state, setState] = useState("landing"); // 'landing' | 'paper' | 'success'
  const [reducedMotion, setReducedMotion] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [showNiceCaption, setShowNiceCaption] = useState(false);
  const [dodgeCount, setDodgeCount] = useState(0);
  const cardRef = React.useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Hearts for background
  const hearts = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 10,
    size: 16 + Math.random() * 20,
    duration: 10 + Math.random() * 8,
  }));

  const handleEnvelopeClick = () => {
    setState("paper");
  };

  const handleYes = () => {
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 100,
      colors: ["#FF6B6B", "#FFD1DC", "#FFFDD0", "#FF8E8E", "#E74C3C"],
      shapes: ["circle", "square"],
      scalar: 1.2,
    };

    confetti({ ...defaults, particleCount: 100, origin: { x: 0.5, y: 0.5 } });
    setTimeout(
      () =>
        confetti({
          ...defaults,
          particleCount: 50,
          origin: { x: 0.3, y: 0.6 },
        }),
      200,
    );
    setTimeout(
      () =>
        confetti({
          ...defaults,
          particleCount: 50,
          origin: { x: 0.7, y: 0.6 },
        }),
      400,
    );

    setState("success");
  };

  const dodgeNo = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const maxX = 80;
    const maxY = 30;
    setNoPosition({
      x: (Math.random() - 0.5) * 2 * maxX,
      y: (Math.random() - 0.5) * 2 * maxY,
    });
    setDodgeCount((prev) => prev + 1);
    setShowNiceCaption(true);
    setTimeout(() => setShowNiceCaption(false), 1500);
  };

  const handleSave = useCallback(async () => {
    if (!cardRef.current) return;
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#1a1a1a",
        scale: 2,
        useCORS: true,
      });
      const link = document.createElement("a");
      link.download = `valentine-for-${CONFIG.GIRLFRIEND_NAME.toLowerCase()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Failed to save:", error);
    }
  }, []);

  return (
    <div
      className="valentine-app min-h-screen min-h-[100dvh] overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #1a1a1a 0%, #2d1f1f 50%, #1a1a1a 100%)",
      }}
      data-testid="valentine-app"
    >
      {/* Floating hearts */}
      {!reducedMotion &&
        hearts.map((heart) => <FloatingHeart key={heart.id} {...heart} />)}

      {/* Warm ambient glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center bottom, rgba(255, 180, 120, 0.15) 0%, transparent 60%)",
        }}
      />

      <AnimatePresence mode="wait">
        {/* LANDING - Interactive 3D Bear with Heart */}
        {state === "landing" && (
          <InteractiveBear3D onProceed={handleEnvelopeClick} />
        )}

        {/* PAPER - Unfolded with Question, Buttons, and Placeholder */}
        {state === "paper" && (
          <motion.div
            key="paper"
            className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 228, 196, 0.95) 0%, rgba(255, 192, 203, 0.95) 100%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            data-testid="paper-screen"
          >
            {/* Paper unfolding */}
            <motion.div
              className="relative my-8"
              initial={{
                scaleY: 0.2,
                scaleX: 0.7,
                rotateX: 80,
                y: 100,
                opacity: 0,
              }}
              animate={{ scaleY: 1, scaleX: 1, rotateX: 0, y: 0, opacity: 1 }}
              transition={{
                duration: reducedMotion ? 0.1 : 0.8,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              style={{ transformOrigin: "center top", perspective: "1000px" }}
            >
              {/* The Paper */}
              <div
                className="relative w-[92vw] max-w-md sm:max-w-lg md:max-w-xl h-[85vh] max-h-[700px] rounded-xl overflow-hidden flex flex-col"
                style={{
                  background:
                    "linear-gradient(180deg, #FFFEF5 0%, #FFF8E7 100%)",
                  boxShadow:
                    "0 30px 100px rgba(0,0,0,0.6), 0 0 60px rgba(255, 200, 150, 0.1)",
                }}
              >
                {/* Paper texture */}
                <div
                  className="absolute inset-0 opacity-25 pointer-events-none"
                  style={{
                    backgroundImage: `url(${PAPER_TEXTURE})`,
                    backgroundSize: "cover",
                    mixBlendMode: "multiply",
                  }}
                />

                {/* Content - Split into two sections */}
                <div className="relative flex flex-col h-full">
                  {/* Top Section with Text and Buttons */}
                  <div className="p-6 sm:p-8 md:p-10 pb-4">
                    {/* Top hearts */}
                    <motion.div
                      className="flex justify-center gap-2 mb-6"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          viewBox="0 0 24 24"
                          fill="#E74C3C"
                          className="w-4 h-4 opacity-60"
                        >
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      ))}
                    </motion.div>

                    {/* Question Text with typewriter effect */}
                    <div className="text-center mb-8">
                      <h1 className="font-script text-3xl sm:text-4xl md:text-5xl text-[#5D4037] leading-tight mb-4">
                        <Typewriter
                          text={`${CONFIG.GIRLFRIEND_NAME}, my love,`}
                          delay={1000}
                          speed={80}
                        />
                      </h1>
                      <h2 className="font-script text-2xl sm:text-3xl md:text-4xl text-[#E74C3C]">
                        <Typewriter
                          text="will you be my Valentine?"
                          delay={2500}
                          speed={70}
                        />
                      </h2>
                    </div>

                    {/* Yes/No Buttons - ON THE PAPER */}
                    <motion.div
                      className="flex flex-col items-center gap-4 mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 4.5 }}
                      data-testid="valentine-buttons"
                    >
                      {/* Yes Button */}
                      <motion.button
                        className="relative px-12 py-3.5 text-lg font-semibold text-white rounded-full overflow-hidden"
                        style={{
                          background:
                            "linear-gradient(135deg, #E74C3C 0%, #C0392B 100%)",
                          boxShadow: "0 6px 25px rgba(231, 76, 60, 0.4)",
                        }}
                        onClick={handleYes}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        data-testid="yes-button"
                      >
                        <span className="relative z-10 font-body">Yes! 💕</span>
                        {/* Shimmer */}
                        <motion.div
                          className="absolute inset-0"
                          initial={{ x: "-100%" }}
                          animate={{ x: "200%" }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 1,
                          }}
                        >
                          <div
                            className="w-1/3 h-full"
                            style={{
                              background:
                                "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                            }}
                          />
                        </motion.div>
                      </motion.button>

                      {/* No Button */}
                      <div className="relative h-14 w-48 flex items-center justify-center">
                        <motion.button
                          className="absolute px-10 py-2.5 text-base font-medium text-[#8B6B61] rounded-full
                                     border-2 border-[#E8D5C4] bg-white/50 hover:bg-white/80 transition-colors"
                          animate={{ x: noPosition.x, y: noPosition.y }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 25,
                          }}
                          onMouseEnter={dodgeNo}
                          onTouchStart={dodgeNo}
                          onClick={dodgeNo}
                          data-testid="no-button"
                        >
                          <span className="font-body">No</span>
                        </motion.button>
                      </div>

                      {/* Nice try caption */}
                      <AnimatePresence>
                        {showNiceCaption && (
                          <motion.p
                            className="font-body text-sm text-[#8B6B61]/70"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            data-testid="dodge-caption"
                          >
                            Nice try 😌
                          </motion.p>
                        )}
                      </AnimatePresence>

                      {dodgeCount >= 5 && (
                        <p className="text-xs text-[#8B6B61]/50 font-body">
                          The button really doesn't want to be clicked 💔
                        </p>
                      )}
                    </motion.div>

                    {/* Divider */}
                    <div
                      className="w-24 h-px mx-auto"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, #E8D5C4, transparent)",
                      }}
                    />
                  </div>

                  {/* Bottom Section - Full Width Image covering bottom half */}
                  <motion.div
                    className="relative flex-1 min-h-[450px] overflow-hidden -mx-6 sm:-mx-8 md:-mx-10 -mb-6 sm:-mb-8 md:-mb-10 -mt-24 rounded-b-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8 }}
                    data-testid="placeholder-image"
                  >
                    <img
                      src="/assets/valentine-image.png"
                      alt="Valentine"
                      className="absolute bottom-0 left-0 right-0 w-full object-contain object-bottom rounded-b-xl"
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* SUCCESS Screen */}
        {state === "success" && (
          <motion.div
            key="success"
            className="fixed inset-0 flex flex-col items-center justify-center p-6"
            style={{
              background:
                "linear-gradient(180deg, #1a1a1a 0%, #2d1f1f 50%, #1a1a1a 100%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            data-testid="success-screen"
          >
            {/* Warm glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(231, 76, 60, 0.15) 0%, transparent 60%)",
              }}
            />

            {/* Success card */}
            <motion.div
              ref={cardRef}
              className="relative rounded-3xl p-8 sm:p-12 max-w-md w-full text-center"
              style={{
                background: "linear-gradient(180deg, #FFFEF5 0%, #FFF8E7 100%)",
                boxShadow:
                  "0 30px 100px rgba(0,0,0,0.5), 0 0 60px rgba(231, 76, 60, 0.15)",
              }}
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.2,
              }}
            >
              {/* Hearts */}
              <div className="flex justify-center gap-3 mb-6">
                {[...Array(7)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      delay: 0.5 + i * 0.08,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="#E74C3C"
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      style={{ opacity: 0.6 + (i % 3) * 0.15 }}
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </motion.div>
                ))}
              </div>

              <motion.h1
                className="font-script text-5xl sm:text-6xl text-[#5D4037] mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                Yay!
              </motion.h1>

              <motion.p
                className="font-script text-2xl sm:text-3xl text-[#E74C3C] mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                Happy Valentine's, {CONFIG.GIRLFRIEND_NAME} 💗
              </motion.p>

              <motion.div
                className="w-24 h-0.5 mx-auto mb-6"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #E74C3C, transparent)",
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.2 }}
              />

              <motion.p
                className="font-body text-[#5D4037]/70 text-sm sm:text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                I love you baby, my forever valentine 💕
              </motion.p>
            </motion.div>

            {/* Save button */}
            <motion.button
              className="mt-8 font-body text-sm text-white/60 hover:text-white/90 
                         bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full
                         border border-white/10 transition-all"
              onClick={handleSave}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
              data-testid="save-button"
            >
              📸 Save this moment
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
