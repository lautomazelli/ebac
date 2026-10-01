import { useEffect, useMemo, useState } from 'react'
import { initialProducts, categories } from './data'
import ProductCard from './components/ProductCard'
import ProductForm from './components/ProductForm'
import Header from './components/Header'
import Footer from './components/Footer'
import { productImageMap } from './assets'
import interiorImage from './assets/imagens-ambiente/interno-livraria-1.png'
import interiorImage2 from './assets/imagens-ambiente/interno-livraria-2.png'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [notice, setNotice] = useState('')
  const [currentInterior, setCurrentInterior] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(initialProducts)
      setLoading(false)
    }, 900)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentInterior((current) => (current === 0 ? 1 : 0))
    }, 4000)

    return () => clearInterval(timer)
  }, [])

  const featuredProduct = useMemo(
    () => products.find((product) => product.id === 3) ?? products[2],
    [products],
  )

  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: Date.now(),
      category: 'Novos títulos',
      image: productImageMap['default'],
      details: `${productData.description} Este título foi cadastrado pelo usuário e já está disponível no catálogo da Arcana Livraria.`,
      userAdded: true,
    }

    setProducts((current) => [...current, newProduct])
    setNotice('Livro adicionado ao catálogo com sucesso.')
    window.setTimeout(() => setNotice(''), 2500)
  }

  const deleteProduct = (id) => {
    setProducts((current) => current.filter((product) => product.id !== id))
    setCart((current) => current.filter((product) => product.id !== id))
    setNotice('Livro removido do catálogo.')
    window.setTimeout(() => setNotice(''), 2500)
  }

  const addToCart = (product) => {
    setCart((current) => [...current, product])
    setNotice(`${product.name} foi adicionado ao carrinho.`)
    window.setTimeout(() => setNotice(''), 2500)
  }

  return (
    <div className="app">
      <Header cartCount={cart.length} />

      <main>
        <section className="hero" id="inicio">
          <div className="hero__content">
            <p className="eyebrow hero__eyebrow">ARCANA LIVRARIA</p>
            <h1>Livros para quem busca conhecer além do óbvio.</h1>
            <p>
              A Arcana Livraria é um espaço dedicado aos que se conectam com o conhecimento,
              o simbolismo e o autoconhecimento.
            </p>
            <a className="button button--primary" href="#catalogo">
              Explorar catálogo <span>→</span>
            </a>
          </div>
        </section>

        <section className="section categories" id="categorias">
          <div className="section-heading">
            <span className="ornament">✦</span>
            <h2>Categorias</h2>
            <p>Explore nossos universos e encontre o que te guia.</p>
          </div>
          <div className="category-grid">
            {categories.map((category) => (
              <a className="category-card" href="#catalogo" key={category.name}>
                <span className="category-card__icon">
                  <img src={category.icon} alt="" />
                </span>
                <h3>{category.name}</h3>
                <span className="category-card__arrow">→</span>
              </a>
            ))}
          </div>
        </section>

        <section className="section catalog" id="catalogo">
          <div className="section-heading">
            <span className="ornament">✦</span>
            <h2>Conheça nossa seleção</h2>
            <p>Livros que inspiram, ensinam e transformam.</p>
          </div>

          {loading ? (
            <div className="loading" role="status">Carregando livros...</div>
          ) : (
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onDelete={deleteProduct}
                  onAddToCart={addToCart}
                  onOpen={(item) => setSelectedProduct(item)}
                />
              ))}
            </div>
          )}
        </section>

        {!loading && featuredProduct && (
          <section className="featured" id="destaque">
            <div className="featured__image-wrap">
              <img src={featuredProduct.image} alt={featuredProduct.name} />
            </div>
            <div className="featured__content">
              <p className="eyebrow">DESTAQUE</p>
              <h2>{featuredProduct.name}</h2>
              <p>{featuredProduct.description}</p>
              <button
                className="button button--primary"
                type="button"
                onClick={() => setSelectedProduct(featuredProduct)}
              >
                Saiba mais <span>→</span>
              </button>
            </div>
            <div className="featured__moon" aria-hidden="true">◐</div>
          </section>
        )}

        <section className="about section" id="sobre">
          <div className="about__image">
            <img
              src={currentInterior === 0 ? interiorImage : interiorImage2}
              alt="Interior aconchegante da Arcana Livraria"
            />
          </div>
          <div className="about__content">
            <p className="eyebrow">SOBRE A ARCANA LIVRARIA</p>
            <h2>Mais que livros, uma jornada interior.</h2>
            <p>
              A Arcana Livraria nasceu da paixão por livros, simbolismo e pela busca constante de
              conhecimento. Aqui, reunimos obras que inspiram, ensinam e conectam você com as
              múltiplas dimensões da vida, do autoconhecimento à espiritualidade, da astrologia à
              magia natural.
            </p>
            <span className="about__star">✦</span>
          </div>
        </section>

        <ProductForm onAddProduct={addProduct} />
      </main>

      <Footer />

      {selectedProduct && (
        <div className="modal-backdrop" role="presentation" onClick={() => setSelectedProduct(null)}>
          <article className="product-detail" role="dialog" aria-modal="true" aria-labelledby="product-detail-title" onClick={(event) => event.stopPropagation()}>
            <button className="product-detail__close" type="button" onClick={() => setSelectedProduct(null)} aria-label="Fechar detalhes">×</button>
            <img src={selectedProduct.image} alt="" />
            <div className="product-detail__body">
              <p className="eyebrow">{selectedProduct.category}</p>
              <h2 id="product-detail-title">{selectedProduct.name}</h2>
              <p className="product-detail__price">R$ {selectedProduct.price.toFixed(2).replace('.', ',')}</p>
              <p>{selectedProduct.details}</p>
              <button className="button button--primary" type="button" onClick={() => addToCart(selectedProduct)}>
                Adicionar ao carrinho
              </button>
            </div>
          </article>
        </div>
      )}

      {notice && <div className="toast" role="status">{notice}</div>}
    </div>
  )
}

export default App
