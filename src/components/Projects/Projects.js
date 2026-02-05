import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
// Importação dos estilos globais do projeto
import '../../assets/css/Projects.css';

// --- Sub-componente do Carrossel ---
const ProjectImageCarousel = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [images]);

  // Lógica de Proteção: Tenta extrair a URL correta independente do formato
  const getImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/600x400?text=Sem+Imagem";
    
    // Caso 1: É uma string (Link direto)
    if (typeof img === 'string') {
        if (img.includes('localhost') || !img.startsWith('http')) {
            return "https://via.placeholder.com/600x400?text=Link+Quebrado";
        }
        return img;
    }
    
    // Caso 2: É um objeto (Aqui estava o erro!)
    // Agora aceitamos .original (que vem do seu JSON), além de .secure_url e .url
    if (typeof img === 'object') {
        return img.original || img.secure_url || img.url || "https://via.placeholder.com/600x400?text=Erro+Formato";
    }

    return "https://via.placeholder.com/600x400?text=Sem+Imagem";
  };

  const currentImageRaw = images && images.length > 0 ? images[currentIndex] : null;
  const currentImageSrc = getImageUrl(currentImageRaw);

  return (
    <div className="project-image-wrapper">
      <img 
        src={currentImageSrc} 
        alt={`${title} - Preview ${currentIndex + 1}`} 
        className="project-image"
        onError={(e) => { e.target.src = "https://via.placeholder.com/600x400?text=Imagem+Nao+Carregou"; }}
      />
      
      {images && images.length > 1 && (
        <div className="carousel-indicators">
          {images.map((_, idx) => (
            <span 
              key={idx} 
              className={`indicator ${idx === currentIndex ? 'active' : ''}`}
            />
          ))}
        </div>
      )}
    </div>
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
    const fetchProjects = async () => {
      try {
        const response = await axios.get(API_URL);
        setProjects(response.data);
      } catch (error) {
        console.error("Erro ao buscar projetos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [API_URL]);

  if (loading) {
    return <div className="loading-container">Carregando projetos...</div>;
  }

  return (
    <section className="projects-section" id="projects">
      <div className="container">
        <div className="section-title">
          <h2>Projetos Selecionados<span>.</span></h2>
          <p>
            Uma coleção de soluções reais vindas diretamente do meu banco de dados. 
            Veja mais no meu <a href="https://github.com/otaviohenrique-dev-web" target="_blank" rel="noopener noreferrer">GitHub</a>.
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
                    {project.technologies && project.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>

                  <p className="project-description">
                    {project.description}
                  </p>

                  <div className="project-links">
                    {project.repoUrl && (
                      <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn-link">
                        <FaGithub /> Código
                      </a>
                    )}
                    {project.demoUrl && (
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-link outline">
                        <FaExternalLinkAlt /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-projects-msg">Nenhum projeto encontrado. Adicione pelo Painel Admin!</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;