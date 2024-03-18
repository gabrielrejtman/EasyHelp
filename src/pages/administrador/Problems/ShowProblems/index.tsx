import React, { useEffect, useState } from 'react';
import { Page, Path, Title } from '../../../../components/GlobalComponents.style';
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import add from '../../../../assets/icons/Add.svg';
import searchIcon from '../../../../assets/icons/Search.svg';
import './styles.css';
import Problem from '../../../../domain/entities/Problem';
import { ShowProblems } from '../../../../services/useCases/Problems/ShowProblems';
import { ProblemCard } from '../../../../components/Cards/ProblemCard';
import { SearchProblemUseCase } from '../../../../services/useCases/Problems/SearchProblem';

const ProblemsPagination: React.FC<{ totalItems: number }> = ({ totalItems }) => (
    <div className="btn-pages">
        <BiSolidLeftArrow size={14} />
        <p className="pages-index">1-10 de {totalItems}</p>
        <BiSolidRightArrow size={14} />
    </div>
);

export const Problems = () => {

    // States
    const [problems, setProblems] = useState<Problem[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>(''); // State for searchTerm

    // Global constants
    const totalItems = problems.length;
    const navigate = useNavigate();
    const [search, setSearch] = useState<Problem[]>([]);
    const showProblems = new ShowProblems();
    
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

    const handleAddProblem = () => {
        navigate('/adm/problems-register');
    };

    const handleSearch = async () => {
        if (!searchTerm) { // Check searchTerm directly
            return;
        }

        try {
            const searchProblem = new SearchProblemUseCase();
            const res = await searchProblem.execute({ title: searchTerm });
            setSearch(res);
            console.log(search);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Page>
            <div className='page'>
                <Path>Home</Path>
                <Title>Problemas e soluções</Title>

                {/* Add Problem, Search Bar */}
                <div className="head-container">
                    {/* Add Problem */}
                    <div>
                        <button className="btn-add-problem" onClick={handleAddProblem}>
                            <div className='itens-btn-add'>
                                <img src={add} alt="Add" />
                                <p className='btn-text'>Novo Cadastro</p>
                            </div>
                        </button>
                    </div>
                    {/* Search Bar */}
                    <div className="containerInput">
                        <button onClick={handleSearch} className="buttonSearch">
                            <img src={searchIcon} alt="Search" />
                        </button>
                        <input 
                            type="text" 
                            placeholder="Buscar por Problemas" 
                            value={searchTerm} // Use searchTerm state here
                            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm state
                            maxLength={200} 
                        />
                    </div>
                </div>
                <div className="subhead-container">
                    <div className='filter-container'>
                        <h4 className='filters-text'>Filtros</h4>
                        <select className='problems-select-filter'>
                            <option value="categoria">Todos</option>
                            <option value="elétrico">Elétrico</option>
                            <option value="mecânico">Mecânico</option>
                            <option value="eletrônico">Eletrônico</option>
                            <option value="sistema">Sistema</option>
                        </select>
                    </div>
                    <ProblemsPagination totalItems={totalItems} />
                </div>

                <div className="problemsList">
                    {searchTerm === '' ? ( // Check searchTerm here
                        <ul>{problems.map((problem) => (
                            <ProblemCard key={problem.id} item={problem} />
                        ))}</ul>
                    ) : (
                        <ul>{search.map((problem) => (
                            <ProblemCard key={problem.id} item={problem} />
                        ))}</ul>
                    )}
                </div>
            </div>
        </Page>
    );
};
