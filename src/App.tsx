import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Footer from './components/Footer';
import ProjectDetail from './components/ProjectDetail';
import CustomCursor from './components/CustomCursor';
import { I18nProvider } from './i18n/context';
import { CursorProvider } from './context/CursorContext';

// Scroll Management Component
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MainLayout() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Footer />
    </main>
  );
}

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <I18nProvider>
      <CursorProvider>
        <Router>
          <ScrollToTop />
          <CustomCursor />
          <Routes>
            <Route path="/" element={<MainLayout />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
          </Routes>
        </Router>
      </CursorProvider>
    </I18nProvider>
  );
}

export default App;
