import styled from 'styled-components'

const Card = styled.article`
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
  background: #fffdf9;
  border: 1px solid #ddd2c4;
  box-shadow: 0 4px 12px rgba(30, 20, 15, 0.06);
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 28px rgba(30, 20, 15, 0.12);
  }
`

const Cover = styled.button`
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  padding: 0;
  overflow: hidden;
  border: 0;
  background: #eee4d5;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.35s ease;
  }

  &:hover img {
    transform: scale(1.04);
  }

  &:focus-visible {
    outline: 3px solid #b9a174;
    outline-offset: -3px;
  }
`

const Body = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  padding: 18px;
`

const Category = styled.p`
  margin: 0 0 8px;
  color: #806b50;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`

const ProductTitle = styled.button`
  padding: 0;
  margin: 0 0 8px;
  border: 0;
  background: transparent;
  color: #362142;
  font-family: 'Cormorant Garamond', serif;
  font-size: 23px;
  font-weight: 600;
  line-height: 1.05;
  text-align: left;
  cursor: pointer;

  &:hover {
    color: #6a4b7a;
  }

  &:focus-visible {
    outline: 2px solid #b9a174;
    outline-offset: 3px;
  }
`

const Description = styled.p`
  margin: 0 0 16px;
  color: #665e62;
  font-size: 11px;
  line-height: 1.65;
`

const Price = styled.strong`
  margin-top: auto;
  margin-bottom: 14px;
  color: #21162a;
  font-size: 16px;
  font-weight: 600;
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
`

const AddButton = styled.button`
  flex: 1;
  min-height: 40px;
  padding: 10px 12px;
  border: 1px solid ${({ $adicionado }) => ($adicionado ? '#198754' : '#6c757d')};
  border-radius: 2px;
  background-color: ${({ $adicionado }) => ($adicionado ? '#198754' : '#6c757d')};
  color: #fff;
  font: inherit;
  font-size: 10px;
  font-weight: 600;
  line-height: 1.4;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &:hover {
    filter: brightness(0.92);
  }

  &:focus-visible {
    outline: 3px solid #b9a174;
    outline-offset: 3px;
  }
`

const DeleteButton = styled.button`
  min-height: 40px;
  padding: 10px 12px;
  border: 1px solid #9b5148;
  border-radius: 2px;
  background: transparent;
  color: #9b5148;
  font: inherit;
  font-size: 10px;
  cursor: pointer;

  &:hover {
    background: #f8eeeb;
  }
`

function ProductCard({ product, onDelete, onAddToCart, onOpen, adicionado = false }) {
  return (
    <Card>
      <Cover
        type="button"
        onClick={() => onOpen(product)}
        aria-label={`Ver detalhes de ${product.name}`}
      >
        <img src={product.image} alt={product.name} />
      </Cover>

      <Body>
        <Category>{product.category}</Category>
        <ProductTitle type="button" onClick={() => onOpen(product)}>
          {product.name}
        </ProductTitle>
        <Description>{product.description}</Description>
        <Price>R$ {product.price.toFixed(2).replace('.', ',')}</Price>

        <Actions>
          <AddButton
            type="button"
            $adicionado={adicionado}
            aria-pressed={adicionado}
            onClick={() => onAddToCart(product)}
          >
            {adicionado ? 'Adicionado ao carrinho ✓' : 'Adicionar ao carrinho'}
          </AddButton>

          {product.userAdded && (
            <DeleteButton type="button" onClick={() => onDelete(product.id)}>
              Excluir
            </DeleteButton>
          )}
        </Actions>
      </Body>
    </Card>
  )
}

export default ProductCard
