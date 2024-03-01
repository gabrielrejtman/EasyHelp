import React from 'react'
import './styles.css'
import { useEffect, useState } from 'react'
import { Page, Path, Title } from '../../../components/GlobalComponents.style'
import {IoMdSearch, IoIosAlert} from 'react-icons/io'
import { FaPencil,  FaTrash } from "react-icons/fa6";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import styled from 'styled-components';
import axios from "axios"
import { useNavigate } from "react-router-dom";

const Button = styled.button`
  outline: none;
  margin-left: 20px;
  background-color: rgba(0, 0, 0, 0);
  border: solid rgba(0, 0, 0, 0);
  cursor: pointer;
`

function ProblemsSolucions() {

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
      const resp = await axios.get("http://localhost:3300/cadastrar_problema")
      listaDeProblemas = resp.data
      setProblems(listaDeProblemas)
    }
    catch(error){
      console.log(JSON.stringify(error))
    }
  }

  const limit_itens = 10
  const total_itens = problems.length
  const [offset, setOffset] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  let navigate = useNavigate();

  const handleAddProblem = () => {
    navigate('/register_problem');
  }

  return (
    <Page>
        <Path>Home</Path>
        <Title>Problemas e soluções</Title>

        <div className='head-container'>

          <div className="containerInput">
            <button className="buttonSearch">
            <IoMdSearch  size={24} color="#000"/>
            </button>

            <input type="text" placeholder="Digite o problema" 
            maxLength={200} />

          </div>
          
          <div className='btn-pages'>
            <BiSolidLeftArrow size={30}/>
            <p className='pages-index'>1-10 de {total_itens}</p>
            <BiSolidRightArrow size={30}/>
          </div>

        </div>

        <div className="listaDeProblemas">

            <ul>
            {problems.map((item) => (
                <div className="card">
                    <div className='card-content'>
                        <div className="cardHead">
                          <p className="cardTitulo">{item.titulo}</p>   
                          <div className="etiquetas">
                              <div className="categoria">{item.categoria}</div>
                              <div className="dificuldade">{item.dificuldade}</div>
                          </div>               
                        </div>

                        <p className="cardDescricao">{item.descricao}</p>
                    </div>

                    <div className='btn-bar'>

                        <Button><FaPencil size={24}/></Button>
                        <Button><FaTrash size={24}/></Button>

                    </div>
                  </div>
                ))}
              </ul>
            
        </div>

        <button className="btn-add-problem" onClick={() => handleAddProblem()}>Adicionar Problema</button>
    </Page>
  )
}

export default ProblemsSolucions