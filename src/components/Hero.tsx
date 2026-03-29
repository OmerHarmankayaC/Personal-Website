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
      bodyPosition: document.body.style.position,
      bodyWidth: document.body.style.width,
      bodyHeight: document.body.style.height,
      bodyTop: document.body.style.top
    };

    let ctx: gsap.Context;

    // Ensure FONTS are loaded for precise metric-sensing
    document.fonts.ready.then(() => {
      if (!containerRef.current) return;

      ctx = gsap.context(() => {
        // Robust Scroll Protection
        window.scrollTo(0, 0);
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.width = "100%";
        document.body.style.height = "100vh";
        document.body.style.top = "0";

        const tl = gsap.timeline({
          onComplete: () => {
            document.documentElement.style.overflow = originalStyles.overflow || "auto";
            document.body.style.overflow = originalStyles.overflow || "auto";
            document.body.style.position = originalStyles.bodyPosition || "";
            document.body.style.width = originalStyles.bodyWidth || "";
            document.body.style.height = originalStyles.bodyHeight || "";
            document.body.style.top = originalStyles.bodyTop || "";
          }
        });

        const word1Letters = gsap.utils.toArray<HTMLElement>('.word1-letter');
        const word2Letters = gsap.utils.toArray<HTMLElement>('.word2-letter');

        // MEASURE: Sensible assembly gap (5rem equivalent in center)
        const w1Width = word1Ref.current?.offsetWidth || 0;
        const w2Width = word2Ref.current?.offsetWidth || 0;
        const assemblyGap = 120; // Expanded for distinct side-by-side assembly
        const totalW = w1Width + assemblyGap + w2Width;

        // PHASE 1: Centered One-Line Assembly
        gsap.set(nameContainerRef.current, { 
          width: totalW,
          left: '50%',
          xPercent: -50,
          yPercent: -50,
          top: '50%',
          scale: 1.15,
          opacity: 1
        });

        // Words start at their initial offsets inside the anchor
        gsap.set(word1Ref.current, { left: 0, top: 0, position: 'absolute' });
        gsap.set(word2WrapperRef.current, { x: w1Width + assemblyGap, y: 0, position: 'absolute' });

        gsap.set([...word1Letters, ...word2Letters], {
          y: () => -(Math.random() * 60 + 60) + 'vh',
          opacity: 0,
          rotate: () => Math.random() * 12 - 6
        });

        // Assemble ÖMER
        tl.to(word1Letters, {
          y: 0, opacity: 1, rotate: 0, duration: 0.8, ease: "elastic.out(1, 0.6)", stagger: 0.05, delay: 0.1
        }, 0);

        const word1Land = 0.1 + (word1Letters.length * 0.05) + 0.15;

        // Assemble HARMANKAYA
        tl.to(word2Letters, {
          y: 0, opacity: 1, rotate: 0, duration: 0.8, ease: "elastic.out(1, 0.6)", stagger: 0.05
        }, word1Land);

        // PHASE 2: Baseline Settle (12vw Stacked baseline)
        const finished = word1Land + (word2Letters.length * 0.05) + 0.8;
        const settleAt = finished + 0.35;

        // Slide the container to baseline
        tl.to(nameContainerRef.current, {
          left: '12vw',
          xPercent: 0,
          scale: 1.0,
          duration: 1.3,
          ease: "power3.inOut"
        }, settleAt);

        // WORD 2: Exact vertical stacking below WORD 1
        tl.to(word2WrapperRef.current, {
          x: 0, // Aligns perfectly with left-edge (left:0) of container
          y: () => (word1Ref.current?.offsetHeight || 80) + 12, // Pixel-perfect stack distance
          duration: 1.3,
          ease: "power3.inOut"
        }, settleAt);

        // UI Reveal
        tl.fromTo(subtitle1Ref.current, { opacity: 0 }, { opacity: 1, duration: 0.8 }, settleAt + 0.4);
        tl.fromTo([subtitle2Ref.current, scrollIndicatorRef.current], { opacity: 0 }, { opacity: 0.5, stagger: 0.2 }, settleAt + 0.6);
        tl.fromTo(".nav-telemetry", { opacity: 0 }, { opacity: 1, duration: 0.6, stagger: 0.15 }, settleAt + 1.2);

      }, containerRef);
    });

    return () => {
      if (ctx) ctx.revert();
      document.documentElement.style.overflow = originalStyles.overflow || "auto";
      document.body.style.overflow = originalStyles.overflow || "auto";
      document.body.style.position = originalStyles.bodyPosition || "";
      document.body.style.width = originalStyles.bodyWidth || "";
      document.body.style.height = originalStyles.bodyHeight || "";
      document.body.style.top = originalStyles.bodyTop || "";
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      style={{ height: '100vh', width: '100vw', position: 'relative', overflow: 'hidden', backgroundColor: 'var(--bg)' }}
    >
        {/* Navigation Elements / UI Markers */}
        <div className="nav-telemetry" style={{ opacity: 0, position: 'absolute', top: '24px', left: '24px', width: '32px', height: '32px', borderTop: '2px solid var(--text)', borderLeft: '2px solid var(--text)', pointerEvents: 'none' }} />
        <div className="nav-telemetry" style={{ opacity: 0, position: 'absolute', top: '24px', right: '24px', width: '32px', height: '32px', borderTop: '2px solid var(--text)', borderRight: '2px solid var(--text)', pointerEvents: 'none' }} />
        <div className="nav-telemetry" style={{ opacity: 0, position: 'absolute', bottom: '24px', left: '24px', width: '32px', height: '32px', borderBottom: '2px solid var(--text)', borderLeft: '2px solid var(--text)', pointerEvents: 'none' }} />
        <div className="nav-telemetry" style={{ opacity: 0, position: 'absolute', bottom: '24px', right: '24px', width: '32px', height: '32px', borderBottom: '2px solid var(--text)', borderRight: '2px solid var(--text)', pointerEvents: 'none' }} />

        {/* Global Localizer */}
        <div className="nav-telemetry" style={{ 
            opacity: 0, position: 'absolute', top: 40, left: '50%', transform: 'translateX(-50%)', zIndex: 100, display: 'flex', gap: '8px', fontSize: '0.8rem', fontFamily: 'var(--font-body)', fontWeight: 400, letterSpacing: '0.1em' 
          }}
        >
          <button onClick={() => setLang('TR')} style={{ color: lang === 'TR' ? 'var(--text)' : 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>TR</button>
          <span style={{ color: 'var(--border)' }}>/</span>
          <button onClick={() => setLang('EN')} style={{ color: lang === 'EN' ? 'var(--text)' : 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>EN</button>
        </div>

        {/* Dynamic Telemetry Data */}
        <div className="nav-telemetry" style={{ opacity: 0, position: 'absolute', top: 40, left: 40, fontSize: '0.65rem', color: 'var(--text)', fontFamily: 'var(--font-mono)', letterSpacing: '0.2em' }}>{t.hero.tags[0]}</div>
        <div className="nav-telemetry" style={{ opacity: 0, position: 'absolute', top: 40, right: 40, fontSize: '0.65rem', color: 'var(--text)', fontFamily: 'var(--font-mono)', letterSpacing: '0.2em' }}>{t.hero.tags[1]}</div>
        <div className="nav-telemetry" style={{ opacity: 0, position: 'absolute', bottom: 40, right: 40, fontSize: '0.65rem', color: 'var(--text)', fontFamily: 'var(--font-mono)', letterSpacing: '0.2em' }}>{t.hero.tags[2]}</div>

        {/* MASTER NAME ANCHOR */}
        <div 
          ref={nameContainerRef}
          style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', opacity: 0, willChange: 'transform, opacity' }}
        >
          {/* Row 1: Word 1 */}
          <h1 
            ref={word1Ref}
            style={{ 
              position: 'absolute', left: 0, top: 0, 
              fontSize: 'clamp(2rem, 5.5vw, 8rem)', fontWeight: 700, lineHeight: 1, 
              letterSpacing: '-0.02em', textTransform: 'uppercase', fontFamily: 'var(--font-serif)', 
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
                fontSize: 'clamp(2rem, 5.5vw, 8rem)', fontWeight: 700, lineHeight: 1, 
                letterSpacing: '-0.02em', textTransform: 'uppercase', fontFamily: 'var(--font-serif)', 
                whiteSpace: 'nowrap', margin: 0, opacity: 1 
              }}
            >
              {t.hero.title[1].split("").map((letter, index) => (
                <span key={`w1-${index}`} className="word2-letter" style={{ display: 'inline-block', opacity: 0, willChange: 'transform, opacity' }}>{letter}</span>
              ))}
            </h1>

            {/* Subtitles: Architectural Vertical Breathing Room */}
            <div style={{ marginTop: '6vh', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <p ref={subtitle1Ref} style={{ opacity: 0, fontSize: 'clamp(0.9rem, 1.2vw, 1.2rem)', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontWeight: 300 }}>{t.hero.subtitle1}</p>
              <p ref={subtitle2Ref} style={{ opacity: 0, fontSize: 'clamp(0.75rem, 0.8vw, 0.85rem)', fontFamily: 'var(--font-body)', fontWeight: 300, letterSpacing: '0.05em' }}>{t.hero.subtitle2}</p>
            </div>
          </div>
        </div>

        {/* Immersive Scroll Indicator */}
        <motion.div
          ref={scrollIndicatorRef}
          style={{ position: 'absolute', bottom: '40px', left: '50vw', x: '-50%', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', opacity: scrollIndicatorOpacity, y: scrollIndicatorY }}
        >
          <div style={{ height: '40px', width: '1px', backgroundColor: 'var(--border)' }}></div>
          {t.hero.scroll}
        </motion.div>
    </section>
  )
}
