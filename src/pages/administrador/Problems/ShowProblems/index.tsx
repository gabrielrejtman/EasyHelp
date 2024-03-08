import React, { useEffect, useState } from 'react'
import { Page, Path, Title } from '../../../../components/GlobalComponents.style'
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import add from '../../../../assets/icons/Add.svg'
import searchIcon from '../../../../assets/icons/Search.svg'
import './styles.css'
import Problem from '../../../../domain/entities/Problem'
import { ShowProblems} from '../../../../services/useCases/Problems/ShowProblems'
import { ProblemCard } from '../../../../components/Cards/ProblemCard'


const ProblemsPagination: React.FC<{ totalItems: number }> = ({ totalItems }) => (
    <div className="btn-pages">
        <BiSolidLeftArrow size={14} />
        <p className="pages-index">1-10 de {totalItems}</p>
        <BiSolidRightArrow size={14} />
    </div>
);


export const Problems = () => {

    //States
    //const [search, setSearch] = useState<string>('');
    const [problems, setProblems] = useState<Problem[]>([]);

    //Global constants
    const showProblems = new ShowProblems()
    const totalItems = problems.length;
    const navigate = useNavigate();

   useEffect(() => {
       loadProblems()
   }, []);

   async function loadProblems(){
    try {
        const response = await showProblems.execute();
        setProblems(response);
      } catch (error) {
        console.error("Falha ao carregar problemas:", error);
      }
   }

    const handleAddProblem = () => {
        navigate('/problems-register');
    };

    return (
        <Page>
            <div>
                <Path>Home</Path>
                <Title>Problemas e soluções</Title>

                {/*Add Problem, Search Bar*/}
                <div className="head-container">
                    {/*Add Problem*/}
                    <div>
                        <button className="btn-add-problem" onClick={handleAddProblem}>
                            <div className='itens-btn-add'>
                                <img src={add}/>
                                <p className='btn-text'>Novo Cadastro</p>
                            </div>
                        </button>
                    </div>
                    {/*Search Bar*/}
                    <div className="containerInput">

                        <button className="buttonSearch">
                            <img src={searchIcon}/>
                        </button>
                        <input type="text" placeholder="Buscar por Problemas" maxLength={200} />
                    </div>

                </div>
                <div className="subhead-container">
                    <div className='filter-container'>
                        <h4 className='filters-text'>Filtros</h4>
                        <select className='select-filter'>
                            <option value="categoria">Categoria</option>
                            <option value="dificuldade"></option>
                        </select>
                    </div>
                        <ProblemsPagination totalItems={totalItems} />
                </div>

                <div className="problemsList">
                    <ul>{problems.map((problem) =>(
                        <ProblemCard item={problem}/>
                    ))}</ul>
                </div>

            </div>
        </Page>
    );
};
