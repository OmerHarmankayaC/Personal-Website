import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useI18n } from '../i18n/context';
import { useCursor } from '../context/CursorContext';
import { useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function ProjectDetail() {
  const { id } = useParams();
  const { lang, t } = useI18n();
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
            {lang === 'TR' ? 'Çalışmalara Dön' : 'Archive'}
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

          <motion.div 
            variants={itemVariants}
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '2rem',
              padding: '2rem 0',
              borderTop: '1px solid var(--border)',
              borderBottom: '1px solid var(--border)'
            }}
          >
            {[
              { label: lang === 'TR' ? 'YIL' : 'YEAR', value: project.year },
              { label: lang === 'TR' ? 'ROL' : 'ROLE', value: project.role },
              { label: lang === 'TR' ? 'KATEGORİ' : 'CATEGORY', value: project.category },
              { label: lang === 'TR' ? 'PLATFORM' : 'PLATFORM', value: project.platform }
            ].map((meta, i) => (
              <div key={i}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>{meta.label}</p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 500 }}>{meta.value}</p>
              </div>
            ))}
          </motion.div>
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
                  {lang === 'TR' ? 'Zorluk' : 'The Challenge'}
                </h3>
                <p style={{ fontSize: '1.15rem', lineHeight: 1.6, opacity: 0.9, fontFamily: 'var(--font-body)' }}>
                  {project.challenge}
                </p>
              </motion.div>
              <motion.div variants={itemVariants}>
                <h3 style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1.5rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
                  {lang === 'TR' ? 'Çözüm' : 'The Solution'}
                </h3>
                <p style={{ fontSize: '1.15rem', lineHeight: 1.6, opacity: 0.9, fontFamily: 'var(--font-body)' }}>
                  {project.solution}
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        {project.images && project.images.length > 1 && (
          <div style={{ marginBottom: '15rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10rem' }}>
               {project.images.slice(1).map((img: any, i: number) => (
                 <motion.div 
                   key={i}
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 50 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 1.2, ease: [0.215, 0.61, 0.355, 1] }}
                    style={{ 
                      width: '100%', 
                      height: img.type === 'mobile' ? '90vh' : 'auto',
                      overflow: 'hidden',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#050505',
                      padding: img.type === 'mobile' ? '5vh 0' : '0'
                    }}
                 >
                   <img 
                    src={img.src} 
                    alt={`${project.title} detail ${i}`} 
                    style={{ 
                      width: img.type === 'mobile' ? 'auto' : '100%', 
                      height: img.type === 'mobile' ? '100%' : 'auto',
                      objectFit: img.type === 'mobile' ? 'contain' : 'cover',
                      display: 'block'
                    }} 
                   />
                 </motion.div>
               ))}
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
            {lang === 'TR' ? 'SIRADAKİ PROJE' : 'NEXT PROJECT'}
          </p>
          <Link 
            to={`/project/${nextProject.id}`}
            onMouseEnter={() => setCursorType('project')}
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
