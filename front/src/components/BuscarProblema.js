import "../index.css";
import React from 'react'
import {IoMdSearch, IoIosAlert} from 'react-icons/io'
import Cards from "./Cards";

function BuscarProblema() {
  
  const listaDeProblemas = [{titulo: "A máquina não liga", categoria: "elétrico", dificuldade: "fácil",
  descricao: "A máquina de nome tal de série tal apresenta tais características relacionadas ao seu funcionamento, porque o fornecedor dela vem de tal... "},
  {titulo: "A máquina não liga2", categoria: "elétrico", dificuldade: "fácil",
  descricao: "A máquina de nome tal de série tal apresenta tais características relacionadas ao seu funcionamento, porque o fornecedor dela vem de tal... "}]
  
  return(

    <div className="ContainerBuscarProblema">

      <p className="path">Home</p>
      <p className="titulo">Buscar Problemas</p>
      
      <div className="containerInput">

        <button className="buttonSearch">
          <IoMdSearch  size={24} color="#000"/>
        </button>
        
        <input type="text" placeholder="Digite o problema" 
        maxLength="200"/>
      
      </div>

      <div className="filters">
        <button className="filter active">Mecânico</button>
        <button className="filter">Eletrônico</button>
        <button className="filter">Elétrico</button>
        <button className="filter">Sistema</button>
        <button className="filter">Outros</button>

      </div>

      <p className="cardTitulo" id="problemasPesquisados">Problemas pesquisados</p>      

      <div className="listaDeProblemas">

        <ul>
          <Cards itens = {listaDeProblemas}/>
        </ul>
        
      </div>

      <button className="btnProblemaNaoEncontrado"><IoIosAlert size={24} color="#FFF"/>Problema não encontrado</button>

    </div>
  )
}

export default BuscarProblema