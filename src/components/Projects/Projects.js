import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
// Importação dos estilos globais do projeto
import '../../assets/css/Projects.css';

// Função auxiliar para formatar imagens para a galeria
const getGalleryItems = (images) => {
  if (!images || images.length === 0) {
    return [{
      original: "https://via.placeholder.com/600x400?text=Sem+Imagem",
      thumbnail: "https://via.placeholder.com/600x400?text=Sem+Imagem",
    }];
  }

  return images.map(img => {
    // Tenta extrair a URL correta independente do formato (string ou objeto)
    let url = "https://via.placeholder.com/600x400?text=Erro";
    if (typeof img === 'string') url = img;
    else if (typeof img === 'object') url = img.original || img.secure_url || img.url;

    return {
      original: url,
      thumbnail: url,
      originalClass: 'project-gallery-image',
      loading: 'lazy'
    };
  });
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
                
                <div className="project-image-wrapper">
                  <ImageGallery 
                    items={getGalleryItems(project.images)}
                    showPlayButton={false}
                    showFullscreenButton={true}
                    showNav={true}
                    showThumbnails={false}
                    showBullets={true}
                  />
                </div>

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