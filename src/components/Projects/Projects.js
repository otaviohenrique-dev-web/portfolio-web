import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import './Projects.css'; // Certifique-se de que este arquivo existe (ou remova se usar outro CSS)

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define a URL da API (Produção ou Local)
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
    return <div style={{ textAlign: 'center', color: '#fff', padding: '50px' }}>Carregando projetos...</div>;
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
                
                {/* --- AQUI ESTÁ A CORREÇÃO DA IMAGEM --- */}
                <div className="project-image-wrapper">
                  <img 
                    src={
                      project.images && project.images.length > 0 
                        ? project.images[0] // Pega a primeira imagem do array
                        : "https://via.placeholder.com/600x400?text=Projeto+Sem+Imagem" // Imagem padrão se não tiver nada
                    } 
                    alt={project.title} 
                    className="project-image"
                  />
                </div>
                {/* -------------------------------------- */}

                <div className="project-content">
                  <h3>{project.title}</h3>
                  
                  {/* Tags de Tecnologias */}
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
            <p style={{ color: '#aaa' }}>Nenhum projeto encontrado. Adicione pelo Painel Admin!</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;