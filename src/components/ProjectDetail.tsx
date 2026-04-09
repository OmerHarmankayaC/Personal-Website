import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useI18n } from '../i18n/context';
import { useCursor } from '../context/CursorContext';
import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ieeeFrames = [
  '/pictures/IEEE-WebSite/scroll-animation/1st.png',
  '/pictures/IEEE-WebSite/scroll-animation/2nd.png',
  '/pictures/IEEE-WebSite/scroll-animation/3rd.png',
  '/pictures/IEEE-WebSite/scroll-animation/4th.png',
  '/pictures/IEEE-WebSite/scroll-animation/5th.png',
  '/pictures/IEEE-WebSite/scroll-animation/6th.png',
  '/pictures/IEEE-WebSite/scroll-animation/7th.png',
  '/pictures/IEEE-WebSite/scroll-animation/8th.png',
  '/pictures/IEEE-WebSite/scroll-animation/9th.png',
];

type IEEEMockBrowserProps = {
  scrollYProgress: any;
};

function IEEEMockBrowser({ scrollYProgress }: IEEEMockBrowserProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [maxShift, setMaxShift] = useState(0);


  useEffect(() => {
    const measure = () => {
      if (!viewportRef.current || !stripRef.current) return;
      const viewportHeight = viewportRef.current.clientHeight;
      const stripHeight = stripRef.current.scrollHeight;
      setMaxShift(viewportHeight - stripHeight);
    };

    measure();
    window.addEventListener('resize', measure);
    const observer = new ResizeObserver(measure);
    if (viewportRef.current) observer.observe(viewportRef.current);
    if (stripRef.current) observer.observe(stripRef.current);

    return () => {
      window.removeEventListener('resize', measure);
      observer.disconnect();
    };
  }, []);

  const stripY = useTransform(scrollYProgress, [0, 1], [0, maxShift]);

  return (
    <div 
      style={{ 
        gridColumn: 'span 7', 
        position: 'sticky', 
        top: '12vh', // Stationary position in screen
        alignSelf: 'start', 
        height: '76vh', 
        zIndex: 5 // Ensure it stays on top of any chapters
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid var(--border)',
          backgroundColor: '#101011',
          boxShadow: '0 50px 100px -20px rgba(0,0,0,0.7)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {/* Browser Toolbar Mockup */}
        <div
          style={{
            height: '40px',
            backgroundColor: '#121214',
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            gap: '8px',
            zIndex: 10,
            flexShrink: 0,
          }}
        >
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
          <div
            style={{
              flex: 1,
              height: '24px',
              backgroundColor: 'rgba(255,255,255,0.06)',
              borderRadius: '4px',
              margin: '0 24px',
              display: 'flex',
              alignItems: 'center',
              padding: '0 12px',
              fontSize: '0.65rem',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            ieee.tedu.edu.tr
          </div>
        </div>

        {/* Parallax Content Area */}
        <div ref={viewportRef} style={{ flex: 1, overflow: 'hidden', backgroundColor: '#fff', pointerEvents: 'none' }}>
          <motion.div 
            ref={stripRef} 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              y: stripY,
              backgroundColor: '#fff' // Ensure no background leakage
            }}
          >
            {ieeeFrames.map((src, index) => (
              <img
                key={src}
                src={src}
                alt={`IEEE site frame ${index + 1}`}
                draggable={false}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  userSelect: 'none',
                  pointerEvents: 'none',
                  // Subtract 1px from all images except the first to avoid sub-pixel gaps
                  marginTop: index === 0 ? 0 : '-1px',
                  // Performance/Quality adjustments
                  WebkitBackfaceVisibility: 'hidden'
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Interaction blocker to prevent accidental drags */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 20 }} aria-hidden="true" />
      </div>
    </div>
  );
}

export default function ProjectDetail() {
  const { id } = useParams();
  const { t } = useI18n();
  const { setCursorType } = useCursor();
  const scrollRef = useRef<HTMLDivElement>(null);
  const parallaxSectionRef = useRef<HTMLDivElement>(null);

  // Shared motion value for internal progress (driven by ScrollTrigger)
  const internalProgress = useSpring(0, { stiffness: 100, damping: 30 });
  
  // Backwards compatibility for the chapters
  const sectionProgress = internalProgress;
  
  const projectIndex = t.projects.items.findIndex((p: any) => p.id === id);
  const project = t.projects.items[projectIndex];
  const nextProject = t.projects.items[(projectIndex + 1) % t.projects.items.length];

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"]
  });

  const isIEEE = id === 'ieee';

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Force scroll to top
    window.scrollTo(0, 0);
    // Force cursor reset to default
    setCursorType('default');
  }, [id, setCursorType]);

  useEffect(() => {
    // Immediate scroll reset on mount
    window.scrollTo(0, 0);
  }, [id]);

  useLayoutEffect(() => {
    if (!isIEEE || !parallaxSectionRef.current) return;

    // We use ScrollTrigger to strictly PIN the section at the top
    // this creates a "forced watch" until the end of the scroll trigger
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: parallaxSectionRef.current,
        start: "top 12vh",
        end: "+=500%", // The "duration" of the lock
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          internalProgress.set(self.progress);
        }
      });
    });

    return () => ctx.revert();
  }, [isIEEE]);

  if (!project) return <div>Project not found</div>;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as any }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{ 
        backgroundColor: 'var(--bg)', 
        minHeight: '100vh',
        color: 'var(--text)',
        paddingTop: '8rem',
      }}
    >
      {/* Progress Bar */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          backgroundColor: 'var(--accent)',
          transformOrigin: '0%',
          zIndex: 100,
          scaleX
        }}
      />

      <div className="container" ref={scrollRef}>
        {/* Navigation */}
        <motion.div variants={itemVariants} style={{ marginBottom: '4rem' }}>
          <Link 
            to="/" 
            onMouseEnter={() => setCursorType('default')}
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'var(--text-muted)',
              padding: '0.5rem 1rem',
              border: '1px solid transparent',
              borderRadius: '2rem',
              transition: 'all 0.3s ease',
              backgroundColor: 'rgba(255,255,255,0.03)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = 'var(--text)';
              e.currentTarget.style.borderColor = 'var(--border)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = 'var(--text-muted)';
              e.currentTarget.style.borderColor = 'transparent';
            }}
          >
            <ArrowLeft size={12} />
            {t.hero.archive}
          </Link>
        </motion.div>

        {/* Hero Header: Full Editorial Intro */}
        <div style={{ minHeight: '90vh', paddingBottom: '10vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* Section Marker / Role */}
          <motion.p 
            variants={itemVariants}
            style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '0.75rem', 
              color: 'var(--accent)', 
              textTransform: 'uppercase', 
              letterSpacing: '0.3em',
              marginBottom: '2rem'
            }}
          >
            {project.role}
          </motion.p>

          <motion.h1 
            variants={itemVariants}
            style={{ 
              fontSize: 'clamp(3.5rem, 12vw, 10rem)', 
              fontFamily: 'var(--font-display)',
              lineHeight: 0.85,
              marginBottom: '2.5rem',
              letterSpacing: '0.02em',
              textTransform: 'uppercase'
            }}
          >
            {project.title}
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            style={{ 
              fontSize: 'clamp(1.1rem, 3.5vw, 1.8rem)', 
              fontFamily: 'var(--font-heading)',
              fontWeight: 300,
              maxWidth: '800px',
              lineHeight: 1.3,
              marginBottom: '5rem',
              color: 'var(--text-muted)',
              letterSpacing: '-0.02em'
            }}
          >
            {project.description}
          </motion.p>

          {/* Combined Metadata & Tech Stack Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '3rem', alignItems: 'flex-start' }}>
            <div style={{ 
              gridColumn: 'span 8',
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
              gap: '2.5rem',
            }}>
              {[
                { label: t.hero.projectMeta.year, value: project.year },
                { label: t.hero.projectMeta.role, value: project.role },
                { label: t.hero.projectMeta.category, value: project.category },
                { label: t.hero.projectMeta.platform, value: project.platform }
              ].map((meta, i) => (
                <div key={i}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>{meta.label}</p>
                  <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 600 }}>{meta.value}</p>
                </div>
              ))}
            </div>

            <div style={{ gridColumn: 'span 4', display: 'flex', justifyContent: 'flex-end' }}>
              {project.link && project.link !== '#' && (
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  whileHover={{ backgroundColor: 'var(--text)', color: 'var(--bg)' }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px 32px',
                    border: '1px solid var(--border)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    color: 'var(--text)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {t.hero.liveProduct}
                  <ExternalLink size={14} />
                </motion.a>
              )}
            </div>

          </div>
        </div>

        {/* Layout Switcher */}
        {isIEEE ? (
          <div 
            ref={parallaxSectionRef}
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(12, 1fr)', 
              gap: '4rem', 
              position: 'relative',
              marginTop: '5vh', // Small vertical buffer
              height: '80vh', 
            }}
          >
            <IEEEMockBrowser scrollYProgress={sectionProgress} />

            {/* Scrolling Right: Project Info Chapters */}
            <div style={{ 
              gridColumn: 'span 5', 
              position: 'sticky', 
              top: '12vh', 
              height: '76vh', 
              display: 'flex', 
              alignItems: 'center' 
            }}>
              <div style={{ position: 'relative', width: '100%' }}>
                {/* Chapter 1: Description */}
                <motion.div 
                  style={{ 
                    position: 'absolute', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    width: '100%',
                    opacity: useTransform(
                      sectionProgress,
                      [0, 0.1, 0.3, 0.4],
                      [0, 1, 1, 0]
                    )
                  }}
                >
                  <p style={{ 
                    fontFamily: 'var(--font-mono)', 
                    fontSize: '0.7rem', 
                    color: 'var(--accent)', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.2em',
                    marginBottom: '1.5rem'
                  }}>
                    Overview
                  </p>
                  <p style={{ 
                    fontSize: 'clamp(1.15rem, 3vw, 1.35rem)', 
                    lineHeight: 1.6,
                    color: 'var(--text)',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 300,
                  }}>
                    {project.description}
                  </p>
                  <p style={{ 
                    fontSize: '1rem', 
                    lineHeight: 1.6,
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-body)',
                    marginTop: '2rem'
                  }}>
                    {project.fullDescription}
                  </p>
                </motion.div>

                {/* Chapter 2: The Challenge */}
                <motion.div 
                   style={{ 
                    position: 'absolute', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    width: '100%',
                    opacity: useTransform(
                      sectionProgress,
                      [0.45, 0.55, 0.7, 0.8],
                      [0, 1, 1, 0]
                    )
                  }}
                >
                  <h3 style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1.5rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
                    {t.hero.projectMeta.challenge}
                  </h3>
                  <p style={{ fontSize: '1.15rem', lineHeight: 1.6, opacity: 0.9, fontFamily: 'var(--font-body)' }}>
                    {project.challenge}
                  </p>
                </motion.div>

                {/* Chapter 3: The Solution */}
                <motion.div 
                   style={{ 
                    position: 'absolute', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    width: '100%',
                    opacity: useTransform(
                      sectionProgress,
                      [0.85, 0.95, 1.0],
                      [0, 1, 1]
                    )
                  }}
                >
                  <h3 style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1.5rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
                    {t.hero.projectMeta.solution}
                  </h3>
                  <p style={{ fontSize: '1.15rem', lineHeight: 1.6, opacity: 0.9, fontFamily: 'var(--font-body)' }}>
                    {project.solution}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        ) : (
          /* STANDARD LAYOUT FOR OTHERS */
          <>
            {project.images && project.images.length > 0 && (
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 0.995 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                style={{ 
                  width: '100%', 
                  height: '85vh', 
                  overflow: 'hidden',
                  backgroundColor: '#000000',
                  marginBottom: '10rem'
                }}
              >
                <motion.img 
                  src={project.images[0].src} 
                  alt={project.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
              </motion.div>
            )}

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(12, 1fr)', 
              gap: '4rem',
              marginBottom: '15rem'
            }}>
              <div style={{ gridColumn: 'span 12', maxWidth: '800px' }}>
                <motion.p 
                  variants={itemVariants}
                  style={{ 
                    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', 
                    lineHeight: 1.2,
                    color: 'var(--text)',
                    marginBottom: '6rem',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 300,
                    letterSpacing: '-0.02em'
                  }}
                >
                  {project.fullDescription}
                </motion.p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
                  <motion.div variants={itemVariants}>
                    <h3 style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1.5rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
                      {t.hero.projectMeta.challenge}
                    </h3>
                    <p style={{ fontSize: '1.15rem', lineHeight: 1.6, opacity: 0.9, fontFamily: 'var(--font-body)' }}>
                      {project.challenge}
                    </p>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <h3 style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1.5rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
                      {t.hero.projectMeta.solution}
                    </h3>
                    <p style={{ fontSize: '1.15rem', lineHeight: 1.6, opacity: 0.9, fontFamily: 'var(--font-body)' }}>
                      {project.solution}
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Premium Gallery Layout with Parallax */}
        {project.images && project.images.length > 1 && !isIEEE && (
          <div style={{ marginBottom: '15rem' }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(12, 1fr)', 
              gap: 'clamp(2rem, 8vw, 8rem)',
              alignItems: 'start'
            }}>
               {project.images.slice(1).map((img: any, i: number) => {
                 const isEven = i % 2 === 0;
                 const isMobileType = img.type === 'mobile';
                 
                 // Dynamic Spans for a more organic feel
                 let gridColumn = 'span 12';
                 if (isMobileType) {
                   gridColumn = isEven ? '2 / span 5' : '7 / span 5';
                 } else if (i % 3 === 0) {
                   gridColumn = '2 / span 10'; // Inset full width
                 }

                 return (
                   <motion.div 
                     key={i}
                      whileInView={{ opacity: 1, y: 0 }}
                      initial={{ opacity: 0, y: 100 }}
                      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
                      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                      style={{ 
                        gridColumn,
                        width: '100%', 
                        height: isMobileType ? 'clamp(500px, 80vh, 1000px)' : 'auto',
                        overflow: 'hidden',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#000000',
                        marginTop: !isMobileType && i > 0 ? '8rem' : '0',
                        border: '1px solid rgba(255,255,255,0.05)',
                        boxShadow: '0 40px 100px -20px rgba(0,0,0,0.5)',
                        position: 'relative'
                      }}
                   >
                     <motion.img 
                      src={img.src} 
                      alt={`${project.title} detail ${i}`} 
                      initial={{ scale: 1.15 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                      style={{ 
                        width: isMobileType ? 'auto' : '100%', 
                        height: isMobileType ? '100%' : 'auto',
                        objectFit: isMobileType ? 'contain' : 'cover',
                        display: 'block'
                      }} 
                     />
                     
                     {/* Subtle Overlay Glow */}
                     <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%)', pointerEvents: 'none' }} />
                   </motion.div>
                 );
               })}
            </div>
          </div>
        )}

        {/* Next Project / Footer */}
        <motion.div 
          style={{ 
            borderTop: '1px solid var(--border)', 
            padding: '10rem 0',
            textAlign: 'center'
          }}
          whileInView={{ opacity: 1 }}
          initial={{ opacity: 0 }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '2rem', letterSpacing: '0.2em' }}>
            {t.hero.projectMeta.next}
          </p>
          <Link 
            to={`/project/${nextProject.id}`}
            onMouseEnter={() => setCursorType('default')}
            onMouseLeave={() => setCursorType('default')}
            style={{ textDecoration: 'none' }}
          >
            <motion.h2 
              style={{ 
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                fontWeight: 400,
                color: 'var(--text)',
                lineHeight: 1,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2rem',
                textTransform: 'uppercase',
                letterSpacing: '0.02em'
              }}
              whileHover={{ x: 20 }}
              transition={{ duration: 0.4 }}
            >
              {nextProject.title}
              <ArrowRight size={48} strokeWidth={1} />
            </motion.h2>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
