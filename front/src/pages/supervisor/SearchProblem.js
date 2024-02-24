import "../../index.css";
import React, { useEffect, useState } from 'react'
import {IoMdSearch, IoIosAlert} from 'react-icons/io'
import Cards from "../../components/Cards";
import axios from "axios"
import {Title, Page} from "../../components/GlobalComponents.style"

function SearchProblem() {

  let listaDeProblemas = []

  const [problems, setProblems] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await loadProblems();
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

    <Page>

      <p className="path">Home</p>
      <Title>Buscar Problemas</Title>
      
      <div className="containerInput">

        <button className="buttonSearch">
          <IoMdSearch  size={24} color="#000"/>
        </button>
        
        <input type="text" placeholder="Digite o problema" 
        maxLength="200" onChange={(e)=>setSearch(e.target.value)}/>
      
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

    </Page>
  )
}

export default SearchProblem