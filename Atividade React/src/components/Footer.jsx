import logo from '../assets/icons/logo-principal-livraria.png'
import crow from '../assets/icons/logo-corvo.png'
import github from '../assets/icons/github.png'
import instagram from '../assets/icons/instagram.png'
import linkedin from '../assets/icons/linkedin.png'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <div className="footer__brand-logo">
            <img className="footer__logo" src={logo} alt="" />
            <div className="footer__brand-text">
              <span>ARCANA</span>
              <small>LIVRARIA</small>
            </div>
          </div>

          <p>Livros que conectam você ao que há de mais profundo.</p>
        </div>
        <div className="footer__links">
          <h3>Links</h3>
          <a href="#inicio">Início</a>
          <a href="#catalogo">Catálogo</a>
          <a href="#categorias">Categorias</a>
          <a href="#sobre">Sobre nós</a>
          <a href="#contato">Contato</a>
        </div>
        <div className="footer__social">
          <h3>Redes sociais</h3>
          <div className="social-list">
            <a href="https://github.com/lautomazelli" target="_blank" rel="noreferrer" aria-label="GitHub">
              <img src={github} alt="" />
            </a>
            <a href="https://www.instagram.com/laura.tomazelli/" target="_blank" rel="noreferrer" aria-label="Instagram">
              <img src={instagram} alt="" />
            </a>
            <a href="https://www.linkedin.com/in/lauratomazellidecastro/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <img src={linkedin} alt="" />
            </a>
          </div>
        </div>
        <div className="footer__crow">
          <img src={crow} alt="" />
        </div>
      </div>
      <div className="footer__bottom">Desenvolvido por Laura Tomazelli de Castro.</div>
    </footer>
  )
}

export default Footer
