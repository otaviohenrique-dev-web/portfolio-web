// src/components/About/About.js
import React from 'react';
import '../../assets/css/About.css';
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs, FaGitAlt, FaDownload, FaPython } from 'react-icons/fa';
import { BsStars } from "react-icons/bs"; 
import { motion } from 'framer-motion';

const About = React.forwardRef((props, ref) => {

  const cvFileName = "files/CV_Otavio_HenriqueV2.pdf"; 

  // Referencing image from public/images folder
  const profileAboutPic = `${process.env.PUBLIC_URL}/images/profile.jpeg`;

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
              Minha Jornada como Desenvolvedor <span className="highlight-dot">.</span>
            </h2>

            <div className="text-content">
              <p className="lead-text">
                Olá! Sou <strong>Otávio Henrique</strong>, um Desenvolvedor Full Stack apaixonado por criar soluções que impactam positivamente a vida das pessoas. Minha jornada no mundo da programação começou com o desejo de transformar ideias em realidade, e hoje tenho o prazer de combinar a robustez do <strong>Back-end (Java/Node)</strong> com a elegância e interatividade do <strong>Front-end (React)</strong>.
              </p>

              <p>
                Acredito que a tecnologia é uma ferramenta poderosa para resolver problemas complexos. Por isso, meu foco é sempre em entender a necessidade do usuário para então construir aplicações com código limpo, performático e escalável. Tenho experiência sólida na construção de <strong>SPAs (Single Page Applications)</strong>, na integração com <strong>APIs REST</strong> e na automação de tarefas com <strong>Python</strong>.
              </p>

              <p>
                Estou sempre em busca de novos desafios e de oportunidades para aprender e crescer. Atualmente, meu objetivo é colaborar com equipes dinâmicas e inovadoras, onde eu possa aplicar minhas habilidades em <strong>React.js</strong> e no <strong>ecossistema Java</strong> para criar produtos de alto valor.
              </p>
            </div>

            {/* Área de Download do CV */}
            <div className="cv-area">
              <a
                href={`${process.env.PUBLIC_URL}/${cvFileName}`}
                download="CV_Otavio_HenriqueV2.pdf"
                className="btn-premium"
              >
                <FaDownload /> Download CV
              </a>
            </div>

            {/* Stack Tecnológica */}
            <div className="skills-section">
              <h3>Minhas Ferramentas Favoritas</h3>
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