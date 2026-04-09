import { motion, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/context';
import { useCursor } from '../context/CursorContext';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

export default function Archive() {
  const { t } = useI18n();
  const { setCursorType } = useCursor();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
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
        paddingBottom: '10rem'
      }}
    >
      <div className="container">
        {/* Navigation */}
        <motion.div variants={itemVariants} style={{ marginBottom: '6rem' }}>
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
            {t.hero.cursor.back}
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div variants={itemVariants} style={{ marginBottom: '4rem' }}>
          <h1 style={{ 
            fontSize: 'clamp(3.5rem, 10vw, 8rem)', 
            fontFamily: 'var(--font-display)',
            lineHeight: 0.9,
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            margin: 0
          }}>
            {t.hero.archive}
          </h1>
        </motion.div>

        {/* Projects List/Table */}
        <div style={{ borderTop: '1px solid var(--border)' }}>
          {/* Table Header (Desktop Only) */}
          <motion.div 
            variants={itemVariants}
            style={{ 
              display: window.innerWidth >= 768 ? 'grid' : 'none', 
              gridTemplateColumns: 'minmax(60px, 1fr) 4fr 3fr 3fr max-content', 
              gap: '2rem',
              padding: '1.5rem 0',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em'
            }}
          >
            <span>{t.hero.projectMeta.year}</span>
            <span>Project</span>
            <span>{t.hero.projectMeta.role}</span>
            <span>{t.hero.projectMeta.category}</span>
            <span style={{ width: '24px' }}></span>
          </motion.div>

          {/* Table Rows */}
          {t.projects.items.map((project: any, idx: number) => (
            <motion.div key={idx} variants={itemVariants}>
              <Link 
                to={`/project/${project.id}`}
                onMouseEnter={() => setCursorType('project')}
                onMouseLeave={() => setCursorType('default')}
                style={{
                  display: 'grid',
                  gridTemplateColumns: window.innerWidth >= 768 ? 'minmax(60px, 1fr) 4fr 3fr 3fr max-content' : '1fr',
                  gap: window.innerWidth >= 768 ? '2rem' : '0.5rem',
                  padding: window.innerWidth >= 768 ? '2rem 0' : '1.5rem 0',
                  borderBottom: '1px solid var(--border)',
                  textDecoration: 'none',
                  color: 'var(--text)',
                  alignItems: 'center',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)';
                  e.currentTarget.style.paddingLeft = '1rem';
                  e.currentTarget.style.paddingRight = '1rem';
                  // Expand bounds slightly to prevent visual jump 
                  e.currentTarget.style.marginLeft = '-1rem';
                  e.currentTarget.style.marginRight = '-1rem';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.paddingLeft = '0';
                  e.currentTarget.style.paddingRight = '0';
                  e.currentTarget.style.marginLeft = '0';
                  e.currentTarget.style.marginRight = '0';
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {project.year}
                </div>
                
                <h2 style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', 
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  fontWeight: 400,
                  margin: 0
                }}>
                  {project.title}
                </h2>

                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', opacity: 0.8, textTransform: 'uppercase' }}>
                  {project.role}
                </div>

                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {project.category}
                </div>

                <div style={{ display: window.innerWidth >= 768 ? 'block' : 'none', color: 'var(--text-muted)' }}>
                    <ArrowUpRight size={20} strokeWidth={1} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
