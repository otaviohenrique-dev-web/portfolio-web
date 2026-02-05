# Portfólio Pessoal - Otávio Henrique

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

Este é o repositório do meu portfólio pessoal, desenvolvido como uma Single Page Application (SPA) utilizando React. O objetivo é apresentar minhas habilidades, projetos concluídos e informações de contato para potenciais empregadores e colaboradores, visando uma oportunidade como Desenvolvedor Web Júnior.

**✨ [Veja a versão online aqui!]([https://resolutejax.github.io/portifolio-web/](https://otaviohenrique-dev-web.github.io/portifolio-web/)) ✨**

## 🚀 Tecnologias Utilizadas

* **React:** Biblioteca principal para construção da interface.
* **CSS:** Estilização feita com módulos CSS externos para cada componente.
* **Framer Motion:** Para animações de entrada e interações suaves.
* **React Router DOM:** Utilizado para a estrutura base e manipulação de rotas/histórico (embora a navegação principal seja por scroll).
* **React Icons:** Para inclusão de ícones SVG populares.
* **EmailJS:** Para funcionalidade do formulário de contato sem necessidade de backend.
* **React Image Gallery:** Para exibição das imagens na seção de projetos.

## 🌟 Funcionalidades Principais

* **Single Page Application (SPA):** Navegação fluida em uma única página.
* **Navegação Suave:** Links no header rolam suavemente para as seções correspondentes.
* **Header Fixo e Responsivo:** Menu principal sempre acessível, com menu hambúrguer para telas menores (<= 600px).
* **Seção Sobre Mim:** Apresentação pessoal com imagem "sticky" e seção de habilidades com ícones.
* **Galeria de Projetos:** Exibição interativa de projetos com múltiplas imagens (`react-image-gallery`).
* **Formulário de Contato Funcional:** Envio de mensagens diretamente para o email do proprietário via EmailJS com feedback visual.
* **Design Responsivo:** Adaptado para visualização em dispositivos móveis (breakpoint principal em 600px).
* **Animações:** Efeitos sutis de entrada e hover com Framer Motion.
* **Download de Currículo:** Botão para baixar o CV em PDF diretamente da seção "Sobre Mim".

## 🔧 Como Executar Localmente

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/otaviohenrique-dev-web/portifolio-web.git]
    ```
2.  **Navegue até a pasta do projeto:**
    ```bash
    cd portifolio-web
    ```
3.  **Instale as dependências:**
    ```bash
    npm install
    ```
    *ou*
    ```bash
    yarn install
    ```
4.  **Configure as Variáveis de Ambiente (EmailJS):**
    * Crie um arquivo `.env` na raiz do projeto.
    * Adicione suas credenciais do EmailJS (obtidas em [emailjs.com](https://www.emailjs.com/)):
        ```
        REACT_APP_EMAILJS_SERVICE_ID=SEU_SERVICE_ID
        REACT_APP_EMAILJS_TEMPLATE_ID=SEU_TEMPLATE_ID
        REACT_APP_EMAILJS_USER_ID=SEU_USER_ID
        ```
    * **Importante:** Adicione `.env` ao seu `.gitignore` se ainda não o fez.
5.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm start
    ```
    *ou*
    ```bash
    yarn start
    ```
6.  Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📄 Deploy

Este projeto está configurado para deploy manual no GitHub Pages a partir da pasta `/docs` no branch `master`. O processo envolve:

1.  Ajustar a chave `"homepage"` no `package.json`.
2.  Configurar o script `build` no `package.json` para usar `BUILD_PATH=./docs`.
3.  Rodar `npm run build`.
4.  Fazer commit e push da pasta `/docs` atualizada para o branch principal.
5.  Configurar o GitHub Pages para servir a partir de `/docs` no branch principal.

## 🙏 Agradecimentos

* Agradecimento especial à assistência da IA Gemini durante o desenvolvimento deste projeto, ajudando na solução de problemas e implementação de funcionalidades.

## 📫 Contato

* **LinkedIn:** [Otávio Henrique](https://www.linkedin.com/in/otaviohenrique-dev)
* **Email:** tecproduz@gmail.com
* **GitHub:** [@otaviohenrique-dev-web](https://github.com/otaviohenrique-dev-web)
