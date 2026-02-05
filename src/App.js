import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Importação dos Componentes
import Header from './components/Header/Header';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import AdminPanel from './components/Admin/AdminPanel';

function App() {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop - 80,
      behavior: 'smooth',
    });
  };

  const Home = () => (
    <div className="App">
      <Header 
        scrollToSection={scrollToSection} 
        refs={{ homeRef, aboutRef, projectsRef, contactRef }} 
      />
      
      <main>
        {/* --- HERO SECTION (Minimalista Premium) --- */}
        <section ref={homeRef} id="home" className="hero-section">
          <div id="particle-container"></div>
          <div className="hero-content">
            <h1 className="hero-title">Otávio Henrique</h1>
            <h2 className="hero-subtitle">Desenvolvedor Full Stack</h2>
            <p className="hero-description">
              Transformando ideias em realidade com código limpo e design moderno.
            </p>
            <button 
              className="btn-premium hero-cta"
              onClick={() => scrollToSection(projectsRef)}
            >
              Veja meus projetos
            </button>
          </div>
          <div className="scroll-indicator">
            <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection(aboutRef); }}>
              <span></span>
              <span></span>
              <span></span>
            </a>
          </div>
        </section>

        {/* --- OUTRAS SEÇÕES --- */}
        <section ref={aboutRef} id="about">
          {typeof About !== 'undefined' ? <About /> : <h2>Sobre Mim</h2>}
        </section>

        <section ref={projectsRef} id="projects">
          <Projects />
        </section>

        <section ref={contactRef} id="contact">
          {typeof Contact !== 'undefined' ? <Contact /> : <h2>Contato</h2>}
        </section>
      </main>

      <Footer />
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;