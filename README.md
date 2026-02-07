# 💕 Valentine Invitation for Koco

A beautiful, interactive Valentine's Day invitation website featuring a 3D teddy bear, animated envelope reveal, and playful Yes/No buttons.

## ✨ Features

- **3D Teddy Bear Landing**: Cute procedural teddy bear holding an envelope with "Click me" text
- **Envelope Animation**: Multi-step envelope opening with paper unfolding effect
- **Interactive Buttons**: "Yes" button celebrates with confetti, "No" button playfully dodges!
- **Save Moment**: Download a screenshot of the celebration card
- **Accessibility**: Respects `prefers-reduced-motion`, proper focus styles, ARIA labels
- **Mobile-First**: Optimized for iPhone sizes with responsive design

## 🎨 Customization

### Change the Girlfriend's Name

Open `/app/frontend/src/App.js` and find the CONFIG object at the top:

```javascript
const CONFIG = {
  GIRLFRIEND_NAME: 'Koco' // Change this to your girlfriend's name
};
```

### Replace the Placeholder Image

1. Add your custom Valentine card image to `/app/frontend/public/assets/`
2. Name it `val-card-placeholder.png` (or any name you prefer)
3. In `/app/frontend/src/App.js`, find the card content section and replace the placeholder div with:

```jsx
<img 
  src="/assets/val-card-placeholder.png" 
  alt="Valentine card" 
  className="w-full h-full object-cover" 
/>
```

4. Also update `/app/frontend/src/components/EnvelopeReveal.js` with the same change in the revealed card section.

### Color Customization

The color palette is defined in `/app/frontend/src/index.css` as CSS variables:

```css
:root {
  --valentine-primary: #FFD1DC;      /* Soft pink */
  --valentine-secondary: #FFFDD0;    /* Cream */
  --valentine-accent: #FF6B6B;       /* Coral red */
  --valentine-background: #FFF5F7;   /* Light pink */
  --valentine-foreground: #4A4A4A;   /* Warm charcoal */
}
```

## 🛠️ Tech Stack

- **React** with functional components and hooks
- **TypeScript** support ready
- **Tailwind CSS** for styling
- **react-three-fiber** (Three.js) for 3D scene
- **Framer Motion** for animations
- **canvas-confetti** for celebration effects
- **html2canvas** for screenshot functionality

## 📁 Component Structure

```
/app/frontend/src/
├── App.js                    # Main app with state machine
├── App.css                   # Custom animations and styles
├── index.css                 # Tailwind + theme variables
└── components/
    ├── canvas/
    │   └── TeddyScene.js     # 3D teddy bear scene
    ├── Landing3D.js          # Landing screen wrapper
    ├── EnvelopeReveal.js     # Envelope opening animation
    ├── ValentineButtons.js   # Yes/No interactive buttons
    ├── EffectsConfetti.js    # Confetti celebration
    ├── FloatingHearts.js     # Background heart particles
    └── SuccessScreen.js      # Final celebration screen
```

## 🚀 Running Locally

```bash
cd /app/frontend
yarn install
yarn start
```

## 💡 Tips

- The 3D teddy is procedurally generated (no external model loading) for fast, reliable rendering
- Confetti uses both circles, squares, and heart shapes in the celebration colors
- The "No" button dodges on both hover (desktop) and touch (mobile)
- After 5+ dodge attempts, a fun easter egg message appears

## ❤️ Made with Love

This website was created as a special Valentine's gift. Enjoy spreading the love!
