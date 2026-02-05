// src/components/Admin/AdminPanel.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCloudUploadAlt, FaTrash, FaCheckCircle } from 'react-icons/fa';
import '../../assets/css/Admin.css'; // Importando o CSS Premium

const AdminPanel = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [technologies, setTechnologies] = useState('');
    const [repoUrl, setRepoUrl] = useState('');
    const [demoUrl, setDemoUrl] = useState('');
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState([]);

    // URL da API (Do Render ou Local)
    const API_URL = process.env.REACT_APP_API_URL 
        ? `${process.env.REACT_APP_API_URL}/projects` 
        : "http://localhost:5000/projects";

    // Busca projetos ao carregar
    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await axios.get(API_URL);
            setProjects(res.data);
        } catch (error) {
            console.error("Erro ao carregar projetos", error);
        }
    };

    const handleImageChange = (e) => {
        setImages(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('technologies', technologies);
        formData.append('repoUrl', repoUrl);
        formData.append('demoUrl', demoUrl);

        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }

        try {
            await axios.post(API_URL, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert('Projeto adicionado com sucesso! 🚀');
            // Limpa o formulário
            setTitle('');
            setDescription('');
            setTechnologies('');
            setImages([]);
            fetchProjects(); // Atualiza a lista
        } catch (error) {
            console.error(error);
            alert('Erro ao salvar projeto.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que quer deletar esse projeto?")) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                fetchProjects();
            } catch (error) {
                alert("Erro ao deletar");
            }
        }
    };

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h2>Painel Administrativo 🕵️‍♂️</h2>
                <p>Gerencie seu portfólio em tempo real.</p>
            </div>

            <div className="admin-form-card">
                <form onSubmit={handleSubmit}>
                    
                    {/* Linha 1: Título e Tecnologias */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Nome do Projeto</label>
                            <input 
                                className="admin-input"
                                type="text" 
                                placeholder="Ex: E-commerce Vintepila"
                                value={title} 
                                onChange={e => setTitle(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label>Tecnologias (separadas por vírgula)</label>
                            <input 
                                className="admin-input"
                                type="text" 
                                placeholder="Ex: React, Node.js, MongoDB"
                                value={technologies} 
                                onChange={e => setTechnologies(e.target.value)} 
                                required 
                            />
                        </div>
                    </div>

                    {/* Descrição */}
                    <div className="form-group">
                        <label>Descrição Detalhada</label>
                        <textarea 
                            className="admin-textarea"
                            placeholder="Descreva os desafios e soluções desse projeto..."
                            value={description} 
                            onChange={e => setDescription(e.target.value)} 
                            required 
                        />
                    </div>

                    {/* Linha 2: Links */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Link do Repositório (GitHub)</label>
                            <input 
                                className="admin-input"
                                type="text" 
                                placeholder="https://github.com/..."
                                value={repoUrl} 
                                onChange={e => setRepoUrl(e.target.value)} 
                            />
                        </div>
                        <div className="form-group">
                            <label>Link do Demo (Site Online)</label>
                            <input 
                                className="admin-input"
                                type="text" 
                                placeholder="https://..."
                                value={demoUrl} 
                                onChange={e => setDemoUrl(e.target.value)} 
                            />
                        </div>
                    </div>

                    {/* Upload de Imagens */}
                    <div className="form-group">
                        <label>Imagens do Projeto (Max 5)</label>
                        <label className="file-upload-label">
                            <input 
                                type="file" 
                                multiple 
                                onChange={handleImageChange} 
                                accept="image/*"
                            />
                            <FaCloudUploadAlt size={24} />
                            <span>
                                {images.length > 0 
                                    ? `${images.length} arquivo(s) selecionado(s)` 
                                    : "Clique para escolher imagens"}
                            </span>
                        </label>
                    </div>

                    <button type="submit" className="btn-submit" disabled={loading}>
                        {loading ? "Enviando para a Nuvem..." : "🚀 Adicionar Projeto"}
                    </button>
                </form>
            </div>

            {/* Lista de Projetos Existentes */}
            <div className="projects-list-section">
                <h3>Projetos Atuais ({projects.length})</h3>
                <div className="projects-list-grid">
                    {projects.map(proj => (
                        <div key={proj._id} className="admin-project-card">
                            <h4>{proj.title}</h4>
                            <p style={{fontSize: '0.8rem', color: '#aaa'}}>
                                {proj.technologies.join(', ')}
                            </p>
                            <button 
                                onClick={() => handleDelete(proj._id)} 
                                className="btn-delete"
                            >
                                <FaTrash /> Deletar
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;