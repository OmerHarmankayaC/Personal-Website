import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '../i18n/context';
import { useIsMobile } from '../hooks/useIsMobile';

const screens = [
  { id: 'goals', src: '/pictures/Vera-Finance/Vera-In_App-screenshots/goals.png' },
  { id: 'inventory', src: '/pictures/Vera-Finance/Vera-In_App-screenshots/inventory.png' },
  { id: 'home', src: '/pictures/Vera-Finance/Vera-In_App-screenshots/home_screen.png' },
  { id: 'assets', src: '/pictures/Vera-Finance/Vera-In_App-screenshots/assets.png' },
  { id: 'insights', src: '/pictures/Vera-Finance/Vera-In_App-screenshots/insights.png' },
];

export default function VeraShowcase({ controlledIndex }: { controlledIndex?: number } = {}) {
  const { t } = useI18n();
  const [index, setIndex] = useState(controlledIndex ?? 2); // Start on Home Screen
  const frameRef = useRef<HTMLDivElement>(null);

  // If controlled externally (from scroll), use that index
  const activeIndex = controlledIndex !== undefined ? controlledIndex : index;

  const handleNext = () => setIndex((prev) => (prev + 1) % screens.length);
  const handlePrev = () => setIndex((prev) => (prev - 1 + screens.length) % screens.length);

  // Throttled wheel handler for trackpad/mouse horizontal swiping
  const lastWheelTime = useRef(0);
  const handleWheel = (e: React.WheelEvent) => {
    if (controlledIndex !== undefined) return; // Don't respond to wheel when scroll-controlled
    const now = Date.now();
    if (now - lastWheelTime.current < 500) return;
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 20) {
      if (e.deltaX > 0) handleNext();
      else handlePrev();
      lastWheelTime.current = now;
    }
  };

  const isMobile = useIsMobile(768);

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
      {/* PHONE MOCKUP FRAME (iPhone 17 Pro Style) */}
      <div 
        ref={frameRef}
        onWheel={handleWheel}
        style={{ 
          position: 'relative', 
          /* On mobile: constrain by height so the phone fits in the section */
          width: isMobile ? 'auto' : 'min(260px, 70vw)', 
          height: isMobile ? '65vh' : 'auto',
          maxHeight: isMobile ? '65vh' : 'none',
          aspectRatio: isMobile ? '9 / 19.5' : '280 / 580',
          backgroundColor: isMobile ? '#050505' : '#111', 
          borderRadius: isMobile ? '36px' : 'clamp(30px, 10vw, 40px)', 
          border: isMobile ? '4px solid #2d2d2d' : 'min(8px, 2vw) solid #222',
          boxShadow: `
            0 0 0 1px rgba(255,255,255,0.05),
            0 30px 60px -12px rgba(0,0,0,0.8),
            0 18px 36px -18px rgba(0,0,0,0.9),
            inset 0 0 2px 1px rgba(255,255,255,0.1)
          `,
          overflow: 'hidden',
          zIndex: 10,
          marginBottom: '24px',
          pointerEvents: 'auto',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)'
        }}
      >
        {/* Refined Dynamic Island (iPhone 17 Pro style - even slimmer) */}
        <div style={{ 
          position: 'absolute', 
          top: '14px', 
          left: '50%', 
          transform: 'translateX(-50%)', 
          width: '65px', 
          height: '18px', 
          backgroundColor: '#000', 
          borderRadius: '12px',
          zIndex: 50,
          border: '1px solid rgba(255,255,255,0.03)',
          boxShadow: 'inset 0 0 4px rgba(255,255,255,0.1)'
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
            animate={{ x: `-${activeIndex * (100 / screens.length)}%` }}
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
            dragElastic={1} // Perfect 1:1 visual feedback, feels like a real screen
            dragMomentum={false}
            onDragEnd={(_, info) => {
              if (controlledIndex !== undefined) return; // Ignore drag when scroll-controlled
              const delta = info.offset.x;
              const velocity = info.velocity.x;
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

          {/* Premium Screen Reflection Overlay */}
          <div style={{ 
            position: 'absolute', 
            inset: 0, 
            background: 'linear-gradient(110deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.05) 100%)', 
            zIndex: 40,
            pointerEvents: 'none'
          }} />
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
                  width: i === activeIndex ? '16px' : '4px', 
                  height: '4px', 
                  borderRadius: '2px', 
                  backgroundColor: i === activeIndex ? 'var(--text)' : 'rgba(255,255,255,0.15)',
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
