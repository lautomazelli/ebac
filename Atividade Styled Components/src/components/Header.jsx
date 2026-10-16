import logo from '../assets/icons/logo-principal-livraria.png'
import searchIcon from '../assets/icons/lupa.png'
import cartIcon from '../assets/icons/carrinho-mercado.png'

function Header({ cartCount }) {
  return (
    <header className="header">
      <a className="header__brand" href="#inicio" aria-label="Arcana Livraria — início">
        <img src={logo} alt="" />
        <div className="header__brand-text">
          <span>ARCANA</span>
          <small>LIVRARIA</small>
        </div>
      </a>
      <nav className="header__nav" aria-label="Navegação principal">
        <a href="#inicio">Início</a>
        <a href="#catalogo">Catálogo</a>
        <a href="#categorias">Categorias</a>
        <a href="#sobre">Sobre nós</a>
        <a href="#contato">Contato</a>
      </nav>
      <div className="header__actions">
        <button type="button" className="icon-button" aria-label="Pesquisar">
          <img src={searchIcon} alt="" />
        </button>
        <button type="button" className="icon-button cart-button" aria-label={`Carrinho com ${cartCount} item(ns)`}>
          <img src={cartIcon} alt="" />
          {cartCount > 0 && <span>{cartCount}</span>}
        </button>
      </div>
    </header>
  )
}

export default Header
