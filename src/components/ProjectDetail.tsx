import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useI18n } from '../i18n/context';
import { useCursor } from '../context/CursorContext';
import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from '../hooks/useIsMobile';

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
  const { t } = useI18n();
  const viewportRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [maxShift, setMaxShift] = useState(0);
  const isMobile = useIsMobile(1024);

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
        gridColumn: isMobile ? 'span 1' : 'span 7', 
        height: isMobile ? '40vh' : '75vh',
        zIndex: 50,
        position: isMobile ? 'sticky' : 'relative',
        top: isMobile ? '64px' : 'auto',
        marginBottom: isMobile ? '3rem' : '0',
        minWidth: 0, // Prevents grid blowout
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
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            {t.system.ieeeUrl}
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
              backgroundColor: '#fff'
            }}
          >
            {ieeeFrames.map((src, index) => (
              <img
                key={src}
                src={src}
                alt={`IEEE site frame ${index + 1}`}
                draggable={false}
                onLoad={() => {
                  const measure = () => {
                    if (!viewportRef.current || !stripRef.current) return;
                    const viewportHeight = viewportRef.current.clientHeight;
                    const stripHeight = stripRef.current.scrollHeight;
                    setMaxShift(viewportHeight - stripHeight);
                  };
                  measure();
                }}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  userSelect: 'none',
                  pointerEvents: 'none',
                  marginTop: index === 0 ? 0 : '-1px',
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

  const internalProgress = useSpring(0, { stiffness: 100, damping: 30 });
  const sectionProgress = internalProgress;
  
  const projectIndex = t.projects.items.findIndex((p: any) => p.id === id);
  const project = t.projects.items[projectIndex];
  const nextProject = t.projects.items[(projectIndex + 1) % t.projects.items.length];

  const isMobile = useIsMobile(1024);
  const isIEEE = id === 'ieee';

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"]
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    internalProgress.set(0);
    setCursorType('default');

    if (!isIEEE || !parallaxSectionRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: parallaxSectionRef.current,
        start: "top top",
        end: "+=500%", 
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          internalProgress.set(self.progress);
        }
      });
      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, [id, isIEEE, setCursorType]);

  if (!project) return <div>{t.system.errorNotFound}</div>;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
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
        paddingTop: isMobile ? '5rem' : '8rem',
        overflowX: 'hidden', // Prevent horizontal scroll globally
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

      <div className="container" ref={scrollRef} style={{ overflowX: 'hidden' }}>
        {/* Navigation */}
        <motion.div variants={itemVariants} style={{ marginBottom: isMobile ? '2rem' : '4rem' }}>
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

        {/* Hero Header */}
        <div style={{ 
          minHeight: isMobile ? 'auto' : '90vh', 
          paddingBottom: isMobile ? '4rem' : '10vh', 
          paddingTop: isMobile ? '2rem' : '0',
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: isMobile ? 'flex-start' : 'center'
        }}>
          {/* Role */}
          <motion.p 
            variants={itemVariants}
            style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '0.75rem', 
              color: 'var(--accent)', 
              textTransform: 'uppercase', 
              letterSpacing: '0.3em',
              marginBottom: '1.5rem'
            }}
          >
            {project.role}
          </motion.p>

          {/* Title */}
          <motion.h1 
            variants={itemVariants}
            style={{ 
              fontSize: isMobile ? 'clamp(2.8rem, 14vw, 5rem)' : 'clamp(3.5rem, 12vw, 10rem)', 
              fontFamily: 'var(--font-display)',
              lineHeight: 0.85,
              marginBottom: isMobile ? '1.5rem' : '2.5rem',
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              wordBreak: 'break-word',
            }}
          >
            {project.title}
          </motion.h1>

          {/* Description */}
          <motion.p 
            variants={itemVariants}
            style={{ 
              fontSize: isMobile ? '1rem' : 'clamp(1.1rem, 3.5vw, 1.8rem)', 
              fontFamily: 'var(--font-heading)',
              fontWeight: 300,
              maxWidth: '800px',
              lineHeight: 1.5,
              marginBottom: isMobile ? '3rem' : '5rem',
              color: 'var(--text-muted)',
              letterSpacing: '-0.02em'
            }}
          >
            {project.description}
          </motion.p>

          {/* Metadata Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr', 
            gap: '2rem', 
          }}>
            {/* Meta Items: always 2-col on mobile */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: '1.5rem 2rem',
            }}>
              {[
                { label: t.hero.projectMeta.year, value: project.year },
                { label: t.hero.projectMeta.role, value: project.role },
                { label: t.hero.projectMeta.category, value: project.category },
                { label: t.hero.projectMeta.platform, value: project.platform }
              ].map((meta, i) => (
                <div key={i}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '0.4rem', letterSpacing: '0.1em' }}>{meta.label}</p>
                  <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', fontWeight: 600 }}>{meta.value}</p>
                </div>
              ))}
            </div>

            {/* Live Product Button */}
            {project.link && project.link !== '#' && (
              <div>
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
                    padding: isMobile ? '12px 24px' : '16px 32px',
                    border: '1px solid var(--border)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
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
              </div>
            )}
          </div>
        </div>

        {/* Layout Switcher */}
        {isIEEE ? (
          <div 
            ref={parallaxSectionRef}
            style={{ 
              display: 'flex',
              alignItems: 'center',
              minHeight: '100vh',
              position: 'relative',
              padding: isMobile ? '3rem 0' : '2rem 0'
            }}
          >
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(12, 1fr)', 
              gap: isMobile ? '0' : '4rem', 
              width: '100%',
              position: 'relative'
            }}>
              <IEEEMockBrowser scrollYProgress={sectionProgress} />

              {/* Chapters — absolute positioned in a fixed-height box so only ONE shows at a time */}
              <div style={{ 
                gridColumn: isMobile ? 'span 1' : 'span 5', 
                height: isMobile ? '50vh' : '75vh', 
                position: 'relative',
                display: 'flex', 
                alignItems: 'center',
                paddingTop: isMobile ? '1rem' : '0',
                minWidth: 0,
              }}>
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  {/* Chapter 1: Overview */}
                  <motion.div 
                    style={{ 
                      position: 'absolute', 
                      top: '50%', 
                      transform: 'translateY(-50%)',
                      width: '100%',
                      opacity: useTransform(
                        sectionProgress,
                        [0, 0.15, 0.28, 0.38],
                        [1, 1, 1, 0]
                      )
                    }}
                  >
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1.5rem' }}>
                      {t.system.ieeeOverview}
                    </p>
                    <p style={{ fontSize: 'clamp(1rem, 3vw, 1.35rem)', lineHeight: 1.6, color: 'var(--text)', fontFamily: 'var(--font-body)', fontWeight: 300 }}>
                      {project.description}
                    </p>
                    <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'var(--text-muted)', fontFamily: 'var(--font-body)', marginTop: '2rem' }}>
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
                        [0.35, 0.45, 0.62, 0.72],
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
                        [0.72, 0.82, 1.0],
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
          </div>
        ) : (
          /* STANDARD LAYOUT FOR NON-IEEE PROJECTS */
          <>
            {project.images && project.images.length > 0 && (
              <motion.div 
                variants={itemVariants}
                style={{ 
                  width: '100%', 
                  height: isMobile ? '50vw' : '85vh', 
                  overflow: 'hidden',
                  backgroundColor: '#000000',
                  marginBottom: isMobile ? '4rem' : '10rem'
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

            {/* Full Description + Challenge + Solution — all single-column on mobile */}
            <div style={{ 
              marginBottom: isMobile ? '4rem' : '15rem',
              maxWidth: '100%',
            }}>
              <motion.p 
                variants={itemVariants}
                style={{ 
                  fontSize: isMobile ? '1.1rem' : 'clamp(1.5rem, 4vw, 2.5rem)', 
                  lineHeight: isMobile ? 1.6 : 1.2,
                  color: 'var(--text)',
                  marginBottom: isMobile ? '3rem' : '6rem',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 300,
                  letterSpacing: '-0.02em',
                  maxWidth: '800px',
                }}
              >
                {project.fullDescription}
              </motion.p>

              {/* Challenge + Solution: stacked on mobile, 2-col on desktop */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', 
                gap: isMobile ? '3rem' : '4rem',
                maxWidth: '100%',
              }}>
                <motion.div variants={itemVariants}>
                  <h3 style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1.5rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
                    {t.hero.projectMeta.challenge}
                  </h3>
                  <p style={{ fontSize: '1.1rem', lineHeight: 1.7, opacity: 0.9, fontFamily: 'var(--font-body)' }}>
                    {project.challenge}
                  </p>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <h3 style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1.5rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
                    {t.hero.projectMeta.solution}
                  </h3>
                  <p style={{ fontSize: '1.1rem', lineHeight: 1.7, opacity: 0.9, fontFamily: 'var(--font-body)' }}>
                    {project.solution}
                  </p>
                </motion.div>
              </div>
            </div>
          </>
        )}

        {/* Premium Gallery Layout */}
        {project.images && project.images.length > 1 && !isIEEE && (
          <div style={{ marginBottom: isMobile ? '6rem' : '15rem' }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(12, 1fr)', 
              gap: isMobile ? '2rem' : 'clamp(2rem, 8vw, 8rem)',
              alignItems: 'start'
            }}>
              {project.images.slice(1).map((img: any, i: number) => {
                const isEven = i % 2 === 0;
                const isMobileType = img.type === 'mobile';
                
                let gridColumn = 'span 12';
                if (!isMobile) {
                  if (isMobileType) {
                    gridColumn = isEven ? '2 / span 5' : '7 / span 5';
                  } else if (i % 3 === 0) {
                    gridColumn = '2 / span 10';
                  }
                }

                return (
                  <motion.div 
                    key={i}
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 100 }}
                    viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ 
                      gridColumn: isMobile ? 'span 1' : gridColumn,
                      width: '100%', 
                      height: isMobile ? 'auto' : (isMobileType ? 'clamp(500px, 80vh, 1000px)' : 'auto'),
                      overflow: 'hidden',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#000000',
                      marginTop: !isMobileType && i > 0 && !isMobile ? '8rem' : (isMobile ? '0' : '0'),
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
                        width: isMobileType && !isMobile ? 'auto' : '100%', 
                        height: isMobileType && !isMobile ? '100%' : 'auto',
                        objectFit: isMobileType && !isMobile ? 'contain' : 'cover',
                        display: 'block'
                      }} 
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%)', pointerEvents: 'none' }} />
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Next Project */}
        <motion.div 
          style={{ 
            borderTop: '1px solid var(--border)', 
            padding: isMobile ? '5rem 0' : '10rem 0',
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
                fontSize: isMobile ? 'clamp(2rem, 10vw, 4rem)' : 'clamp(2.5rem, 8vw, 6rem)',
                fontWeight: 400,
                color: 'var(--text)',
                lineHeight: 1,
                display: 'inline-flex',
                alignItems: 'center',
                gap: isMobile ? '1rem' : '2rem',
                textTransform: 'uppercase',
                letterSpacing: '0.02em',
                wordBreak: 'break-word',
              }}
              whileHover={{ x: 20 }}
              transition={{ duration: 0.4 }}
            >
              {nextProject.title}
              <ArrowRight size={isMobile ? 28 : 48} strokeWidth={1} />
            </motion.h2>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
