import { useState } from 'react'

const initialForm = { name: '', price: '', description: '' }

function ProductForm({ onAddProduct }) {
  const [form, setForm] = useState(initialForm)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.name.trim() || !form.price || !form.description.trim()) return

    onAddProduct({
      name: form.name.trim(),
      price: Number(form.price),
      description: form.description.trim(),
    })
    setForm(initialForm)
  }

  return (
    <section className="register" id="contato">
      <div className="register__ornament" aria-hidden="true">◌</div>
      <div className="register__intro">
        <p className="eyebrow">CADASTRE UM NOVO LIVRO</p>
        <h2>Cadastre um novo livro</h2>
        <p>Adicione um novo título ao nosso catálogo.</p>
      </div>
      <form className="register__form" onSubmit={handleSubmit}>
        <label>
          Nome do livro
          <input name="name" value={form.name} onChange={handleChange} placeholder="Digite o nome do livro" required />
        </label>
        <label>
          Preço
          <input name="price" value={form.price} onChange={handleChange} type="number" min="0.01" step="0.01" placeholder="R$ 59,90" required />
        </label>
        <label>
          Descrição
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Descreva o livro..." rows="3" required />
        </label>
        <button className="button button--primary" type="submit">Adicionar livro</button>
      </form>
    </section>
  )
}

export default ProductForm
