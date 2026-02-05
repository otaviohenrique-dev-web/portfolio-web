import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom'; // Importação CRUCIAL para o Portal
import axios from 'axios';
import { FaGithub, FaExternalLinkAlt, FaExpand, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import '../../assets/css/Projects.css';

// --- Sub-componente do Carrossel Inteligente ---
const ProjectImageCarousel = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Auto-play (Pausa se hover ou fullscreen)
  useEffect(() => {
    if (!images || images.length <= 1 || isHovered || isFullscreen) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images, isHovered, isFullscreen]);

  // Gerencia Scroll e Tecla ESC
  const closeFullscreen = useCallback(() => {
    setIsFullscreen(false);
  }, []);

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden'; // Trava o scroll do site
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') closeFullscreen();
        // Adicionando navegação por setas do teclado também
        if (e.key === 'ArrowRight') nextImage(null); 
        if (e.key === 'ArrowLeft') prevImage(null);
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'auto'; // Destrava o scroll
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isFullscreen, closeFullscreen]);

  const getImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/600x400?text=Sem+Imagem";
    if (typeof img === 'string') return img;
    if (typeof img === 'object') return img.original || img.secure_url || img.url;
    return "https://via.placeholder.com/600x400?text=Erro";
  };

  const nextImage = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  
  const openFullscreen = (e) => {
    e.stopPropagation();
    setIsFullscreen(true);
    setIsHovered(false); // Garante que o estado de hover limpe ao abrir
  };

  const closeOnOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeFullscreen();
    }
  };

  // Handlers de Mouse mais seguros
  const handleMouseEnter = () => {
    if (!isFullscreen) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const currentSrc = getImageUrl(images && images.length > 0 ? images[currentIndex] : null);
  const hasMultipleImages = images && images.length > 1;

  // --- O MODAL AGORA É UM PORTAL ---
  // Isso joga o HTML do modal para fora do Card, evitando conflito com CSS 'transform'
  const modalContent = isFullscreen ? (
    <div className="fullscreen-modal" onClick={closeOnOverlayClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={currentSrc} alt={title} className="modal-image" />
        
        <button className="modal-close" onClick={closeFullscreen}>
            <FaTimes />
        </button>

        {hasMultipleImages && (
          <>
            <button className="modal-nav prev" onClick={prevImage}><FaChevronLeft /></button>
            <button className="modal-nav next" onClick={nextImage}><FaChevronRight /></button>
            <div className="modal-counter">{currentIndex + 1} / {images.length}</div>
          </>
        )}
        
        <h3 className="modal-title">{title}</h3>
      </div>
    </div>
  ) : null;

  return (
    <>
      {/* Container da Imagem (Dentro do Card) */}
      <div 
        className="project-image-wrapper"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img 
          src={currentSrc} 
          alt={`${title} preview`} 
          className="project-image"
          onError={(e) => e.target.src = "https://via.placeholder.com/600x400?text=Erro+Carregar"}
        />
        
        {/* Controles do Card Pequeno */}
        {hasMultipleImages && (
          <>
            <button className="carousel-btn prev" onClick={prevImage}><FaChevronLeft /></button>
            <button className="carousel-btn next" onClick={nextImage}><FaChevronRight /></button>
            <div className="carousel-indicators">
              {images.map((_, idx) => (
                <span key={idx} className={`indicator ${idx === currentIndex ? 'active' : ''}`} />
              ))}
            </div>
          </>
        )}
        
        <button className="fullscreen-btn" onClick={openFullscreen} title="Ver em Tela Cheia">
          <FaExpand />
        </button>
      </div>

      {/* Renderiza o Modal no Body (Portal) */}
      {isFullscreen && createPortal(modalContent, document.body)}
    </>
  );
};

// --- Componente Principal ---
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // URL da API
  const API_URL = process.env.REACT_APP_API_URL 
    ? `${process.env.REACT_APP_API_URL}/projects` 
    : "http://localhost:5000/projects";

  useEffect(() => {
    axios.get(API_URL)
      .then(res => setProjects(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [API_URL]);

  if (loading) return <div className="loading-container">Carregando portfólio...</div>;

  return (
    <section className="projects-section" id="projects">
      <div className="section-title">
        <h2>Meus Projetos<span>.</span></h2>
        <p>Uma seleção de projetos que demonstram minhas habilidades em desenvolvimento.</p>
        <p className="github-link">
          Acompanhe todos os meus projetos no <a href="https://github.com/otaviohenrique-dev-web" target="_blank" rel="noreferrer">GitHub <FaExternalLinkAlt /></a>.
        </p>
      </div>

      <div className="projects-grid">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div className="project-card" key={project._id}>
              <ProjectImageCarousel images={project.images} title={project.title} />
              
              <div className="project-content">
                <h3>{project.title}</h3>
                <div className="project-tags">
                  {project.technologies?.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech.trim()}</span>
                  ))}
                </div>
                <p className="project-description">{project.description}</p>
                
                <div className="project-links">
                  {project.repoUrl && (
                    <a href={project.repoUrl} target="_blank" rel="noreferrer" className="btn-link">
                      <FaGithub /> Código
                    </a>
                  )}
                  {project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" rel="noreferrer" className="btn-link outline">
                      <FaExternalLinkAlt /> Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-projects-msg">Nenhum projeto encontrado.</p>
        )}
      </div>
    </section>
  );
};

export default Projects;