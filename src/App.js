import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Importação dos Componentes
import Header from './components/Header/Header'; // Verifique se o caminho está certo
import About from './components/About/About';    // Se não tiver esse componente, remova a importação
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact'; // Se não tiver, remova
import Footer from './components/Footer/Footer';    // Se não tiver, remova
import AdminPanel from './components/Admin/AdminPanel';

function App() {
  // Referências para o scroll suave (Landing Page)
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  // Função para rolar até a seção
  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: 'smooth',
    });
  };

  // Componente da Página Inicial (Para organizar o código)
  const Home = () => (
    <div className="App">
      {/* Passamos a função de scroll para o Header funcionar */}
      <Header 
        scrollToSection={scrollToSection} 
        refs={{ homeRef, aboutRef, projectsRef, contactRef }} 
      />
      
      <main>
        <section ref={homeRef} id="home">
           {/* Se você tiver um componente Hero/Intro, coloque aqui */}
           <div style={{height: '80vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
              <h1>Bem-vindo ao meu Portfólio</h1>
           </div>
        </section>

        <section ref={aboutRef} id="about">
          {/* Verifica se o componente existe antes de renderizar */}
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
        {/* Rota da Página Principal */}
        <Route path="/" element={<Home />} />
        
        {/* Rota do Painel Administrativo */}
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;