// src/components/About/About.js
import React from 'react';
import '../../assets/css/About.css';
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs, FaGitAlt, FaDownload, FaPython } from 'react-icons/fa';
import { BsStars } from "react-icons/bs"; 
import { motion } from 'framer-motion';

const About = React.forwardRef((props, ref) => {

  const cvFileName = "files/CV_Otavio_Henrique.pdf"; 

  // Referencing image from public/images folder
  const profileAboutPic = `${process.env.PUBLIC_URL}/images/profile_pic.jpg`;

  // Variantes de Animação
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 } // Efeito cascata mais rápido
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.section
      ref={ref}
      id="about"
      className="about-section"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="about-wrapper">
        
        {/* Lado Esquerdo: Foto com Anel Gradiente */}
        <motion.div className="profile-container" variants={itemVariants}>
           <div className="profile-gradient-ring">
             <img src={profileAboutPic} alt="Otávio Henrique" className="about-profile-pic"/>
           </div>
        </motion.div>

        {/* Lado Direito: Card de Vidro com Texto */}
        <motion.div className="glass-container" variants={itemVariants}>
           
            <h2 className="section-title">
              Sobre Mim <span className="highlight-dot">.</span>
            </h2>

            <div className="text-content">
              <p className="lead-text">
                Olá! Sou <strong>Otávio Henrique</strong>, um Desenvolvedor Full Stack focado em resolver problemas reais. Combino a lógica do <strong>Back-end (Java/Node)</strong> com a interatividade do <strong>Front-end (React)</strong> para criar aplicações web completas.
              </p>

              <p>
                Minha abordagem é prática: gosto de entender a dor do usuário e traduzir isso em código limpo e performático. Tenho experiência construindo <strong>SPAs</strong>, consumindo <strong>APIs REST</strong> e automatizando processos com <strong>Python</strong>.
              </p>

              <p>
                Atualmente, busco integrar times ágeis onde eu possa aplicar meu conhecimento em <strong>React.js</strong> e <strong>Ecossistema Java</strong>, contribuindo desde o primeiro dia com entregas de valor.
              </p>
            </div>

            {/* Área de Download do CV */}
            <div className="cv-area">
              <a
                href={`${process.env.PUBLIC_URL}/${cvFileName}`}
                download="CV_Otavio_Henrique.pdf"
                className="btn-premium"
              >
                <FaDownload /> Download CV
              </a>
            </div>

            {/* Stack Tecnológica */}
            <div className="skills-section">
              <h3>Tech Stack Principal</h3>
              <div className="skills-grid">
                {[
                  { icon: <FaReact />, name: "React", color: "#61DAFB" },
                  { icon: <FaNodeJs />, name: "Node.js", color: "#339933" },
                  { icon: <FaJsSquare />, name: "JavaScript", color: "#F7DF1E" },
                  { icon: <FaPython />, name: "Python", color: "#3776AB" },
                  { icon: <FaGitAlt />, name: "Git", color: "#F05032" },
                  { icon: <BsStars />, name: "AI Tools", color: "#FFD700" },
                  { icon: <FaHtml5 />, name: "HTML5", color: "#E34F26" },
                  { icon: <FaCss3Alt />, name: "CSS3", color: "#1572B6" },
                ].map((skill, index) => (
                  <motion.div 
                    className="skill-chip" 
                    key={index} 
                    whileHover={{ y: -5, borderColor: skill.color, boxShadow: `0 4px 15px ${skill.color}40` }}
                  >
                    <span style={{ color: skill.color }} className="skill-icon">{skill.icon}</span>
                    <span className="skill-name">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>

        </motion.div> 
      </div> 
    </motion.section>
  );
});

export default About;