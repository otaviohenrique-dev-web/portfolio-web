import React, {useRef} from 'react';
// ... seus imports de componentes ...
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Projects from './components/Projects/Projects';
import About from './components/About/About';
import Contact from './components/Contact/Contact';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPanel from './components/Admin/AdminPanel';

// IMPORTANTE: O caminho do CSS deve bater com a sua pasta assets
import './assets/css/App.css'; 
import "react-image-gallery/styles/css/image-gallery.css";

function App() {
  // ... (mantenha sua lógica de useRef e scrollToSection igual) ...
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref.current) {
        ref.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }
  };

  return (
    <Router>
        <Routes>
            {/* Rota Principal (Seu Portfolio) */}
            <Route path="/" element={
                <div className="App">
                    {/* ... Todo o seu conteúdo (Header, Main, Footer) ... */}
                </div>
            } />

            {/* Rota Admin (Escondida) */}
            <Route path="/admin" element={<AdminPanel />} />
        </Routes>
    </Router>
  );
}

export default App;