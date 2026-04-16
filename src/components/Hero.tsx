import { motion, useScroll, useTransform } from 'framer-motion';
import { useI18n } from '../i18n/context';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useIsMobile } from '../hooks/useIsMobile';

gsap.registerPlugin(ScrollToPlugin);

export default function Hero() {
  const { lang, setLang, t } = useI18n();
  const currentHash = 'hero_animated_v1';
  const hasAnimated = typeof window !== 'undefined' ? sessionStorage.getItem(currentHash) : null;
  const isMobile = useIsMobile(768);

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
    const originalStyles = {
      overflow: document.documentElement.style.overflow,
      overflowX: document.documentElement.style.overflowX,
      bodyOverflow: document.body.style.overflow,
    };

    let ctx: gsap.Context;
    let safetyTimeout: ReturnType<typeof setTimeout>;

    const unlockScroll = () => {
      document.documentElement.style.overflow = originalStyles.overflow || 'auto';
      document.documentElement.style.overflowX = originalStyles.overflowX || 'hidden';
      document.body.style.overflow = originalStyles.bodyOverflow || 'auto';
      if (safetyTimeout) clearTimeout(safetyTimeout);
    };

    if (!containerRef.current) return;

    const isMobileLocal = window.innerWidth < 768;

    ctx = gsap.context(() => {
      // ── SKIP: Already played this session ────────────────────────────────
      if (hasAnimated) {
        if (isMobileLocal) {
            gsap.set(nameContainerRef.current, { opacity: 1 });
            gsap.set('.word1-letter', { opacity: 1, y: 0, rotate: 0 });
            gsap.set('.word2-letter', { opacity: 1, y: 0, rotate: 0 });
            gsap.set(subtitle1Ref.current, { opacity: 1, y: 0 });
            gsap.set(subtitle2Ref.current, { opacity: 0.7, y: 0 });
            gsap.set('.nav-telemetry', { opacity: 1 });
            gsap.set(scrollIndicatorRef.current, { opacity: 0.5 });
        } else {
            gsap.set(nameContainerRef.current, { left: '12vw', xPercent: 0, opacity: 1, scale: 1, width: 'auto' });
            gsap.set(word1Ref.current, { opacity: 1, y: 0, x: 0 });
            gsap.set('.word1-letter', { opacity: 1, y: 0, rotate: 0 });
            gsap.set(word2Ref.current, { opacity: 1, y: 0, x: 0 });
            gsap.set('.word2-letter', { opacity: 1, y: 0, rotate: 0 });
            gsap.set(word2WrapperRef.current, { 
                x: 0, 
                y: (word1Ref.current?.offsetHeight || 80) + 12,
                opacity: 1 
            });
            gsap.set(subtitle1Ref.current, { opacity: 1, y: 0 });
            gsap.set(subtitle2Ref.current, { opacity: 0.7, y: 0 });
            gsap.set('.nav-telemetry', { opacity: 1 });
            gsap.set(scrollIndicatorRef.current, { opacity: 0.5 });
        }
        unlockScroll();
        return;
      }

      // Lock scroll during intro
      window.scrollTo(0, 0);
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.overflowX = 'hidden';
      document.body.style.overflow = 'hidden';
      safetyTimeout = setTimeout(unlockScroll, 6000);

      const tl = gsap.timeline({
        onStart: () => { if ((window as any).lenis) (window as any).lenis.stop(); },
        onComplete: () => {
          sessionStorage.setItem(currentHash, 'true');
          unlockScroll();
          if ((window as any).lenis) (window as any).lenis.start();
        }
      });

      if (isMobileLocal) {
        // ── MOBILE: Simple vertical entrance — no horizontal assembly ────────
        // Words stay in relative flow (flex-column). Just slide in from above.
        gsap.set(nameContainerRef.current, { opacity: 1 });
        gsap.set('.word1-letter', { opacity: 0, y: -60 });
        gsap.set('.word2-letter', { opacity: 0, y: -60 });
        gsap.set(subtitle1Ref.current, { opacity: 0, y: 10 });
        gsap.set(subtitle2Ref.current, { opacity: 0, y: 10 });
        gsap.set('.nav-telemetry', { opacity: 0 });
        gsap.set(scrollIndicatorRef.current, { opacity: 0 });

        const word1Letters = gsap.utils.toArray<HTMLElement>('.word1-letter');
        const word2Letters = gsap.utils.toArray<HTMLElement>('.word2-letter');

        tl.to(word1Letters, { y: 0, opacity: 1, duration: 1.0, ease: 'power4.out', stagger: 0.03 }, 0.3);
        tl.to(word2Letters, { y: 0, opacity: 1, duration: 1.0, ease: 'power4.out', stagger: 0.03 }, 0.55);
        tl.to(subtitle1Ref.current, { opacity: 1, y: 0, duration: 0.8 }, 1.5);
        tl.to(subtitle2Ref.current, { opacity: 0.7, y: 0, duration: 0.8 }, 1.75);
        tl.to('.nav-telemetry', { opacity: 1, duration: 0.6, stagger: 0.1 }, 1.9);
        tl.to(scrollIndicatorRef.current, { opacity: 0.5, duration: 1 }, 2.4);

      } else {
        // ── DESKTOP: Horizontal assembly → vertical settle ───────────────────
        const word1Letters = gsap.utils.toArray<HTMLElement>('.word1-letter');
        const word2Letters = gsap.utils.toArray<HTMLElement>('.word2-letter');

        const w1Width = word1Ref.current?.offsetWidth || 0;
        const w2Width = word2Ref.current?.offsetWidth || 0;
        const assemblyGap = 120;
        const totalW = w1Width + assemblyGap + w2Width;
        const maxAllowedW = window.innerWidth * 0.92;
        const scaleFactor = Math.min(1.15, maxAllowedW / totalW);

        // Phase 1: center, side by side, all absolute
        gsap.set(nameContainerRef.current, {
          width: totalW, left: '50%', xPercent: -50, yPercent: -50, top: '42%',
          scale: scaleFactor, opacity: 1, display: 'block', position: 'absolute'
        });
        gsap.set(word1Ref.current, { position: 'absolute', left: 0, top: 0, x: 0, y: 0 });
        gsap.set(word2WrapperRef.current, { position: 'absolute', left: 0, x: w1Width + assemblyGap, y: 0 });

        gsap.set([...word1Letters, ...word2Letters], {
          y: () => -(Math.random() * 50 + 100), opacity: 0, rotate: () => Math.random() * 6 - 3
        });

        tl.to(word1Letters, { y: 0, opacity: 1, rotate: 0, duration: 1.2, ease: 'power4.out', stagger: 0.04 }, 0.1);
        const word1Land = 0.1 + (word1Letters.length * 0.04) + 0.1;
        tl.to(word2Letters, { y: 0, opacity: 1, rotate: 0, duration: 1.2, ease: 'power4.out', stagger: 0.04 }, word1Land);

        const finished = word1Land + (word2Letters.length * 0.05) + 0.8;
        const settleAt = finished + 0.35;

        // Phase 2: slide to left edge, scale to 1, reset width
        tl.to(nameContainerRef.current, {
          left: '12vw', xPercent: 0, scale: 1.0, width: 'auto', duration: 1.3, ease: 'power3.inOut'
        }, settleAt);

        // word1 stays at absolute left:0 top:0, word2 goes below
        const word1Height = word1Ref.current?.offsetHeight || 80;
        tl.to(word2WrapperRef.current, { x: 0, y: word1Height + 12, duration: 1.3, ease: 'power3.inOut' }, settleAt);

        tl.fromTo(subtitle1Ref.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.8 }, settleAt + 0.4);
        tl.fromTo(subtitle2Ref.current, { opacity: 0, y: 10 }, { opacity: 0.7, y: 0, duration: 0.8 }, settleAt + 0.7);
        tl.fromTo('.nav-telemetry', { opacity: 0 }, { opacity: 1, duration: 0.6, stagger: 0.15 }, settleAt + 0.8);
        tl.fromTo(scrollIndicatorRef.current, { opacity: 0 }, { opacity: 0.5, duration: 1 }, settleAt + 1.8);
      }
    }, containerRef);

    return () => {
      if (ctx) ctx.revert();
      unlockScroll();
    };
  }, [lang]);

  return (
    <section
      ref={containerRef}
      style={{
        height: '100vh', width: '100vw', position: 'relative',
        overflow: 'hidden', backgroundColor: '#000000', zIndex: 100
      }}
    >
      {/* Corner markers — desktop only */}
      {!isMobile && (
        <>
          <div className="nav-telemetry" style={{ opacity: 0, position: 'absolute', top: 16, left: 16, width: 24, height: 24, borderTop: '2px solid var(--text)', borderLeft: '2px solid var(--text)', pointerEvents: 'none' }} />
          <div className="nav-telemetry" style={{ opacity: 0, position: 'absolute', top: 16, right: 16, width: 24, height: 24, borderTop: '2px solid var(--text)', borderRight: '2px solid var(--text)', pointerEvents: 'none' }} />
          <div className="nav-telemetry" style={{ opacity: 0, position: 'absolute', bottom: 16, left: 16, width: 24, height: 24, borderBottom: '2px solid var(--text)', borderLeft: '2px solid var(--text)', pointerEvents: 'none' }} />
          <div className="nav-telemetry" style={{ opacity: 0, position: 'absolute', bottom: 16, right: 16, width: 24, height: 24, borderBottom: '2px solid var(--text)', borderRight: '2px solid var(--text)', pointerEvents: 'none' }} />
        </>
      )}

      {/* Language switcher */}
      <div className="nav-telemetry" style={{
        opacity: 0, position: 'absolute', top: isMobile ? 24 : 32, left: '50%',
        transform: 'translateX(-50%)', zIndex: 100, display: 'flex', gap: 12,
        fontSize: '0.9rem', fontFamily: 'var(--font-heading)', fontWeight: 700, letterSpacing: '0.1em',
        padding: isMobile ? '8px 16px' : '0',
        backgroundColor: isMobile ? 'rgba(0,0,0,0.5)' : 'transparent',
        backdropFilter: isMobile ? 'blur(10px)' : 'none',
        borderRadius: '100px',
        border: isMobile ? '1px solid rgba(255,255,255,0.1)' : 'none'
      }}>
        <button onClick={() => setLang('TR')} style={{ color: lang === 'TR' ? 'var(--text)' : 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.3s ease' }}>TR</button>
        <span style={{ color: 'var(--border)' }}>/</span>
        <button onClick={() => setLang('EN')} style={{ color: lang === 'EN' ? 'var(--text)' : 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.3s ease' }}>EN</button>
      </div>

      {!isMobile && (
        <div className="nav-telemetry" style={{ opacity: 0, position: 'absolute', bottom: 32, right: 'clamp(16px, 10vw, 40px)', fontSize: '0.75rem', color: 'var(--text)', fontFamily: 'var(--font-mono)', letterSpacing: '0.15em' }}>
          {t.hero.tags[2]}
        </div>
      )}

      {/* ── NAME CONTAINER ──────────────────────────────────────────────────── */}
      {isMobile ? (
        // MOBILE: pure CSS centered flex column — GSAP only animates letters
        <div
          ref={nameContainerRef}
          style={{
            position: 'absolute', left: '50%', top: '42%',
            transform: 'translate(-50%, -50%)',
            opacity: hasAnimated ? 1 : 1,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            textAlign: 'center', zIndex: 10
          }}
        >
          <h1
            ref={word1Ref}
            style={{
              fontSize: 'clamp(3.2rem, 16vw, 8.5rem)', fontWeight: 400, lineHeight: 0.9,
              letterSpacing: '0.02em', textTransform: 'uppercase', fontFamily: 'var(--font-display)',
              whiteSpace: 'nowrap', margin: 0
            }}
          >
            {t.hero.title[0].split('').map((letter, i) => (
              <span key={`w0-${i}`} className="word1-letter" style={{ display: 'inline-block', opacity: hasAnimated ? 1 : 0 }}>{letter}</span>
            ))}
          </h1>

          <div
            ref={word2WrapperRef}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '0.4rem' }}
          >
            <h1
              ref={word2Ref}
              style={{
                fontSize: 'clamp(3.2rem, 16vw, 8.5rem)', fontWeight: 400, lineHeight: 0.9,
                letterSpacing: '0.02em', textTransform: 'uppercase', fontFamily: 'var(--font-display)',
                whiteSpace: 'nowrap', margin: 0
              }}
            >
              {t.hero.title[1].split('').map((letter, i) => (
                <span key={`w1-${i}`} className="word2-letter" style={{ display: 'inline-block', opacity: hasAnimated ? 1 : 0 }}>{letter}</span>
              ))}
            </h1>

            <div style={{ marginTop: '5vh', display: 'flex', flexDirection: 'column', gap: '0.8rem', maxWidth: '88vw', alignItems: 'center' }}>
              <p ref={subtitle1Ref} style={{ opacity: hasAnimated ? 1 : 0, fontSize: 'clamp(0.85rem, 4vw, 1.4rem)', letterSpacing: '0.04em', color: 'var(--text-muted)', fontFamily: 'var(--font-heading)', fontWeight: 700, lineHeight: 1.2, textAlign: 'center' }}>{t.hero.subtitle1}</p>
              <p ref={subtitle2Ref} style={{ fontSize: 'clamp(0.75rem, 3.5vw, 1.1rem)', fontFamily: 'var(--font-heading)', fontWeight: 400, opacity: hasAnimated ? 0.7 : 0, lineHeight: 1.4, textAlign: 'center' }}>{t.hero.subtitle2}</p>
              
              {/* Mobile Coordinates */}
              <p className="nav-telemetry" style={{ 
                opacity: hasAnimated ? 1 : 0, 
                marginTop: '3vh',
                fontSize: '0.65rem', 
                fontFamily: 'var(--font-mono)', 
                color: 'var(--text-muted)', 
                letterSpacing: '0.15em', 
                textTransform: 'uppercase',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                paddingTop: '12px'
              }}>
                 {t.hero.tags[2]}
              </p>
            </div>
          </div>
        </div>
      ) : (
        // DESKTOP: GSAP-assembled container
        <div
          ref={nameContainerRef}
          style={{
            position: 'absolute', left: '12vw', top: '42%',
            transform: 'translateY(-50%)',
            opacity: hasAnimated ? 1 : 1,
            willChange: 'transform, opacity',
            zIndex: 10
          }}
        >
          <h1
            ref={word1Ref}
            style={{
              position: 'absolute', left: 0, top: 0,
              fontSize: 'clamp(3rem, 10vw, 8.5rem)', fontWeight: 400, lineHeight: 0.9,
              letterSpacing: '0.02em', textTransform: 'uppercase', fontFamily: 'var(--font-display)',
              whiteSpace: 'nowrap', margin: 0
            }}
          >
            {t.hero.title[0].split('').map((letter, i) => (
              <span key={`w0-${i}`} className="word1-letter" style={{ display: 'inline-block', opacity: hasAnimated ? 1 : 0 }}>{letter}</span>
            ))}
          </h1>

          <div
            ref={word2WrapperRef}
            style={{ position: 'absolute', left: 0, top: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
          >
            <h1
              ref={word2Ref}
              style={{
                fontSize: 'clamp(3rem, 10vw, 8.5rem)', fontWeight: 400, lineHeight: 0.9,
                letterSpacing: '0.02em', textTransform: 'uppercase', fontFamily: 'var(--font-display)',
                whiteSpace: 'nowrap', margin: 0
              }}
            >
              {t.hero.title[1].split('').map((letter, i) => (
                <span key={`w1-${i}`} className="word2-letter" style={{ display: 'inline-block', opacity: hasAnimated ? 1 : 0 }}>{letter}</span>
              ))}
            </h1>

            <div style={{ marginTop: '5vh', display: 'flex', flexDirection: 'column', gap: '0.8rem', maxWidth: '85vw' }}>
              <p ref={subtitle1Ref} style={{ opacity: hasAnimated ? 1 : 0, fontSize: 'clamp(0.95rem, 2.5vw, 1.4rem)', letterSpacing: '0.05em', color: 'var(--text-muted)', fontFamily: 'var(--font-heading)', fontWeight: 700, lineHeight: 1.2 }}>{t.hero.subtitle1}</p>
              <p ref={subtitle2Ref} style={{ fontSize: 'clamp(0.85rem, 2vw, 1.1rem)', fontFamily: 'var(--font-heading)', fontWeight: 400, opacity: hasAnimated ? 0.7 : 0, lineHeight: 1.4 }}>{t.hero.subtitle2}</p>
            </div>
          </div>
        </div>
      )}

      {/* Scroll indicator */}
      <motion.div
        ref={scrollIndicatorRef}
        style={{
          position: 'absolute', bottom: 40, left: '50vw', x: '-50%',
          fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 800,
          letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--text)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
          opacity: scrollIndicatorOpacity, y: scrollIndicatorY
        }}
      >
        <div style={{ height: 40, width: 1, backgroundColor: 'var(--border)' }} />
        {t.hero.scroll}
      </motion.div>
    </section>
  );
}
