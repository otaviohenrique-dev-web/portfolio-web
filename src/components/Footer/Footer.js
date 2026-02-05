import React from 'react';
import '../../assets/css/Footer.css'; 
import { FaGithub, FaLinkedin, FaInstagram, FaCode } from 'react-icons/fa'; // Adicionei FaCode para o ícone do código

const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    // URLs centralizadas para facilitar manutenção
    const repoUrl = "https://github.com/otaviohenrique-dev-web/portifolio-web";
    const linkedinUrl = "https://www.linkedin.com/in/otaviohenrique-dev/";
    const githubProfileUrl = "https://github.com/otaviohenrique-dev-web";
    const instagramUrl = "https://www.instagram.com/otavioh.dev";

    return (
        <footer className='main-footer'>
            <div className="footer-content">
                
                {/* 1. Área de Copyright e Nome */}
                <div className="footer-info">
                    <p>
                        &copy; {currentYear} <strong>Otávio Henrique</strong>.
                    </p>
                    <span className="footer-separator">|</span>
                    <p>Desenvolvido com React.js</p>
                </div>

                {/* 2. Ícones Sociais (Acesso rápido) */}
                <div className="footer-social-icons">
                    <a 
                        href={linkedinUrl} 
                        target='_blank' 
                        rel='noopener noreferrer'
                        aria-label="LinkedIn"
                    >
                        <FaLinkedin />
                    </a>
                    <a 
                        href={githubProfileUrl} 
                        target='_blank' 
                        rel='noopener noreferrer'
                        aria-label="Perfil GitHub"
                    >
                        <FaGithub />
                    </a>
                    <a 
                        href={instagramUrl} 
                        target='_blank' 
                        rel='noopener noreferrer'
                        aria-label="Instagram"
                    >
                        <FaInstagram />
                    </a>
                </div>

                {/* 3. Link para o Código Fonte (Diferenciado) */}
                <div className='footer-repo-link'>
                    <a 
                        href={repoUrl}
                        target='_blank' 
                        rel='noopener noreferrer' 
                        className='source-code-btn'
                    >
                        <FaCode className='footer-icon' />
                        <span>Ver código-fonte</span>
                    </a>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
