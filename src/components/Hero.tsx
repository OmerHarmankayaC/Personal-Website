import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { useI18n } from '../i18n/context';
import { useState, useEffect } from 'react';

const subtitleContainer: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 4.2, 
      duration: 1.2,
      ease: "easeOut"
    }
  }
};

export default function Hero() {
  const { lang, setLang, t } = useI18n();
  const [isZoomed, setIsZoomed] = useState(false);
  
  // Track scroll position for the scroll indicator
  const { scrollY } = useScroll();
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 100], [0.5, 0]);
  const scrollIndicatorY = useTransform(scrollY, [0, 100], [0, -40]);

  useEffect(() => {
    // Zoom timeout triggers flawlessly 
    const timer = setTimeout(() => {
      setIsZoomed(true);
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  let globalIndex = 0; // Cascades smoothly from Ö to last A

  return (
    <section 
      style={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
        {/* Language Toggle (Top Center) */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 3.5, duration: 1 }}
          style={{ 
            position: 'absolute', 
            top: 40, 
            left: '50%', 
            transform: 'translateX(-50%)', 
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

        {/* Technical Brutalist Details */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 3.0, duration: 1 }}
          style={{ position: 'absolute', top: 40, left: 40, fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.2em', willChange: 'opacity' }}
        >
          {t.hero.tags[0]}
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 3.0, duration: 1 }}
          style={{ position: 'absolute', top: 40, right: 40, fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.2em', willChange: 'opacity' }}
        >
          {t.hero.tags[1]}
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 3.0, duration: 1 }}
          style={{ position: 'absolute', bottom: 40, right: 40, fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.2em', willChange: 'opacity' }}
        >
          {t.hero.tags[2]}
        </motion.div>

        {/* Global Scaler & Aligner */}
        <motion.div
           initial={{ scale: 1.5, x: 0, y: "10vh" }}
           animate={{ 
             scale: isZoomed ? 1 : 1.5, 
             x: isZoomed ? "-15vw" : 0,
             y: isZoomed ? 0 : "10vh",
           }}
           transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
           style={{ 
             display: 'flex', 
             flexDirection: 'column',
             alignItems: isZoomed ? 'flex-start' : 'center', // Drives all alignment identically
             willChange: 'transform' // Hardcore FPS smoothness check
           }}
        >
          
          {/* Main Titles - Choreographed Row to Column transition */}
          <motion.div 
            layout 
            style={{ 
              display: 'flex', 
              flexDirection: isZoomed ? 'column' : 'row', 
              alignItems: isZoomed ? 'flex-start' : 'center', 
              gap: isZoomed ? '0px' : '3vw' 
            }}
          >
            {t.hero.title.map((word, wordIdx) => (
              <motion.div
                layout="position"
                transition={{
                  layout: {
                    duration: 1.4,
                    ease: [0.16, 1, 0.3, 1],
                    // CHOREOGRAPHED FLIGHT PATH:
                    // Delay the second word's layout shift by 150ms! 
                    // This forces "ÖMER" to physically move out of the way before "HARMANKAYA" sweeps left,
                    // guaranteeing they never intersect or clip into each other during the translation!
                    delay: isZoomed ? wordIdx * 0.15 : 0 
                  }
                }}
                key={wordIdx}
                style={{ 
                  display: 'flex', 
                  fontSize: 'clamp(2.5rem, 6vw, 10rem)', 
                  fontWeight: 400, 
                  lineHeight: 1,
                  whiteSpace: 'nowrap'
                }}
              >
                {word.split("").map((letter, index) => {
                    const currentGlobalIndex = globalIndex++; 
                    return (
                    <motion.span 
                      initial={{ opacity: 0, y: -80, filter: "blur(20px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{
                        delay: 0.2 + (currentGlobalIndex * 0.1), 
                        type: "spring",
                        damping: 15,
                        stiffness: 110,
                      }}
                      key={`${wordIdx}-${index}`} 
                      style={{ 
                        display: 'inline-block',
                        fontFamily: 'var(--font-sans)',
                        transformOrigin: 'bottom',
                        willChange: 'transform, opacity, filter'
                      }}
                    >
                      {letter}
                    </motion.span>
                )})}
              </motion.div>
            ))}
          </motion.div>
          
          {/* Subtitles - Locked natively inside the master scaler */}
          <motion.div
            variants={subtitleContainer}
            initial="initial"
            animate="animate"
            style={{ 
              marginTop: '4vh', 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'inherit', // Follows the parent precisely
              gap: '1rem',
              color: 'var(--text)',
              willChange: 'transform, opacity'
            }}
          >
            <p style={{ 
              fontSize: 'clamp(1rem, 1.5vw, 1.5rem)', 
              letterSpacing: '0.15em', 
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-sans)',
            }}>
              {t.hero.subtitle1}
            </p>
            <p style={{ 
              fontSize: 'clamp(0.8rem, 1vw, 1rem)', 
              opacity: 0.6,
              fontFamily: 'var(--font-body)', // Updated Body Font
              letterSpacing: '0.05em'
            }}>
              {t.hero.subtitle2}
            </p>
          </motion.div>

        </motion.div>

        {/* Scrolling Indicator uses hardware accelerated scroll tracking */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }} // Handed opacity off to the scroll transform
          transition={{ delay: 4.5, duration: 1 }}
          style={{
            position: 'absolute',
            bottom: '40px',
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
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
