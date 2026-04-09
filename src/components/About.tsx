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
      id="about"
      style={{ 
        minHeight: '60vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        paddingTop: '8vh',
        paddingBottom: '8vh'
      }}
    >
      <h2 style={{ 
        color: 'var(--text)', 
        fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
        lineHeight: 1,
        marginBottom: '2.5rem',
        fontWeight: 400,
        textTransform: 'uppercase',
        fontFamily: 'var(--font-display)',
        letterSpacing: '0.02em'
      }}>{t.about.title}</h2>

      <p 
        ref={textRef}
        style={{ 
          fontSize: 'clamp(1.2rem, 2.2vw, 2.2rem)', 
          fontFamily: 'var(--font-body)',
          lineHeight: '1.4',
          maxWidth: '900px',
          color: 'var(--text)',
          fontWeight: 300,
          opacity: 0.9
        }}
      >
        {t.about.text}
      </p>
    </section>
  )
}
