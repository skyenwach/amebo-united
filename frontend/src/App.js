import React, { useState, useEffect } from 'react';
import './App.css';
import Landing3D from './components/Landing3D';
import EnvelopeReveal from './components/EnvelopeReveal';
import ValentineButtons from './components/ValentineButtons';
import EffectsConfetti from './components/EffectsConfetti';
import FloatingHearts from './components/FloatingHearts';
import SuccessScreen from './components/SuccessScreen';

// App states: 'landing' -> 'envelope' -> 'buttons' -> 'success'
const STATES = {
  LANDING: 'landing',
  ENVELOPE: 'envelope',
  BUTTONS: 'buttons',
  SUCCESS: 'success'
};

// Configuration - Change these values to customize
const CONFIG = {
  GIRLFRIEND_NAME: 'Koco' // Change this to your girlfriend's name
};

function App() {
  const [appState, setAppState] = useState(STATES.LANDING);
  const [showConfetti, setShowConfetti] = useState(false);

  // Handle state transitions
  const handleLandingComplete = () => {
    setAppState(STATES.ENVELOPE);
  };

  const handleEnvelopeReveal = () => {
    setAppState(STATES.BUTTONS);
  };

  const handleYes = () => {
    setShowConfetti(true);
    setAppState(STATES.SUCCESS);
  };

  const handleNo = () => {
    // The "No" button dodges, so this rarely gets called
    console.log('No was clicked somehow!');
  };

  return (
    <div className="valentine-app" data-testid="valentine-app">
      {/* Floating hearts background - always visible */}
      <FloatingHearts count={15} />
      
      {/* Landing 3D Scene */}
      {appState === STATES.LANDING && (
        <Landing3D onProceed={handleLandingComplete} />
      )}
      
      {/* Envelope Reveal */}
      {appState === STATES.ENVELOPE && (
        <EnvelopeReveal onRevealComplete={handleEnvelopeReveal} />
      )}
      
      {/* Buttons after card reveal */}
      {appState === STATES.BUTTONS && (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          {/* Show the revealed card */}
          <div 
            className="relative w-80 sm:w-96 rounded-3xl shadow-2xl overflow-hidden mb-4"
            style={{
              boxShadow: '0 25px 60px -15px rgba(255,107,107,0.4)'
            }}
          >
            <div className="relative bg-white/95 p-6 sm:p-8">
              {/* Card content */}
              <div 
                className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-gradient-to-br from-[#FFD1DC] to-[#FFFDD0] flex items-center justify-center"
                data-testid="card-content"
              >
                {/* 
                  INSTRUCTIONS: Replace this placeholder with your own image
                  Use: <img src="/assets/val-card-placeholder.png" alt="Valentine card" className="w-full h-full object-cover" />
                */}
                <div className="text-center p-4">
                  <p className="font-script text-3xl sm:text-4xl text-[#5D4037] mb-2">
                    Will you be my Valentine?
                  </p>
                  <p className="font-body text-sm text-[#5D4037]/60">
                    — for {CONFIG.GIRLFRIEND_NAME} 💕
                  </p>
                </div>
              </div>
              
              {/* Decorative hearts */}
              <div className="flex justify-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} viewBox="0 0 24 24" fill="#FF6B6B" className="w-4 h-4 opacity-60">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                ))}
              </div>
            </div>
          </div>
          
          {/* Yes/No Buttons */}
          <ValentineButtons onYes={handleYes} onNo={handleNo} />
        </div>
      )}
      
      {/* Success Screen */}
      {appState === STATES.SUCCESS && (
        <SuccessScreen name={CONFIG.GIRLFRIEND_NAME} />
      )}
      
      {/* Confetti Effect */}
      <EffectsConfetti active={showConfetti} />
    </div>
  );
}

export default App;
