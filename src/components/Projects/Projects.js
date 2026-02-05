// src/components/Projects/Projects.js
import React, { useState, useEffect } from 'react'; 
import '../../assets/css/Projects.css';
import ImageGallery from 'react-image-gallery';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import axios from 'axios';

const Projects = React.forwardRef((props, ref) => {
  // 1. Estado para guardar os projetos que vêm da API
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. URL do seu Backend (Troque isso quando subir para o Render)
  // Enquanto testa local, use a porta do seu servidor backend (ex: 5000)
  const API_URL = "https://meu-portfolio-api-u690.onrender.com/projects"; 

  // 3. Busca os dados assim que o componente carrega
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(API_URL);
        setProjectsData(response.data);
      } catch (error) {
        console.error("Erro ao buscar projetos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section ref={ref} id="projects" className="projects-section">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="projects-header"
      >
        <h2>Projetos Selecionados<span className="highlight-dot">.</span></h2>
        <p className="projects-subtitle">
          Uma coleção de soluções reais vindas diretamente do meu banco de dados. 
          Veja mais no meu <a href='https://github.com/otaviohenrique-dev-web' target="_blank" rel="noopener noreferrer">GitHub</a>.
        </p>
      </motion.div>

      {/* Exibe mensagem de carregando se a API demorar */}
      {loading ? (
        <p style={{textAlign: 'center', color: 'var(--text-secondary)'}}>Carregando projetos...</p>
      ) : (
        <div className="projects-grid">
          {projectsData.map((project, index) => (
            <motion.div 
              key={project._id || index} // MongoDB usa _id
              className="project-card glass-panel"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              
              {/* Galeria de Imagens */}
              <div className="card-gallery">
                {/* Verifica se existem imagens antes de renderizar a galeria */}
                {project.images && project.images.length > 0 ? (
                    <ImageGallery
                    items={project.images.map(img => ({
                        original: img.original, // Backend já manda a URL completa do Cloudinary
                        thumbnail: img.thumbnail
                    }))}
                    showThumbnails={false}
                    showFullscreenButton={true}
                    showPlayButton={false}
                    showNav={true}
                    lazyLoad={true}
                    additionalClass="custom-gallery"
                    />
                ) : (
                    // Placeholder caso o projeto não tenha imagem
                    <div style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000'}}>
                        <span style={{color: '#555'}}>Sem imagem</span>
                    </div>
                )}
              </div>

              {/* Conteúdo do Projeto */}
              <div className="card-content">
                <div className="card-header">
                  <h3>{project.title}</h3>
                  <div className="tech-tags">
                     {/* Verifica se technologies existe antes de dar map */}
                     {project.technologies && project.technologies.slice(0, 3).map((tech, i) => (
                       <span key={i} className="tech-tag">{tech}</span>
                     ))}
                     {project.technologies && project.technologies.length > 3 && <span className="tech-tag">...</span>}
                  </div>
                </div>

                <p className="card-desc">{project.description}</p>

                {/* Botões de Ação */}
                <div className="card-actions">
                  {project.demoUrl ? (
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-action primary">
                      <FaExternalLinkAlt /> Demo
                    </a>
                  ) : (
                    <span className="btn-action disabled" title="Apenas Backend/Desktop">
                      <FaExternalLinkAlt /> Offline
                    </span>
                  )}
                  
                  {project.repoUrl && (
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn-action secondary">
                      <FaGithub /> Código
                    </a>
                  )}
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
});

export default Projects;