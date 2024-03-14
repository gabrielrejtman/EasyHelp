function Cards({itens}) {
  return (
    <>
        {
        itens.map((item) => (
            <div className="card">

                <div className="cardHead">
                <p className="cardTitulo">{item.titulo}</p>

                <div className="etiquetas">
                    <div className="categoria">{item.categoria}</div>
                    <div className="dificuldade">{item.dificuldade}</div>
                </div>

                </div>

                <p className="cardDescricao">{item.descricao}
                </p>

            </div>
        ))
        }
    </>
  )
}

export default Cards