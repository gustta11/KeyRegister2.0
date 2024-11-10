import './Rodape.css';
import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'; // Usando Font Awesome

const Rodape = () => {
  return (
    <footer className="footer">
      <p>
        Desenvolvido por <strong>Brilliant Minds</strong></p>
      <div className="icons">
        <a href="https://github.com"  title="GitHub">
          <FaGithub />
        </a>
        <a href="https://www.linkedin.com"  title="LinkedIn">
          <FaLinkedin />
        </a>
        <a href="https://twitter.com" title="Twitter">
          <FaTwitter />
        </a>
      </div>
    </footer>
  );
};

export default Rodape;
