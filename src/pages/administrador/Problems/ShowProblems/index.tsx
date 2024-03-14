import React, { useEffect, useState } from 'react'
import { Page, Path, Title } from '../../../../components/GlobalComponents.style'
import { useNavigate } from 'react-router-dom'
import add from '../../../../assets/icons/Add.svg'
import searchIcon from '../../../../assets/icons/Search.svg'
import './styles.css'
import Problem from '../../../../domain/entities/Problem'
import { ShowProblems} from '../../../../services/useCases/Problems/ShowProblems'
import { ProblemCard } from '../../../../components/Cards/ProblemCard'
import {ProblemsPagination} from "../../../../components/Cards/ProblemsPagination.tsx";


export const Problems = () => {
    //States
    //const [search, setSearch] = useState<string>('');
    const [problems, setProblems] = useState<Problem[]>([]);

    const [filteredProblems, setFilteredProblems] = useState<Problem[]>(problems);
    const [currentPageProblems, setCurrentPageProblems] = useState<Problem[]>([]);

    //Global constants
    const showProblems = new ShowProblems()
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const handleAddProblem = () => {
        navigate('/adm/problems-register');
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        if (selectedValue === 'categoria') {
            setFilteredProblems(problems);
        }
        else {
            const filtered = problems.filter(problem => problem.category === selectedValue); // Supondo que a categoria do problema esteja disponível como problem.category
            setFilteredProblems(filtered);
        }
    };

    const updateCurrentPageProblems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setCurrentPageProblems(filteredProblems.slice(startIndex, endIndex));
    };

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

    React.useEffect(() => {
        updateCurrentPageProblems();
    }, [currentPage, filteredProblems]);

    let totalItems = filteredProblems.length;
    return (
        <Page>
            <div className='page'>
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

                {/*Filter, Pagination*/}
                <div className="subhead-container">
                    <div className='filter-container'>
                        <h4 className='filters-text'>Filtros</h4>
                        <select className='problems-select-filter' onChange={handleFilterChange}>
                            <option value="categoria">Todos</option>
                            <option value="elétrico">Elétrico</option>
                            <option value="mecânico">Mecânico</option>
                            <option value="eletrônico">Eletrônico</option>
                            <option value="sistema">Sistema</option>
                        </select>
                    </div>
                    <ProblemsPagination
                        totalItems={totalItems}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>

                <div className="problemsList">
                    <ul>
                        {currentPageProblems.map((problem, index) => (
                        <li key={index}>
                            <ProblemCard item={problem}/>
                        </li>
                    ))}
                    </ul>
                </div>

            </div>
        </Page>
    );
};
