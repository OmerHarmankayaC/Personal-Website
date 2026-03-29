import { motion, useScroll, useTransform } from 'framer-motion';
import { useI18n } from '../i18n/context';
import { useState, useEffect } from 'react';

export default function Hero() {
  const { lang, setLang, t } = useI18n();
  const [phase, setPhase] = useState<'drop' | 'shift'>('drop');
  
  const { scrollY } = useScroll();
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 100], [0.5, 0]);
  const scrollIndicatorY = useTransform(scrollY, [0, 100], [0, -40]);

  useEffect(() => {
    // Letters drop: ~2.2 seconds.
    const timer = setTimeout(() => setPhase('shift'), 2200);
    return () => clearTimeout(timer);
  }, []);

  let globalIndex = 0;

  // Premium easing curve (Custom Expo-Out)
  const premiumEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <section 
      style={{ 
        height: '100vh', 
        width: '100vw',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center' // Centers the master scale wrapper vertically
      }}
    >
        {/* Camera Viewfinder Corners */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.0, duration: 1.5 }}
          style={{ position: 'absolute', top: '24px', left: '24px', width: '2vw', height: '2vw', minWidth: '16px', minHeight: '16px', borderTop: '2px solid var(--text)', borderLeft: '2px solid var(--text)', pointerEvents: 'none' }} 
        />
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.0, duration: 1.5 }}
          style={{ position: 'absolute', top: '24px', right: '24px', width: '2vw', height: '2vw', minWidth: '16px', minHeight: '16px', borderTop: '2px solid var(--text)', borderRight: '2px solid var(--text)', pointerEvents: 'none' }} 
        />
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.0, duration: 1.5 }}
          style={{ position: 'absolute', bottom: '24px', left: '24px', width: '2vw', height: '2vw', minWidth: '16px', minHeight: '16px', borderBottom: '2px solid var(--text)', borderLeft: '2px solid var(--text)', pointerEvents: 'none' }} 
        />
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.0, duration: 1.5 }}
          style={{ position: 'absolute', bottom: '24px', right: '24px', width: '2vw', height: '2vw', minWidth: '16px', minHeight: '16px', borderBottom: '2px solid var(--text)', borderRight: '2px solid var(--text)', pointerEvents: 'none' }} 
        />

        {/* Language Toggle */}
        <motion.div 
          initial={{ opacity: 0, y: -20, x: "-50%" }} 
          animate={{ opacity: 1, y: 0, x: "-50%" }} 
          transition={{ delay: 3.5, duration: 1 }}
          style={{ 
            position: 'absolute', 
            top: 40, 
            left: '50%', 
            zIndex: 100, 
            display: 'flex', 
            gap: '8px', 
            fontSize: '0.8rem', 
            fontFamily: 'var(--font-sans)', 
            fontWeight: 500, 
            letterSpacing: '0.1em' 
          }}
        >
          <button 
            onClick={() => setLang('TR')}
            style={{ color: lang === 'TR' ? 'var(--text)' : 'var(--text-muted)', transition: 'color 0.3s', background: 'none', border: 'none', cursor: 'none' }}
          >
            TR
          </button>
          <span style={{ color: 'var(--border)' }}>/</span>
          <button 
            onClick={() => setLang('EN')}
            style={{ color: lang === 'EN' ? 'var(--text)' : 'var(--text-muted)', transition: 'color 0.3s', background: 'none', border: 'none', cursor: 'none' }}
          >
            EN
          </button>
        </motion.div>

        {/* Corner telemetry */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
          transition={{ delay: 3.5, duration: 1 }}
          style={{ position: 'absolute', top: 40, left: 40, fontSize: '0.65rem', color: 'var(--text)', fontFamily: 'var(--font-mono)', letterSpacing: '0.2em' }}
        >
          {t.hero.tags[0]}
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
          transition={{ delay: 3.5, duration: 1 }}
          style={{ position: 'absolute', top: 40, right: 40, fontSize: '0.65rem', color: 'var(--text)', fontFamily: 'var(--font-mono)', letterSpacing: '0.2em' }}
        >
          {t.hero.tags[1]}
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
          transition={{ delay: 3.5, duration: 1 }}
          style={{ position: 'absolute', bottom: 40, right: 40, fontSize: '0.65rem', color: 'var(--text)', fontFamily: 'var(--font-mono)', letterSpacing: '0.2em' }}
        >
          {t.hero.tags[2]}
        </motion.div>

        {/* 
          Master Animation Wrapper:
          Handles the cinematic zoom-out (1.3x -> 1.0x).
        */}
        <motion.div
          animate={{ scale: phase === 'shift' ? 1.0 : 1.3 }}
          transition={{ duration: 1.6, ease: premiumEase }}
          style={{ 
            width: '100%', 
            willChange: 'transform',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* 
            Framer Motion Layout Container
            We use native layout transitions to float them from a centered row to a left column.
            CRITICAL FIX: whiteSpace: "nowrap" guarantees they NEVER wrap onto two lines 
                          during the drop phase, even on narrow screens.
          */}
          <motion.div
            layout
            style={{
              display: 'flex',
              flexDirection: phase === 'shift' ? 'column' : 'row',
              justifyContent: phase === 'shift' ? 'flex-start' : 'center',
              alignItems: phase === 'shift' ? 'flex-start' : 'center',
              paddingLeft: phase === 'shift' ? '12vw' : '0vw',   // Moves the stack to the left edge
              paddingTop: phase === 'shift' ? '0vh' : '15vh',    // Visual centering adjust
              gap: phase === 'shift' ? '0px' : '3vw',           // Gap collapses when shifting to column
              whiteSpace: 'nowrap',                              // Prevents the premature wrap glitch
              width: '100%'
            }}
          >
            {/* Word 1: ÖMER */}
            <motion.div
              layout
              transition={{ layout: { duration: 1.6, ease: premiumEase } }}
              style={{
                display: 'flex', 
                fontSize: 'clamp(2.5rem, 6vw, 10rem)', 
                fontWeight: 800, 
                lineHeight: 0.85,
                letterSpacing: '-0.04em'
              }}
            >
              {t.hero.title[0].split("").map((letter, index) => {
                const currentGlobalIndex = globalIndex++;
                return (
                  <motion.span 
                    initial={{ opacity: 0, y: -80, filter: "blur(16px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: 0.3 + (currentGlobalIndex * 0.08), type: "spring", damping: 20, stiffness: 100 }}
                    key={`w0-${index}`} 
                    style={{ display: 'inline-block', fontFamily: 'var(--font-sans)', transformOrigin: 'bottom', willChange: 'transform, opacity, filter' }}
                  >
                    {letter}
                  </motion.span>
                );
              })}
            </motion.div>

            {/* 
              Word 2: HARMANKAYA 
              CRITICAL FIX: Delay on layout transition prevents diagonal collision.
              ÖMER floats left first, HARMANKAYA swoops underneath it 0.15s later.
             */}
            <motion.div
              layout
              transition={{ 
                layout: { 
                  duration: 1.6, 
                  ease: premiumEase,
                  delay: phase === 'shift' ? 0.15 : 0 
                } 
              }}
              style={{
                display: 'flex', 
                fontSize: 'clamp(2.5rem, 6vw, 10rem)', 
                fontWeight: 800, 
                lineHeight: 0.85,
                letterSpacing: '-0.04em'
              }}
            >
              {t.hero.title[1].split("").map((letter, index) => {
                const currentGlobalIndex = globalIndex++;
                return (
                  <motion.span 
                    initial={{ opacity: 0, y: -80, filter: "blur(16px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: 0.3 + (currentGlobalIndex * 0.08), type: "spring", damping: 20, stiffness: 100 }}
                    key={`w1-${index}`} 
                    style={{ display: 'inline-block', fontFamily: 'var(--font-sans)', transformOrigin: 'bottom', willChange: 'transform, opacity, filter' }}
                  >
                    {letter}
                  </motion.span>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Subtitles: Pinned safely beneath the stacked words via Margin */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: phase === 'shift' ? 1 : 0, 
              y: phase === 'shift' ? 0 : 20 
            }}
            transition={{ duration: 1, ease: "easeOut", delay: phase === 'shift' ? 1.0 : 0 }}
            style={{ 
              paddingLeft: '12vw',
              marginTop: '4vh', // ensures it sits safely below the giant text stack
              display: 'flex',
              flexDirection: 'column',
              gap: '0.8rem',
              willChange: 'transform, opacity'
            }}
          >
            <p style={{ 
              fontSize: 'clamp(0.9rem, 1.3vw, 1.3rem)', 
              letterSpacing: '0.15em', 
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-sans)',
            }}>
              {t.hero.subtitle1}
            </p>
            <p style={{ 
              fontSize: 'clamp(0.75rem, 0.9vw, 0.95rem)', 
              opacity: 0.5,
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.05em'
            }}>
              {t.hero.subtitle2}
            </p>
          </motion.div>

        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'shift' ? 0.5 : 0 }}
          transition={{ delay: phase === 'shift' ? 2.0 : 0, duration: 1 }}
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50vw',
            x: '-50%',
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--text)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            opacity: scrollIndicatorOpacity,
            y: scrollIndicatorY,
            willChange: 'transform, opacity'
          }}
        >
          <div style={{ height: '40px', width: '1px', backgroundColor: 'var(--border)' }}></div>
          {t.hero.scroll}
        </motion.div>
    </section>
  )
}
