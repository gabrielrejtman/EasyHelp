import React, { useEffect, useState } from 'react';
import { IoMdSearch, IoIosAlert } from 'react-icons/io';
import axios from 'axios';
import { Title, Page, Path } from '../../../components/GlobalComponents.style.tsx';
import { SearchProblemCard } from '../../../components/Cards/SearchProblemCard.tsx';
import './styles.css'
import {useNavigate} from "react-router-dom";
import Problem from '../../../domain/entities/Problem'
import { ShowProblems } from '../../../services/useCases/Problems/ShowProblems.ts';
import {ProblemsPagination} from "../../../components/Cards/ProblemsPagination.tsx";


const SearchProblemFilter: React.FC<{ buttonName: string }> = ({buttonName,}) => {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => setIsActive(!isActive);

    return (
        <button
            className={`search-problem-filter ${isActive ? 'active' : ''}`}
            onClick={handleClick}
        >
            {buttonName}
        </button>
    );
};




export function SearchProblem() {
    const ex1 = {
        title: 'maquina não liga',
        category: 'mecânico',
        difficulty: 'facil',
        description: 'A maquina apresenta sinais de...'
    }
    const ex2 = {
        title: 'aaaaaaaaaaaa',
        category: 'elétrico',
        difficulty: 'facil',
        description: 'A maquina apresenta sinais de...'
    }

    const [problems, setProblems] = useState<Problem[]>([ex1, ex1, ex1, ex1, ex1, ex1, ex1, ex1, ex1, ex1,ex2, ex2]);
    const [search, setSearch] = useState<string>('');


    const itemsPerPage = 10;
    const totalItems = problems.length;
    const [currentPage, setCurrentPage] = useState(1);
    const paginatedProblems = problems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const showProblems = new ShowProblems()
    const navigate = useNavigate();


    useEffect(() => {
        loadProblems();
    }, []);

    async function loadProblems() {
        try {
            const response = await showProblems.execute();
            setProblems(response);
        } catch (error) {
            console.error("Falha ao carregar problemas:", error);
        }
    }


    const handleNotFound = () => {
        navigate('/supervisor/problem-not-found');
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <Page>
            <Path>Home</Path>

            <Title>Buscar Problemas</Title>

            <div className="search-problem-containerInput">
                <button className="search-problem-buttonSearch">
                    <IoMdSearch size={24} color="#000" />
                </button>
                <input
                    type="text"
                    placeholder="Digite o problema"
                    maxLength={200}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="search-problem-filters">
                <SearchProblemFilter buttonName={'Mecânico'}/>
                <SearchProblemFilter buttonName={'Eletrônico'}/>
                <SearchProblemFilter buttonName={'Elétrico'}/>
                <SearchProblemFilter buttonName={'Sistema'}/>
                <SearchProblemFilter buttonName={'Outros'}/>
            </div>

            <div className="subhead-container-supervisor-home">
                <p className="search-problem-cardTitle" id="problemasPesquisados">
                    Problemas pesquisados
                </p>
                <ProblemsPagination
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>


            <div className="search-problem-listOfProblems">
                <ul>
                    {paginatedProblems.map((problems, index) => (
                        <li key={index}>
                            <SearchProblemCard item={problems} />
                        </li>
                    ))}

                </ul>
            </div>

            <button className="search-problem-notFound" onClick={handleNotFound}>
                <div className="search-problem-notFoundContent">
                    <IoIosAlert size={24} color="#FFF" />
                    <p className="search-problem-notFoundText">Problema não encontrado</p>
                </div>
            </button>

        </Page>
    );
}

