import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/context';
import { useCursor } from '../context/CursorContext';
import VeraShowcase from './VeraShowcase';
import { useIsMobile } from '../hooks/useIsMobile';

export default function Projects() {
  const { t } = useI18n();
  const { setCursorType } = useCursor();
  const isMobile = useIsMobile(768);

  // Hospital DB ERD Visual (SVG)
  const HospitalDBVisual = () => (
    <motion.svg 
      viewBox="0 0 400 300" 
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 0.9, 0.5] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
    >
      {/* Table 1 */}
      <rect x="50" y="50" width="100" height="80" rx="2" fill="rgba(240,238,232,0.06)" stroke="rgba(240,238,232,0.6)" strokeWidth="0.8" />
      <line x1="50" y1="70" x2="150" y2="70" stroke="rgba(240,238,232,0.6)" strokeWidth="0.8" />
      <line x1="60" y1="85" x2="140" y2="85" stroke="rgba(240,238,232,0.3)" strokeWidth="0.5" />
      <line x1="60" y1="100" x2="140" y2="100" stroke="rgba(240,238,232,0.3)" strokeWidth="0.5" />
      <line x1="60" y1="115" x2="140" y2="115" stroke="rgba(240,238,232,0.3)" strokeWidth="0.5" />

      {/* Table 2 */}
      <rect x="250" y="80" width="100" height="80" rx="2" fill="rgba(240,238,232,0.06)" stroke="rgba(240,238,232,0.6)" strokeWidth="0.8" />
      <line x1="250" y1="100" x2="350" y2="100" stroke="rgba(240,238,232,0.6)" strokeWidth="0.8" />
      <line x1="260" y1="115" x2="340" y2="115" stroke="rgba(240,238,232,0.3)" strokeWidth="0.5" />
      <line x1="260" y1="130" x2="340" y2="130" stroke="rgba(240,238,232,0.3)" strokeWidth="0.5" />
      <line x1="260" y1="145" x2="340" y2="145" stroke="rgba(240,238,232,0.3)" strokeWidth="0.5" />

      {/* Table 3 */}
      <rect x="150" y="180" width="100" height="80" rx="2" fill="rgba(240,238,232,0.06)" stroke="rgba(240,238,232,0.6)" strokeWidth="0.8" />
      <line x1="150" y1="200" x2="250" y2="200" stroke="rgba(240,238,232,0.6)" strokeWidth="0.8" />
      <line x1="160" y1="215" x2="240" y2="215" stroke="rgba(240,238,232,0.3)" strokeWidth="0.5" />
      <line x1="160" y1="230" x2="240" y2="230" stroke="rgba(240,238,232,0.3)" strokeWidth="0.5" />
      <line x1="160" y1="245" x2="240" y2="245" stroke="rgba(240,238,232,0.3)" strokeWidth="0.5" />

      {/* Connectors */}
      <path d="M 150 90 L 250 90" fill="none" stroke="rgba(240,238,232,0.5)" strokeWidth="0.8" />
      <rect x="148" y="88" width="4" height="4" transform="rotate(45 150 90)" fill="rgba(240,238,232,0.8)" />
      <rect x="248" y="88" width="4" height="4" transform="rotate(45 250 90)" fill="rgba(240,238,232,0.8)" />

      <path d="M 300 160 L 300 220 L 250 220" fill="none" stroke="rgba(240,238,232,0.5)" strokeWidth="0.8" />
      <rect x="298" y="158" width="4" height="4" transform="rotate(45 300 160)" fill="rgba(240,238,232,0.8)" />
      <rect x="248" y="218" width="4" height="4" transform="rotate(45 250 220)" fill="rgba(240,238,232,0.8)" />
    </motion.svg>
  );

  return (
    <section className="container" id="projects" style={{ paddingBottom: '20vh' }}>
      <h2 style={{ 
        color: 'var(--text)', 
        fontSize: 'clamp(3rem, 10vw, 6.5rem)', 
        lineHeight: 0.9,
        marginBottom: '4rem',
        paddingLeft: '0',
        fontWeight: 400,
        textTransform: 'uppercase',
        fontFamily: 'var(--font-display)',
        letterSpacing: '0.02em'
      }}>{t.projects.title}</h2>
      
      <div className="brutalist-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: '0px' 
      }}>
        {t.projects.items.filter((i: any) => i.featured !== false).map((item: any, idx: number) => {
          
          const isVera = item.id === 'vera';
          const isIEEE = item.id === 'ieee';
          const isHospital = item.id === 'hospital-db';
          
          let heroImage: any = null;
          if (item.images && item.images.length > 0) {
             if (isVera) {
               heroImage = item.images.find((i: any) => i.src.includes('home-screen')) || item.images[0];
             } else {
               heroImage = item.images[0];
             }
          }

          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: 'easeOut' }}
              whileHover={{}}
              style={{ 
                position: 'relative',
                gridColumn: isMobile ? 'span 12' : (item.size === 'large' ? 'span 12' : (item.size === 'medium-large' ? 'span 8' : 'span 4')),
                backgroundColor: '#000000',
                border: isMobile ? 'none' : '1px solid rgba(255,255,255,0.4)',
                borderBottom: isMobile ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.4)',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: isVera ? 'center' : 'space-between',
                minHeight: isMobile ? 'auto' : (item.size === 'large' ? '90vh' : '85vh'),
                color: 'var(--text)',
                transition: 'background-color 0.3s ease',
                overflow: 'hidden',
                paddingBottom: isMobile ? '4rem' : '0'
              }}
              onMouseEnter={() => !isMobile && setCursorType('project')}
              onMouseLeave={() => !isMobile && setCursorType('default')}
            >
              {/* GLOBAL LINK OVERLAY (Using Link for internal and keeping a consistent behavior) */}
              <Link 
                to={`/project/${item.id}`} 
                style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  zIndex: 25, 
                  cursor: isVera && !isMobile ? 'none' : 'pointer'
                }}
                onMouseEnter={() => !isMobile && setCursorType('project')}
              />

              {/* Photo Area on Mobile (Top) - Standardized for all projects */}
              {isMobile && !isVera && (isIEEE || isHospital) && (
                <div style={{ width: '100%', height: isIEEE ? '300px' : '250px', marginBottom: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', overflow: 'hidden' }}>
                    {isIEEE && heroImage && (
                        <motion.img 
                            src={heroImage.src} 
                            style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'bottom' }} 
                        />
                    )}
                    {isHospital && <HospitalDBVisual />}
                </div>
              )}

              {/* VERA FINANCE: SPECIAL LAYOUT */}
              {isVera ? (
                <div style={{ 
                  position: 'relative', 
                  width: '100%', 
                  height: isMobile ? 'auto' : '100%', 
                  display: 'flex', 
                  flexDirection: isMobile ? 'column' : 'row',
                  padding: 'clamp(1.5rem, 5vw, 4rem)'
                }}>
                  {/* Photo/Showcase Area on Mobile (Top) */}
                  {isMobile && (
                    <div style={{ position: 'relative', zIndex: 30, width: '100%', height: '60vh', marginBottom: '2.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onMouseEnter={() => setCursorType('default')}>
                       <VeraShowcase />
                    </div>
                  )}

                  {/* Left Info Area */}
                  <div 
                    style={{ 
                      position: 'relative', 
                      zIndex: 20, 
                      width: isMobile ? '100%' : '45%',
                      textAlign: 'left',
                      pointerEvents: 'none' 
                    }}
                    onMouseEnter={() => !isMobile && setCursorType('project')}
                  >
                    <div style={{ pointerEvents: 'auto' }}>
                      <h2 style={{ fontSize: 'clamp(1.5rem, 6vw, 3.5rem)', color: 'var(--text)', fontWeight: 400, margin: '0 0 1rem 0', fontFamily: 'var(--font-display)', textTransform: 'uppercase', letterSpacing: '0.01em' }}>{item.title}</h2>
                      <p style={{ 
                        fontSize: 'clamp(1.1rem, 4vw, 1.15rem)', 
                        color: 'var(--text)', 
                        opacity: 0.85,
                        lineHeight: 1.6, 
                        fontFamily: 'var(--font-body)', 
                        fontWeight: 400, 
                        marginBottom: '0.5rem',
                        marginTop: '1.5rem' 
                      }}>{item.description}</p>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '2rem', letterSpacing: '0.05em' }}>{item.tags}</p>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text)' }}>
                        <span style={{ 
                          fontFamily: 'var(--font-mono)', 
                          fontSize: '0.75rem', 
                          textTransform: 'uppercase', 
                          letterSpacing: '0.1em', 
                          borderBottom: '1px solid rgba(255,255,255,0.3)',
                          paddingBottom: '2px'
                        }}>
                          {t.hero.projectMeta.viewCaseStudy}
                        </span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </div>
                      
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ padding: isMobile ? '0 clamp(1.5rem, 5vw, 4rem) clamp(1.5rem, 5vw, 4rem)' : 'clamp(1.5rem, 5vw, 4rem)', height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ position: 'relative', zIndex: 20 }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.75rem', fontWeight: 600, letterSpacing: '0.15em' }}>{item.role}</p>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 6vw, 3.8rem)', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.02em', lineHeight: 1 }}>{item.title}</h3>
                    
                    <p style={{ 
                      maxWidth: '500px', 
                      color: 'var(--text)',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 400,
                      position: 'relative',
                      zIndex: 20,
                      marginTop: '1.5rem',
                      lineHeight: 1.6,
                      opacity: 0.85,
                      fontSize: 'clamp(1.1rem, 4vw, 1.15rem)'
                    }}>
                      {item.description}
                    </p>

                    <p style={{ 
                      position: 'relative', 
                      zIndex: 20, 
                      fontFamily: 'var(--font-mono)', 
                      fontSize: '0.7rem', 
                      color: 'var(--text-muted)',
                      marginTop: '1.5rem',
                      letterSpacing: '0.1em',
                      marginBottom: '1rem'
                    }}>
                      {item.tags}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text)' }}>
                        <span style={{ 
                          fontFamily: 'var(--font-mono)', 
                          fontSize: '0.75rem', 
                          textTransform: 'uppercase', 
                          letterSpacing: '0.1em', 
                          borderBottom: '1px solid rgba(255,255,255,0.3)',
                          paddingBottom: '2px'
                        }}>
                          {t.hero.projectMeta.viewCaseStudy}
                        </span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </div>
                  </div>
                </div>
              )}
              
              {/* VISUALS (Desktop Only for Absolutely Positioned Overlays) */}
              {isVera && !isMobile ? (
                <div 
                  style={{ position: 'absolute', right: 0, top: 0, width: '55%', height: '100%', overflow: 'hidden', zIndex: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4vh 0' }}
                  onMouseEnter={() => setCursorType('project')} 
                >
                  <div 
                    style={{ position: 'relative', zIndex: 2, cursor: 'default' }}
                    onMouseEnter={(e) => { e.stopPropagation(); setCursorType('default'); }}
                    onClick={(e) => e.stopPropagation()} 
                    onMouseDown={(e) => e.stopPropagation()} 
                  >
                    <VeraShowcase />
                  </div>
                </div>
              ) : null}

              {isIEEE && !isMobile && heroImage && (
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '42%', overflow: 'hidden', zIndex: 5, padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                  <motion.img 
                    src={heroImage.src} 
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'bottom' }} 
                  />
                </div>
              )}

              {isHospital && !isMobile && (
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: '90%', height: '60%', overflow: 'hidden', zIndex: 5, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', padding: '1rem' }}>
                  <HospitalDBVisual />
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Archive Link */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '6rem' }}>
        <Link 
          to="/archive"
          onMouseEnter={() => setCursorType('default')}
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'var(--text)',
            padding: '1rem 2rem',
            border: '1px solid var(--border)',
            transition: 'all 0.3s ease',
            backgroundColor: 'rgba(255,255,255,0.02)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--text)';
            e.currentTarget.style.color = 'var(--bg)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)';
            e.currentTarget.style.color = 'var(--text)';
          }}
        >
          {t.hero.archive} →
        </Link>
      </div>
    </section>
  )
}
