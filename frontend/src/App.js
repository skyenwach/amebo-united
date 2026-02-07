import React, { useState } from 'react';
import './App.css';
import Landing3D from './components/Landing3D';
import EnvelopeReveal from './components/EnvelopeReveal';
import ValentineButtons from './components/ValentineButtons';
import EffectsConfetti from './components/EffectsConfetti';
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
      {/* Landing Screen with Teddy Bear */}
      {appState === STATES.LANDING && (
        <Landing3D onProceed={handleLandingComplete} />
      )}
      
      {/* Envelope Reveal */}
      {appState === STATES.ENVELOPE && (
        <EnvelopeReveal onRevealComplete={handleEnvelopeReveal} />
      )}
      
      {/* Buttons after card reveal */}
      {appState === STATES.BUTTONS && (
        <div 
          className="fixed inset-0 flex flex-col items-center justify-center p-4"
          style={{
            background: 'rgba(10, 10, 10, 0.95)'
          }}
        >
          {/* The revealed paper card */}
          <div 
            className="relative w-[90vw] max-w-lg sm:max-w-xl md:max-w-2xl aspect-[3/4] rounded-lg overflow-hidden mb-4"
            style={{
              boxShadow: '0 30px 100px rgba(0,0,0,0.6), 0 0 60px rgba(255, 200, 150, 0.1)',
              background: 'linear-gradient(180deg, #FFFEF5 0%, #FFF8E7 100%)'
            }}
          >
            {/* Paper texture overlay */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1706271952285-01b5e3fc2d78?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHwyfHxvbGQlMjBwYXBlciUyMGxldHRlciUyMHRleHR1cmUlMjBjcmVhbSUyMHZpbnRhZ2V8ZW58MHx8fHwxNzcwNTA3MDU5fDA&ixlib=rb-4.1.0&q=85)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                mixBlendMode: 'multiply'
              }}
            />
            
            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center p-6 sm:p-10">
              {/* Top hearts */}
              <div className="flex gap-2 mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} viewBox="0 0 24 24" fill="#E74C3C" className="w-4 h-4 opacity-60">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                ))}
              </div>
              
              {/* Placeholder Image Area */}
              <div 
                className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-[#FFE4E1] via-[#FFF0F5] to-[#FFE4E1] flex items-center justify-center border-2 border-dashed border-[#E74C3C]/20"
                data-testid="card-content"
                style={{
                  boxShadow: 'inset 0 0 30px rgba(231, 76, 60, 0.05)'
                }}
              >
                {/* 
                  INSTRUCTIONS: Replace this with your custom image:
                  <img src="/assets/val-card-placeholder.png" alt="Valentine card" className="w-full h-full object-cover" />
                */}
                <p className="font-body text-sm text-[#8B6B61]/60 text-center px-4">
                  Your custom image here
                </p>
              </div>
              
              {/* Main text */}
              <div className="text-center">
                <h1 
                  className="font-script text-3xl sm:text-4xl md:text-5xl text-[#5D4037] leading-tight mb-2"
                  style={{ textShadow: '0 2px 10px rgba(0,0,0,0.05)' }}
                >
                  {CONFIG.GIRLFRIEND_NAME}, my love,
                </h1>
                <h2 
                  className="font-script text-2xl sm:text-3xl md:text-4xl text-[#E74C3C]"
                  style={{ textShadow: '0 2px 10px rgba(231, 76, 60, 0.15)' }}
                >
                  will you be my Valentine?
                </h2>
              </div>
              
              {/* Bottom hearts */}
              <div className="flex gap-2 mt-6">
                {[...Array(3)].map((_, i) => (
                  <svg key={i} viewBox="0 0 24 24" fill="#E74C3C" className="w-5 h-5 opacity-50">
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
