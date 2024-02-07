import "../index.css";
import React, { useEffect, useState } from 'react'
import {IoMdSearch, IoIosAlert} from 'react-icons/io'
import Cards from "./Cards";
import axios from "axios"

function BuscarProblema() {

  let listaDeProblemas = []

  const [problems, setProblems] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await loadProblems();
      // ...
    }
    fetchData();
  }, [])

  async function loadProblems(){
    
    try{
      const resp = await axios.get("http://localhost:3300/menu")
      listaDeProblemas = resp.data
      setProblems(listaDeProblemas)
    }
    catch(error){
      console.log(JSON.stringify(error))
    }
  }
  


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
          <Cards itens = {problems}/>
        </ul>
        
      </div>

      <button className="btnProblemaNaoEncontrado"><IoIosAlert size={24} color="#FFF"/>Problema não encontrado</button>

    </div>
  )
}

export default BuscarProblema