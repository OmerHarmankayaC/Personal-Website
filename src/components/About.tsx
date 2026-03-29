import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useI18n } from '../i18n/context';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const { t } = useI18n();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom center",
            toggleActions: "play none none reverse",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="container"
      style={{ 
        minHeight: '80vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        paddingTop: '10vh',
        paddingBottom: '10vh'
      }}
    >
      <h2 style={{ color: 'var(--text-muted)', fontSize: '1rem', letterSpacing: '0.1em', marginBottom: '2rem' }}>{t.about.title}</h2>
      <p 
        ref={textRef}
        style={{ 
          fontSize: 'clamp(1.5rem, 3vw, 3rem)', 
          fontFamily: 'var(--font-body)',
          lineHeight: '1.4',
          maxWidth: '1000px',
          color: 'var(--text)'
        }}
      >
        {t.about.text}
      </p>
    </section>
  )
}
