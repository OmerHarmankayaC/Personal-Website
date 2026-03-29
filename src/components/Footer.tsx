import { motion } from 'framer-motion';
import { useI18n } from '../i18n/context';
import { useState } from 'react';

const LinkRow = ({ text, href, icon = "↗", id }: { text: string; href: string; icon?: string; id?: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <a 
      href={href}
      id={id}
      target={href.startsWith('http') ? "_blank" : undefined}
      rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '18px 0',
        borderBottom: `1px solid ${isHovered ? 'rgba(240,238,232,0.2)' : 'rgba(240,238,232,0.08)'}`,
        textDecoration: 'none',
        transition: 'all 0.2s',
        width: '100%',
        cursor: 'none'
      }}
    >
      <span style={{ 
        fontFamily: 'var(--font-body)', 
        fontSize: '13px', 
        fontWeight: 400,
        opacity: isHovered ? 1 : 0.55,
        transition: 'opacity 0.2s',
        color: 'var(--text)'
      }}>
        {text}
      </span>
      <span style={{ 
        fontFamily: 'var(--font-body)', 
        fontSize: '13px', 
        opacity: isHovered ? 0.8 : 0.3,
        transition: 'opacity 0.2s',
        color: 'var(--text)'
      }}>
        {icon}
      </span>
    </a>
  );
};

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer style={{ 
      borderTop: '1px solid var(--border)',
      paddingTop: '25vh',
      paddingBottom: '20vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden'
    }} className="container">
      
      {/* Contact Section */}
      <div style={{ 
        position: 'relative', 
        zIndex: 10, 
        marginBottom: '15vh',
        paddingLeft: '7vw' 
      }}>
        <motion.h2 
          whileHover={{ color: '#ffffff' }}
          initial={{ color: 'rgba(255,255,255,0.2)' }}
          transition={{ duration: 0.4 }}
          style={{ 
            fontFamily: 'var(--font-serif)', 
            fontWeight: 700, 
            fontSize: 'clamp(52px, 8vw, 96px)', 
            lineHeight: 0.92, 
            letterSpacing: '-0.02em',
            marginBottom: '48px',
            textTransform: 'none',
            cursor: 'none'
          }}
        >
          Let's build<br />
          <span style={{ fontWeight: 400 }}>something.</span>
        </motion.h2>

        <p style={{ 
          fontFamily: 'var(--font-body)', 
          fontWeight: 300, 
          fontSize: '17px', 
          opacity: 0.55, 
          maxWidth: '480px', 
          marginBottom: '56px',
          lineHeight: 1.5
        }}>
          I'm open to opportunities, collaborations, and interesting conversations.
        </p>

        <div style={{ maxWidth: '600px' }}>
          <LinkRow text="omr.harmankaya@gmail.com" href="mailto:omr.harmankaya@gmail.com" />
          <LinkRow text="linkedin.com/in/omer-harmankaya" href="https://www.linkedin.com/in/omer-harmankaya" />
          <LinkRow text="github.com/OmerHarmankayaC" href="https://github.com/OmerHarmankayaC" />
          <LinkRow text="Download CV" href="#" icon="↓" id="cv-download" />
        </div>
      </div>

      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: 'auto', position: 'relative', zIndex: 10 }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontFamily: 'var(--font-body)', fontWeight: 300 }}>© 2026</p>
      </div>

      {/* LET'S WORK Watermark */}
      <motion.h1 
        whileHover={{ 
          y: '-6.5vw', // Increased lift to ensure complete reveal
          opacity: 1, 
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
        }}
        initial={{ y: 0, opacity: 0.06 }}
        style={{ 
          position: 'absolute',
          bottom: '-5vw', 
          left: '50%',
          x: '-50%',
          // Responsive font size: reduces scale for longer strings (Turkish)
          fontSize: t.footer.title.length > 12 
            ? 'clamp(3rem, 10vw, 18rem)' 
            : 'clamp(4rem, 15vw, 22rem)', 
          lineHeight: 0.8,
          whiteSpace: 'nowrap',
          color: '#ffffff',
          fontFamily: 'var(--font-serif)',
          fontWeight: 800,
          zIndex: 1,
          textTransform: 'uppercase',
          cursor: 'none',
          pointerEvents: 'auto',
          userSelect: 'none',
          willChange: 'transform, opacity'
        }}
      >
        {t.footer.title}
      </motion.h1>
      
    </footer>
  )
}
