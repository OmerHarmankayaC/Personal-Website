import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useI18n } from '../i18n/context';
import { useCursor } from '../context/CursorContext';
import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';

export default function ProjectDetail() {
  const { id } = useParams();
  const { t } = useI18n();
  const { setCursorType } = useCursor();
  
  const projectIndex = t.projects.items.findIndex((p: any) => p.id === id);
  const project = t.projects.items[projectIndex];
  const nextProject = t.projects.items[(projectIndex + 1) % t.projects.items.length];

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

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

      <div className="container">
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

        {/* Hero Header */}
        <div style={{ marginBottom: '6rem' }}>
          <motion.h1 
            variants={itemVariants}
            style={{ 
              fontSize: 'clamp(3.5rem, 12vw, 10rem)', 
              fontFamily: 'var(--font-display)',
              lineHeight: 0.85,
              marginBottom: '4rem',
              letterSpacing: '-0.05em'
            }}
          >
            {project.title}
          </motion.h1>

            {/* Metadata Grid */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
                gap: '2.5rem',
                flex: 1
              }}>
                {[
                  { label: t.hero.projectMeta.year, value: project.year },
                  { label: t.hero.projectMeta.role, value: project.role },
                  { label: t.hero.projectMeta.category, value: project.category },
                  { label: t.hero.projectMeta.platform, value: project.platform }
                ].map((meta, i) => (
                  <div key={i}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>{meta.label}</p>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 500 }}>{meta.value}</p>
                  </div>
                ))}
              </div>

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
                    marginBottom: '2px'
                  }}
                >
                  {t.hero.liveProduct}
                  <ExternalLink size={14} />
                </motion.a>
              )}
            </div>

            {/* Tech Stack Chips */}
            {project.techStack && (
              <motion.div 
                variants={itemVariants}
                style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '0.75rem', 
                  marginTop: '4rem',
                  paddingTop: '2rem',
                  borderTop: '1px solid rgba(255,255,255,0.05)'
                }}
              >
                <p style={{ width: '100%', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>{t.hero.projectMeta.techStack}</p>
                {project.techStack.map((tech: string, i: number) => (
                  <span 
                    key={i} 
                    style={{ 
                      padding: '6px 14px', 
                      backgroundColor: 'rgba(255,255,255,0.03)', 
                      border: '1px solid rgba(255,255,255,0.1)', 
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text-muted)'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </motion.div>
            )}
        </div>

        {/* Main Hero Image with subtle parallax effect on hover */}
        {project.images && project.images.length > 0 && (
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 0.995 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{ 
              width: '100%', 
              height: '85vh', 
              overflow: 'hidden',
              backgroundColor: '#050505',
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

        {/* Project Content */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(12, 1fr)', 
          gap: '4rem',
          marginBottom: '15rem'
        }}>
          <div style={{ gridColumn: 'span 12', maxWidth: '800px' }}>
            <motion.p 
              variants={itemVariants}
              whileInView="visible"
              viewport={{ once: true }}
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

        {/* Premium Gallery Layout with Parallax */}
        {project.images && project.images.length > 1 && (
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
                        backgroundColor: '#020202',
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
                fontWeight: 700,
                color: 'var(--text)',
                lineHeight: 1,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2rem'
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
