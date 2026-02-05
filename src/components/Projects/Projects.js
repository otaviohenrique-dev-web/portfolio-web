import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaGithub, FaExternalLinkAlt, FaExpand, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
// Importação do CSS atualizado
import '../../assets/css/Projects.css';

// --- Sub-componente do Carrossel Inteligente ---
const ProjectImageCarousel = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Auto-play (Pausa se o mouse estiver em cima ou se estiver em fullscreen)
  useEffect(() => {
    if (!images || images.length <= 1 || isHovered || isFullscreen) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [images, isHovered, isFullscreen]);

  // Função para limpar URL
  const getImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/600x400?text=Sem+Imagem";
    if (typeof img === 'string') return img;
    if (typeof img === 'object') return img.original || img.secure_url || img.url;
    return "https://via.placeholder.com/600x400?text=Erro";
  };

  const nextImage = (e) => {
    e?.stopPropagation(); // Impede cliques indesejados
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const toggleFullscreen = (e) => {
    e?.stopPropagation();
    setIsFullscreen(!isFullscreen);
  };

  const currentSrc = getImageUrl(images && images.length > 0 ? images[currentIndex] : null);
  const hasMultipleImages = images && images.length > 1;

  return (
    <>
      {/* --- Carrossel no Card --- */}
      <div 
        className="project-image-wrapper"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img 
          src={currentSrc} 
          alt={`${title} preview`} 
          className="project-image"
          onError={(e) => e.target.src = "https://via.placeholder.com/600x400?text=Erro+Carregar"}
        />

        {/* Controles (Só aparecem se tiver + de 1 imagem) */}
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

        {/* Botão Fullscreen */}
        <button className="fullscreen-btn" onClick={toggleFullscreen} title="Ver em Tela Cheia">
          <FaExpand />
        </button>
      </div>

      {/* --- Modal Fullscreen (Lightbox) --- */}
      {isFullscreen && (
        <div className="fullscreen-modal" onClick={toggleFullscreen}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={currentSrc} alt={title} className="modal-image" />
            
            <button className="modal-close" onClick={toggleFullscreen}><FaTimes /></button>
            
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
      )}
    </>
  );
};

// --- Componente Principal ---
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

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
        <h2>Projetos Selecionados<span>.</span></h2>
        <p>Soluções reais desenvolvidas com código limpo e performance.</p>
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