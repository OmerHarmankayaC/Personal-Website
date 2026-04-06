import { motion, useScroll, useTransform } from 'framer-motion';
import { useI18n } from '../i18n/context';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

/**
 * HERO COMPONENT: Cinematic Final Precision
 * 
 * Corrections:
 * - Dynamic height sensing for vertical stacking (prevents 63px overlap)
 * - Restored GSAP lifecycle (ctx.revert) to fix React errors
 * - Absolute assembly gap expanded to 120px for clear horizontal separation
 */
export default function Hero() {
  const { lang, setLang, t } = useI18n();
  const containerRef = useRef<HTMLElement>(null);
  const nameContainerRef = useRef<HTMLDivElement>(null);
  const word1Ref = useRef<HTMLHeadingElement>(null);
  const word2Ref = useRef<HTMLHeadingElement>(null);
  const word2WrapperRef = useRef<HTMLDivElement>(null);
  const subtitle1Ref = useRef<HTMLParagraphElement>(null);
  const subtitle2Ref = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 100], [0.5, 0]);
  const scrollIndicatorY = useTransform(scrollY, [0, 100], [0, -40]);

  useEffect(() => {
    // Save original styles to restore them perfectly
    const originalStyles = {
      overflow: document.documentElement.style.overflow,
      overflowX: document.documentElement.style.overflowX,
      bodyOverflow: document.body.style.overflow,
      bodyPosition: document.body.style.position,
      bodyWidth: document.body.style.width,
      bodyHeight: document.body.style.height,
      bodyTop: document.body.style.top
    };

    let ctx: gsap.Context;
    let safetyTimeout: ReturnType<typeof setTimeout>;

    const unlockScroll = () => {
      document.documentElement.style.overflow = originalStyles.overflow || "auto";
      document.documentElement.style.overflowX = originalStyles.overflowX || "hidden";
      document.body.style.overflow = originalStyles.bodyOverflow || "auto";
      document.body.style.position = originalStyles.bodyPosition || "";
      document.body.style.width = originalStyles.bodyWidth || "";
      document.body.style.height = originalStyles.bodyHeight || "";
      document.body.style.top = originalStyles.bodyTop || "";
      if (safetyTimeout) clearTimeout(safetyTimeout);
    };

    // Ensure FONTS are loaded for precise metric-sensing
    document.fonts.ready.then(() => {
      if (!containerRef.current) return;

      const hash = 'hero_animated_v1';
      const hasAnimated = sessionStorage.getItem(hash);
      const isMobile = window.innerWidth < 768;

      ctx = gsap.context(() => {
        if (hasAnimated) {
          // SKIP ANIMATION - SET FINAL STATE IMMEDIATELY
          
          gsap.set(nameContainerRef.current, { 
            left: isMobile ? '5vw' : '12vw',
            top: '42%',
            yPercent: -50,
            xPercent: 0,
            opacity: 1,
            scale: 1
          });

          gsap.set(word1Ref.current, { left: 0, top: 0, position: 'absolute', opacity: 1 });
          gsap.set('.word1-letter', { opacity: 1, y: 0, rotate: 0 });
          gsap.set('.word2-letter', { opacity: 1, y: 0, rotate: 0 });
          
          gsap.set(word2WrapperRef.current, { 
            x: 0, 
            y: (word1Ref.current?.offsetHeight || 80) + (isMobile ? 4 : 12),
            position: 'absolute',
            opacity: 1
          });

          gsap.set([subtitle1Ref.current, subtitle2Ref.current, ".nav-telemetry", scrollIndicatorRef.current], { opacity: 1 });
          gsap.set(subtitle2Ref.current, { opacity: 0.7 });
          gsap.set(scrollIndicatorRef.current, { opacity: 0.5 });
          
          unlockScroll();
          return;
        }

        // More robust scroll prevention: overflow hidden is smoother on mobile than position: fixed
        window.scrollTo(0, 0);
        document.documentElement.style.overflow = "hidden";
        document.documentElement.style.overflowX = "hidden";
        document.body.style.overflow = "hidden";
        
        // Safety timeout to ensure unlock (max anim + buffer = 6s)
        safetyTimeout = setTimeout(unlockScroll, 6000);

        const tl = gsap.timeline({
          onStart: () => {
             if ((window as any).lenis) (window as any).lenis.stop();
          },
          onComplete: () => {
            sessionStorage.setItem(hash, 'true');
            unlockScroll();
            if ((window as any).lenis) (window as any).lenis.start();
          }
        });

        const word1Letters = gsap.utils.toArray<HTMLElement>('.word1-letter');
        const word2Letters = gsap.utils.toArray<HTMLElement>('.word2-letter');

        // MEASURE: Sensible assembly gap
        const w1Width = word1Ref.current?.offsetWidth || 0;
        const w2Width = word2Ref.current?.offsetWidth || 0;
        const assemblyGap = isMobile ? 30 : 120; // Reduced for mobile
        const totalW = w1Width + assemblyGap + w2Width;
        
        // DYNAMIC SCALE: Ensure the assembly never overflows the viewport (90% boundary)
        const maxAllowedW = window.innerWidth * 0.9;
        const baseScale = isMobile ? 1.0 : 1.15;
        const scaleFactor = Math.min(baseScale, maxAllowedW / totalW);

        // PHASE 1: Centered One-Line Assembly
        gsap.set(nameContainerRef.current, { 
          width: totalW,
          left: '50%',
          xPercent: -50,
          yPercent: -50,
          top: '42%',
          scale: scaleFactor, // Now dynamic to fit screen
          opacity: 1
        });

        // Words start at their initial offsets inside the anchor
        gsap.set(word1Ref.current, { left: 0, top: 0, position: 'absolute' });
        gsap.set(word2WrapperRef.current, { x: w1Width + assemblyGap, y: 0, position: 'absolute' });

        gsap.set([...word1Letters, ...word2Letters], {
          y: () => -(Math.random() * 50 + 100), 
          opacity: 0,
          rotate: () => Math.random() * 6 - 3 
        });

        // Assemble ÖMER
        tl.to(word1Letters, {
          y: 0, opacity: 1, rotate: 0, duration: 1.2, ease: "power4.out", stagger: 0.04, delay: 0.1
        }, 0);

        const word1Land = 0.1 + (word1Letters.length * 0.04) + 0.1;

        // Assemble HARMANKAYA
        tl.to(word2Letters, {
          y: 0, opacity: 1, rotate: 0, duration: 1.2, ease: "power4.out", stagger: 0.04
        }, word1Land);

        // PHASE 2: Baseline Settle
        const finished = word1Land + (word2Letters.length * 0.05) + 0.8;
        const settleAt = finished + 0.35;

        // Slide the container to baseline
        tl.to(nameContainerRef.current, {
          left: isMobile ? '5vw' : '12vw', // More edge-to-edge on mobile
          xPercent: 0,
          scale: 1.0, // Settle at 1:1 scale
          duration: 1.3,
          ease: "power3.inOut"
        }, settleAt);

        // WORD 2: Exact vertical stacking
        tl.to(word2WrapperRef.current, {
          x: 0, 
          y: () => (word1Ref.current?.offsetHeight || 80) + (isMobile ? 4 : 12), // Tighter stack on mobile
          duration: 1.3,
          ease: "power3.inOut"
        }, settleAt);

        // UI Reveal
        tl.fromTo(subtitle1Ref.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.8 }, settleAt + 0.4);
        tl.fromTo(subtitle2Ref.current, { opacity: 0, y: 10 }, { opacity: 0.7, y: 0, duration: 0.8 }, settleAt + 0.7);
        tl.fromTo(".nav-telemetry", { opacity: 0 }, { opacity: 1, duration: 0.6, stagger: 0.15 }, settleAt + 0.8);
        tl.fromTo(scrollIndicatorRef.current, { opacity: 0 }, { opacity: 0.5, duration: 1, ease: 'power2.inOut' }, settleAt + 1.8);

      }, containerRef);
    });

    return () => {
      if (ctx) ctx.revert();
      unlockScroll();
    };
  }, [lang]); // Re-run on lang change to ensure name assembly reflects new lang metrics if needed

  return (
    <section 
      ref={containerRef}
      style={{ height: '100vh', width: '100vw', position: 'relative', overflow: 'hidden', backgroundColor: 'var(--bg)' }}
    >
        {/* Navigation Elements / UI Markers */}
        <div className="nav-telemetry" style={{ opacity: 0, position: 'absolute', top: '16px', left: '16px', width: '24px', height: '24px', borderTop: '2px solid var(--text)', borderLeft: '2px solid var(--text)', pointerEvents: 'none' }} />
        <div className="nav-telemetry" style={{ opacity: 0, position: 'absolute', top: '16px', right: '16px', width: '24px', height: '24px', borderTop: '2px solid var(--text)', borderRight: '2px solid var(--text)', pointerEvents: 'none' }} />
        <div className="nav-telemetry" style={{ opacity: 0, position: 'absolute', bottom: '16px', left: '16px', width: '24px', height: '24px', borderBottom: '2px solid var(--text)', borderLeft: '2px solid var(--text)', pointerEvents: 'none' }} />
        <div className="nav-telemetry" style={{ opacity: 0, position: 'absolute', bottom: '16px', right: '16px', width: '24px', height: '24px', borderBottom: '2px solid var(--text)', borderRight: '2px solid var(--text)', pointerEvents: 'none' }} />

        <div className="nav-telemetry" style={{ 
            opacity: 0, position: 'absolute', top: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 100, display: 'flex', gap: '12px', fontSize: '0.9rem', fontFamily: 'var(--font-display)', fontWeight: 600, letterSpacing: '0.1em' 
          }}
        >
          <button onClick={() => setLang('TR')} style={{ color: lang === 'TR' ? 'var(--text)' : 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.3s ease' }}>TR</button>
          <span style={{ color: 'var(--border)' }}>/</span>
          <button onClick={() => setLang('EN')} style={{ color: lang === 'EN' ? 'var(--text)' : 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.3s ease' }}>EN</button>
        </div>

        {/* Dynamic Telemetry Data */}
        <div className="nav-telemetry" style={{ opacity: 0, position: 'absolute', top: 32, left: ' clamp(16px, 10vw, 40px)', fontSize: '0.75rem', color: 'var(--text)', fontFamily: 'var(--font-mono)', letterSpacing: '0.15em', display: window.innerWidth < 600 ? 'none' : 'block' }}>{t.hero.tags[0]}</div>
        <div className="nav-telemetry" style={{ opacity: 0, position: 'absolute', top: 32, right: 'clamp(16px, 10vw, 40px)', fontSize: '0.75rem', color: 'var(--text)', fontFamily: 'var(--font-mono)', letterSpacing: '0.15em', display: window.innerWidth < 600 ? 'none' : 'block' }}>{t.hero.tags[1]}</div>
        <div className="nav-telemetry" style={{ opacity: 0, position: 'absolute', bottom: 32, right: 'clamp(16px, 10vw, 40px)', fontSize: '0.75rem', color: 'var(--text)', fontFamily: 'var(--font-mono)', letterSpacing: '0.15em', display: window.innerWidth < 600 ? 'none' : 'block' }}>{t.hero.tags[2]}</div>

        <div 
          ref={nameContainerRef}
          style={{ position: 'absolute', left: '50%', top: '42%', transform: 'translate(-50%, -50%)', opacity: 0, willChange: 'transform, opacity' }}
        >
          {/* Row 1: Word 1 */}
          <h1 
            ref={word1Ref}
            style={{ 
              position: 'absolute', left: 0, top: 0, 
              fontSize: 'clamp(2.5rem, 12vw, 8.5rem)', fontWeight: 700, lineHeight: 0.9, 
              letterSpacing: '-0.04em', textTransform: 'none', fontFamily: 'var(--font-display)', 
              whiteSpace: 'nowrap', margin: 0, opacity: 1 
            }}
          >
            {t.hero.title[0].split("").map((letter, index) => (
              <span key={`w0-${index}`} className="word1-letter" style={{ display: 'inline-block', opacity: 0, willChange: 'transform, opacity' }}>{letter}</span>
            ))}
          </h1>

          {/* Wrapper for Row 2 + Secondary Elements */}
          <div 
            ref={word2WrapperRef}
            style={{ position: 'absolute', left: 0, top: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', willChange: 'transform' }}
          >
            <h1 
              ref={word2Ref}
              style={{ 
                fontSize: 'clamp(2.5rem, 12vw, 8.5rem)', fontWeight: 700, lineHeight: 0.9, 
                letterSpacing: '-0.04em', textTransform: 'none', fontFamily: 'var(--font-display)', 
                whiteSpace: 'nowrap', margin: 0, opacity: 1 
              }}
            >
              {t.hero.title[1].split("").map((letter, index) => (
                <span key={`w1-${index}`} className="word2-letter" style={{ display: 'inline-block', opacity: 0, willChange: 'transform, opacity' }}>{letter}</span>
              ))}
            </h1>

            {/* Subtitles: Architectural Vertical Breathing Room */}
            <div style={{ marginTop: '5vh', display: 'flex', flexDirection: 'column', gap: '0.8rem', maxWidth: '80vw' }}>
              <p ref={subtitle1Ref} style={{ opacity: 0, fontSize: 'clamp(1rem, 4vw, 1.4rem)', letterSpacing: '0.05em', textTransform: 'none', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', fontWeight: 600, lineHeight: 1.2 }}>{t.hero.subtitle1}</p>
              <p ref={subtitle2Ref} style={{ fontSize: 'clamp(0.85rem, 3.5vw, 1.1rem)', fontFamily: 'var(--font-display)', fontWeight: 400, letterSpacing: '0.02em', opacity: 0, lineHeight: 1.4 }}>{t.hero.subtitle2}</p>
            </div>
          </div>
        </div>


        {/* Immersive Scroll Indicator */}
        <motion.div
          ref={scrollIndicatorRef}
          style={{ 
            position: 'absolute', bottom: '40px', left: '50vw', x: '-50%', 
            fontFamily: 'var(--font-display)',
            fontSize: '1.1rem', 
            fontWeight: 600,
            letterSpacing: '0.2em', 
            textTransform: 'uppercase', 
            color: 'var(--text)', 
            display: 'flex', flexDirection: 'column', alignItems: 'center', 
            gap: '12px', 
            opacity: scrollIndicatorOpacity, 
            y: scrollIndicatorY 
          }}
        >
          <div style={{ height: '40px', width: '1px', backgroundColor: 'var(--border)' }}></div>
          {t.hero.scroll}
        </motion.div>
    </section>
  )
}
