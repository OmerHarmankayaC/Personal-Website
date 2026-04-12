import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '../i18n/context';

const screens = [
  { id: 'goals', src: '/pictures/Vera-Finance/Vera-In_App-screenshots/goals.png' },
  { id: 'inventory', src: '/pictures/Vera-Finance/Vera-In_App-screenshots/inventory.png' },
  { id: 'home', src: '/pictures/Vera-Finance/Vera-In_App-screenshots/home_screen.png' },
  { id: 'assets', src: '/pictures/Vera-Finance/Vera-In_App-screenshots/assets.png' },
  { id: 'insights', src: '/pictures/Vera-Finance/Vera-In_App-screenshots/insights.png' },
];

export default function VeraShowcase() {
  const { t } = useI18n();
  const [index, setIndex] = useState(2); // Start on Home Screen
  const frameRef = useRef<HTMLDivElement>(null);

  const handleNext = () => setIndex((prev) => (prev + 1) % screens.length);
  const handlePrev = () => setIndex((prev) => (prev - 1 + screens.length) % screens.length);

  // Throttled wheel handler for trackpad/mouse horizontal swiping
  const lastWheelTime = useRef(0);
  const handleWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now - lastWheelTime.current < 500) return; // Prevent multiple triggers from one swipe

    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 20) {
      if (e.deltaX > 0) handleNext();
      else handlePrev();
      lastWheelTime.current = now;
    }
  };

  return (
    <div 
      onClick={(e) => e.stopPropagation()} 
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        padding: 'clamp(10px, 3vw, 20px)',
        zIndex: 50, 
        cursor: 'default'
      }}
    >
      {/* PHONE MOCKUP FRAME */}
      <div 
        ref={frameRef}
        onWheel={handleWheel}
        style={{ 
          position: 'relative', 
          width: 'min(260px, 70vw)', 
          aspectRatio: '280 / 580',
          backgroundColor: '#111', 
          borderRadius: 'clamp(30px, 10vw, 40px)', 
          border: 'min(8px, 2vw) solid #222',
          boxShadow: '0 50px 100px -20px rgba(0,0,0,0.5)',
          overflow: 'hidden',
          zIndex: 10,
          marginBottom: '24px',
          pointerEvents: 'auto'
        }}
      >
        {/* Notch/Dynamic Island */}
        <div style={{ 
          position: 'absolute', 
          top: '12px', 
          left: '50%', 
          transform: 'translateX(-50%)', 
          width: '80px', 
          height: '24px', 
          backgroundColor: '#000', 
          borderRadius: '12px',
          zIndex: 50
        }} />

        {/* SCREEN CONTENT: Continuous Strip */}
        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', touchAction: 'pan-y' }}>
          <motion.div 
            style={{ 
              display: 'flex',
              width: `${screens.length * 100}%`,
              height: '100%',
              cursor: 'grab',
              touchAction: 'pan-y',
              userSelect: 'none'
            }}
            animate={{ x: `-${index * (100 / screens.length)}%` }}
            transition={{ 
              type: 'spring', 
              stiffness: 150, 
              damping: 30,
              mass: 1.2,
              restDelta: 0.001
            }}
            // Drag settings for "Real Phone" feel
            drag="x"
            dragDirectionLock={true}
            dragConstraints={{ left: 0, right: 0 }} // Elastic snap centered on current slide
            dragElastic={0.8} // Very elastic for immediate visual feedback
            dragMomentum={false}
            onDragEnd={(_, info) => {
              const delta = info.offset.x;
              const velocity = info.velocity.x;
              
              // Extreme high sensitivity for effortless swiping
              if (delta > 15 || velocity > 300) handlePrev();
              else if (delta < -15 || velocity < -300) handleNext();
            }}
            whileTap={{ cursor: 'grabbing' }}
          >
            {screens.map((screen) => (
              <div 
                key={screen.id} 
                style={{ 
                  width: `${100 / screens.length}%`, 
                  height: '100%', 
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none'
                }}
              >
                <img 
                  src={screen.src} 
                  alt={screen.id}
                  draggable="false"
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    pointerEvents: 'none',
                    userSelect: 'none'
                  }}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* BACKGROUND DECORATION (Subtle glow) */}
      <div style={{ 
        position: 'absolute', 
        top: '40%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        width: '400px', 
        height: '400px', 
        background: 'radial-gradient(circle, rgba(0,102,255,0.06) 0%, transparent 70%)',
        zIndex: 1,
        pointerEvents: 'none'
      }} />

      {/* NAVIGATION CONTROLS: SMALL ARROWS + INDICATOR + INSTRUCTION */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Small Left Arrow */}
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.05)' }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)', padding: '5px' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </motion.button>

          {/* Dots */}
          <div style={{ display: 'flex', gap: '6px' }}>
            {screens.map((_, i) => (
              <div 
                key={i} 
                onClick={(e) => { e.stopPropagation(); setIndex(i); }}
                style={{ 
                  width: i === index ? '16px' : '4px', 
                  height: '4px', 
                  borderRadius: '2px', 
                  backgroundColor: i === index ? 'var(--text)' : 'rgba(255,255,255,0.15)',
                  transition: 'all 0.4s ease',
                  cursor: 'pointer'
                }} 
              />
            ))}
          </div>

          {/* Small Right Arrow */}
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.05)' }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)', padding: '5px' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </motion.button>
        </div>

        {/* Instruction Text */}
        <span style={{ 
          fontFamily: 'var(--font-mono)', 
          fontSize: '0.65rem', 
          textTransform: 'uppercase', 
          letterSpacing: '0.15em', 
          opacity: 0.4,
          color: 'var(--text)'
        }}>
          {t.system.veraSwipe}
        </span>
      </div>
    </div>
  );
}
