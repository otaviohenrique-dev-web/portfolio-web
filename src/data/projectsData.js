// src/data/projectsData.js

const projectsData = [
    {
        id: 1, 
        title: 'SniperBot Pro (v7.0)',
        description: 'Sistema de trading algorítmico autônomo para criptomoedas com arquitetura focada em preservação de capital. Possui gestão de risco institucional e execução redundante na Binance.',
        technologies: ['Python', 'Flask', 'React.js', 'Binance API', 'Git'],
        // Caminho direto da pasta public (sem import!)
        images: [
            { original: '/images/projeto4/proj4_img2.png', thumbnail: '/images/projeto4/proj4_img2.png', description: 'Tela de Login' },
            { original: '/images/projeto4/proj4_img5.png', thumbnail: '/images/projeto4/proj4_img5.png', description: 'Dashboard Principal' },
            { original: '/images/projeto4/proj4_img6.png', thumbnail: '/images/projeto4/proj4_img6.png', description: 'Sniper Lab Backtest' },
        ],
        demoUrl: null,
        repoUrl: 'https://github.com/ResoluteJax/sniper-bot-pro-showcase'
    },
    {
        id: 2,
        title: 'FlowTask: To-Do List',
        description: 'Gerenciador de tarefas interativo. Adicione, marque como concluído e remova suas tarefas diárias de forma simples e rápida.',
        technologies: ['React Hooks', 'CSS Modules', 'JavaScript'],
        images: [
            { original: '/images/projeto1/proj1_img1.png', thumbnail: '/images/projeto1/proj1_img1.png', description: 'Versão Mobile' },
            { original: '/images/projeto1/proj1_img2.png', thumbnail: '/images/projeto1/proj1_img2.png', description: 'Versão Desktop' },
        ],
        demoUrl: 'https://resolutejax.github.io/flowtask-app/',
        repoUrl: 'https://github.com/ResoluteJax/flowtask-app'
    },
    {
        id: 3,
        title: 'Leitor Excel (Python)',
        description: 'Aplicação web para carregar arquivos Excel, processar dados com Pandas e exibir resultados tratados na interface.',
        technologies: ["Python", "Pandas", "Flask", "HTML"],
        images: [
            { original: '/images/projeto2/proj2_img1.png', thumbnail: '/images/projeto2/proj2_img1.png', description: 'Upload de Arquivo' },
            { original: '/images/projeto2/proj2_img2.jpg', thumbnail: '/images/projeto2/proj2_img2.jpg', description: 'Dados Tratados' }, // Atenção à extensão .jpg aqui
        ],
        demoUrl: null,
        repoUrl: 'https://github.com/ResoluteJax/Leitor-de-Planilha'
    },
    {
        id: 4,
        title: 'Sistema OS (Java)',
        description: 'Software desktop para controle de ordens de serviço, com gestão de clientes, CRUD completo e autenticação segura.',
        technologies: ["Java Swing", "MySQL", "JDBC"],
        images: [
            { original: '/images/projeto3/proj3_img1.png', thumbnail: '/images/projeto3/proj3_img1.png', description: 'CRUD de OS' },
            { original: '/images/projeto3/proj3_img4.png', thumbnail: '/images/projeto3/proj3_img4.png', description: 'Tela de Login' },
        ],
        demoUrl: null,
        repoUrl: 'https://github.com/ResoluteJax/Gerenciamento-de-OS-com-JAVA'
    }
];

export default projectsData;