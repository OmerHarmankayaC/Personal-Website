import { useEffect, useState } from 'react';
import { motion, useMotionValue, AnimatePresence } from 'framer-motion';
import { useCursor } from '../context/CursorContext';
import { useI18n } from '../i18n/context';

export default function CustomCursor() {
  const { t } = useI18n();
  const { cursorType } = useCursor();
  const [isMobile, setIsMobile] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const updateMousePosition = (e: MouseEvent) => {
      // Use direct motion values for zero-latency response
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', checkMobile);
    };
  }, [mouseX, mouseY]);

  if (isMobile) return null;

  const isProject = cursorType === 'project';
  const isBack = cursorType === 'back';

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        x: mouseX,
        y: mouseY,
        pointerEvents: 'none',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        translateX: '-50%',
        translateY: '-50%',
        willChange: 'width, height, transform, border-radius'
      }}
      animate={{
        width: isProject ? 110 : (isBack ? 80 : 18),
        height: isProject ? 42 : (isBack ? 42 : 18),
        borderRadius: (isProject || isBack) ? '24px' : '50%',
        backgroundColor: '#ffffff',
        mixBlendMode: 'difference',
        scale: isClicked ? 0.9 : 1
      }}
      transition={{
        width: { type: 'spring', damping: 25, stiffness: 200 },
        height: { type: 'spring', damping: 25, stiffness: 200 },
        borderRadius: { type: 'spring', damping: 25, stiffness: 200 },
        scale: { duration: 0.1 }
      }}
    >
      <AnimatePresence mode="wait">
        {isProject && (
          <motion.span
            key="project"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            style={{
              color: '#ffffff',
              mixBlendMode: 'difference',
              fontFamily: 'var(--font-display)',
              fontSize: '13px',
              fontWeight: 900,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap'
            }}
          >
            {t.hero.cursor.explore}
          </motion.span>
        )}
        {isBack && (
          <motion.span
            key="back"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            style={{
              color: '#ffffff',
              mixBlendMode: 'difference',
              fontFamily: 'var(--font-display)',
              fontSize: '13px',
              fontWeight: 900,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap'
            }}
          >
            {t.hero.cursor.back}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
