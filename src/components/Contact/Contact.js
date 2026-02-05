// src/components/Contact/Contact.js
import React, { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import { motion } from 'framer-motion'; // Importando animações
import { FaPaperPlane, FaEnvelope, FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa'; // Ícones novos
import '../../assets/css/Contact.css';

const Contact = React.forwardRef((props, ref) => {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState({ type: '', text: '' });

  // Variantes de Animação (Mesmo padrão do About)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const sendEmail = (event) => {
    event.preventDefault();

    if (!form.current.user_name.value || !form.current.user_email.value || !form.current.message.value) {
        setFeedbackMessage({ type: 'error', text: 'Por favor, preencha todos os campos.' });
        return;
    }

    setIsSending(true);
    setFeedbackMessage({ type: '', text: '' });

    const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const userID = process.env.REACT_APP_EMAILJS_USER_ID;

    emailjs.sendForm(serviceID, templateID, form.current, userID)
      .then(() => {
          setFeedbackMessage({ type: 'success', text: 'Mensagem enviada! Entrarei em contato em breve.' });
          setIsSending(false);
          form.current.reset();
      }, (error) => {
          console.error('Falha:', error.text);
          setFeedbackMessage({ type: 'error', text: 'Erro ao enviar. Tente pelo LinkedIn ou WhatsApp.' });
          setIsSending(false);
      });
  };

  return (
    <motion.section 
      ref={ref} 
      id="contact" 
      className="contact-section"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="contact-wrapper">
        
        {/* COLUNA 1: Informações e Chamada */}
        <motion.div className="contact-info" variants={itemVariants}>
          <h2 className="section-title">Vamos Conversar<span className="highlight-dot">.</span></h2>
          <p className="contact-desc">
            Estou sempre aberto a novas oportunidades, parcerias ou apenas para trocar uma ideia sobre tecnologia. 
            Sinta-se à vontade para me chamar!
          </p>

          <div className="contact-cards">
            {/* Card Email */}
            <a href="mailto:otavio-henrique10@hotmail.com" className="info-card">
              <div className="icon-box"><FaEnvelope /></div>
              <div>
                <h4>Email</h4>
                <p>otavio-henrique10@hotmail.com</p>
              </div>
            </a>

            {/* Card GitHub */}
            <a href="https://github.com/otaviohenrique-dev-web" target="_blank" rel="noreferrer" className="info-card">
              <div className="icon-box"><FaGithub /></div>
              <div>
                <h4>GitHub</h4>
                <p>@otaviohenrique-dev-web</p>
              </div>
            </a>

            {/* Card LinkedIn */}
            <a href="https://www.linkedin.com/in/otaviohenrique-dev/" target="_blank" rel="noreferrer" className="info-card">
              <div className="icon-box"><FaLinkedin /></div>
              <div>
                <h4>LinkedIn</h4>
                <p>@otaviohenrique-dev</p>
              </div>
            </a>

             {/* Card Instagram */}
             <a href="https://www.instagram.com/otavioh.dev" target="_blank" rel="noreferrer" className="info-card">
              <div className="icon-box"><FaInstagram /></div>
              <div>
                <h4>Instagram</h4>
                <p>@otavioh.dev</p>
              </div>
            </a>

             {/* Card WhatsApp (Opcional) */}
             <a href="https://wa.me/5521990679262" target="_blank" rel="noreferrer" className="info-card">
              <div className="icon-box"><FaWhatsapp /></div>
              <div>
                <h4>WhatsApp</h4>
                <p>(21) 99067-9262</p>
              </div>
            </a>
          </div>
        </motion.div>

        {/* COLUNA 2: Formulário Glass */}
        <motion.div className="form-container glass-effect" variants={itemVariants}>
          <form ref={form} onSubmit={sendEmail}>
            <div className="input-group">
              <input type="text" name="user_name" required placeholder=" " />
              <label>Seu Nome</label>
            </div>

            <div className="input-group">
              <input type="email" name="user_email" required placeholder=" " />
              <label>Seu E-mail</label>
            </div>

            <div className="input-group">
              <textarea name="message" rows="5" required placeholder=" "></textarea>
              <label>Sua Mensagem</label>
            </div>

            <button type="submit" className="submit-btn" disabled={isSending}>
              {isSending ? 'Enviando...' : (
                <>Enviar Mensagem <FaPaperPlane /></>
              )}
            </button>

            {feedbackMessage.text && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`feedback-msg ${feedbackMessage.type}`}
              >
                {feedbackMessage.text}
              </motion.div>
            )}
          </form>
        </motion.div>

      </div>
    </motion.section>
  );
});

export default Contact;