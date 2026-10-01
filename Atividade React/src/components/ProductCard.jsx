function ProductCard({ product, onDelete, onAddToCart, onOpen }) {
  return (
    <article className="product-card">
      <button className="product-card__cover" type="button" onClick={() => onOpen(product)} aria-label={`Ver detalhes de ${product.name}`}>
        <img src={product.image} alt={product.name} />
      </button>
      <div className="product-card__body">
        <p className="product-card__category">{product.category}</p>
        <button className="product-card__title" type="button" onClick={() => onOpen(product)}>
          {product.name}
        </button>
        <p className="product-card__description">{product.description}</p>
        <strong className="product-card__price">R$ {product.price.toFixed(2).replace('.', ',')}</strong>
        <div className="product-card__actions">
          <button className="button button--primary button--small" type="button" onClick={() => onAddToCart(product)}>
            Adicionar ao carrinho
          </button>
          {product.userAdded && (
            <button className="button button--delete" type="button" onClick={() => onDelete(product.id)}>
              Excluir
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

export default ProductCard
