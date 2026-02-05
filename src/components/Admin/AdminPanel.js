// src/components/Admin/AdminPanel.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/css/Admin.css'; // Vamos criar esse CSS simples depois

const AdminPanel = () => {
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        technologies: '',
        repoUrl: '',
        demoUrl: ''
    });
    const [files, setFiles] = useState(null);
    const [loading, setLoading] = useState(false);

    // URL do seu Backend no Render
    const API_URL = "https://meu-portfolio-api-u690.onrender.com/projects"; 

    // Carregar projetos ao abrir
    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        const res = await axios.get(API_URL);
        setProjects(res.data);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('technologies', formData.technologies); // Envie separado por vírgula (ex: React,Node,CSS)
        data.append('repoUrl', formData.repoUrl);
        data.append('demoUrl', formData.demoUrl);

        if (files) {
            for (let i = 0; i < files.length; i++) {
                data.append('images', files[i]);
            }
        }

        try {
            await axios.post(API_URL, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert('Projeto criado com sucesso!');
            setFormData({ title: '', description: '', technologies: '', repoUrl: '', demoUrl: '' });
            fetchProjects();
        } catch (error) {
            alert('Erro ao criar projeto');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que quer deletar?")) {
            await axios.delete(`${API_URL}/${id}`);
            fetchProjects();
        }
    };

    return (
        <div className="admin-container">
            <h2>Painel Admin 🕵️‍♂️</h2>
            
            <form onSubmit={handleSubmit} className="admin-form">
                <input name="title" placeholder="Título do Projeto" onChange={handleInputChange} value={formData.title} required />
                <textarea name="description" placeholder="Descrição" onChange={handleInputChange} value={formData.description} required />
                <input name="technologies" placeholder="Tecnologias (separadas por vírgula)" onChange={handleInputChange} value={formData.technologies} required />
                <input name="repoUrl" placeholder="Link do GitHub" onChange={handleInputChange} value={formData.repoUrl} />
                <input name="demoUrl" placeholder="Link do Demo (Online)" onChange={handleInputChange} value={formData.demoUrl} />
                
                <label>Imagens (Máx 5):</label>
                <input type="file" multiple onChange={handleFileChange} accept="image/*" />

                <button type="submit" disabled={loading}>
                    {loading ? 'Enviando...' : 'Adicionar Projeto'}
                </button>
            </form>

            <div className="admin-list">
                <h3>Projetos Atuais</h3>
                <ul>
                    {projects.map(p => (
                        <li key={p._id}>
                            {p.title} 
                            <button onClick={() => handleDelete(p._id)} style={{marginLeft: '10px', color: 'red'}}>X</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminPanel;