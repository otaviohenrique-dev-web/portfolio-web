// src/components/Header/Header.js
import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaGithub, FaLinkedin, FaInstagram, FaUser, FaBriefcase, FaEnvelope } from 'react-icons/fa';
import '../../assets/css/Header.css';

const Header = ({ scrollToSection, refs }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Efeito para detectar scroll e mudar o estilo do header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (ref) => (event) => {
    event.preventDefault();
    scrollToSection(ref);
    setIsMobileMenuOpen(false);
  };

  const githubUrl = "https://github.com/otaviohenrique-dev-web";
  const linkedinUrl = "https://www.linkedin.com/in/otaviohenrique-dev/";
  const instagramUrl = "https://www.instagram.com/otavioh.dev";

  return (
    <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        
        <div className="logo-area">
          <div className="profile-thumb">
            {/* CORREÇÃO: Usando process.env.PUBLIC_URL para achar a imagem */}
            <img 
              src={process.env.PUBLIC_URL + '/images/profile.jpg'} 
              alt="Otávio Henrique" 
            />
          </div>
          <div className="logo-text">
            <h1>Otávio Henrique</h1>
            <div className="social-mini-links">
              <a href={githubUrl} target="_blank" rel="noreferrer"><FaGithub /></a>
              <a href={linkedinUrl} target="_blank" rel="noreferrer"><FaLinkedin /></a>
              <a href={instagramUrl} target="_blank" rel="noreferrer"><FaInstagram /></a>
            </div>
          </div>
        </div>
      
        <nav className="desktop-nav">
          <a href="#about" onClick={handleNavClick(refs.aboutRef)}>
            <FaUser className="nav-icon" /> Sobre
          </a>
          <a href="#projects" onClick={handleNavClick(refs.projectsRef)}>
            <FaBriefcase className="nav-icon" /> Projetos
          </a>
          <a href="#contact" onClick={handleNavClick(refs.contactRef)}>
            <FaEnvelope className="nav-icon" /> Contato
          </a>
        </nav>

        <button className="mobile-toggle" onClick={toggleMobileMenu} aria-label="Menu">
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className={`mobile-nav-overlay ${isMobileMenuOpen ? 'active' : ''}`}>
          <nav className="mobile-nav-content">
            <a href="#about" onClick={handleNavClick(refs.aboutRef)}>Sobre</a>
            <a href="#projects" onClick={handleNavClick(refs.projectsRef)}>Projetos</a>
            <a href="#contact" onClick={handleNavClick(refs.contactRef)}>Contato</a>
            
            <div className="mobile-socials">
               <a href={githubUrl} target="_blank" rel="noreferrer"><FaGithub /> GitHub</a>
               <a href={linkedinUrl} target="_blank" rel="noreferrer"><FaLinkedin /> LinkedIn</a>
               <a href={instagramUrl} target="_blank" rel="noreferrer"><FaInstagram /> Instagram</a>
            </div>
          </nav>
        </div>

      </div>
    </header>
  );
};

export default Header;