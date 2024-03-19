import { useEffect, useState } from 'react';
import { Page, Path, Title } from '../../../../components/GlobalComponents.style';
import { useNavigate } from 'react-router-dom';
import add from '../../../../assets/icons/Add.svg';
import searchIcon from '../../../../assets/icons/Search.svg';
import './styles.css';
import Problem from '../../../../domain/entities/Problem';
import { ShowProblems } from '../../../../services/useCases/Problems/ShowProblems';
import { ProblemCard } from '../../../../components/Cards/ProblemCard';
import { SearchProblemUseCase } from '../../../../services/useCases/Problems/SearchProblem';
import {ProblemsPagination} from "../../../../components/ProblemsPagination.tsx";

export const Problems = () => {

    // States
    const [problems, setProblems] = useState<Problem[]>([]);
    const [searchList, setSearchList] = useState<Problem[]>([])
    const [searchTerm, setSearchTerm] = useState<string>(''); 
    const [selectedFilter, setSelectedFilter] = useState('todos');
    const [filteredProblems, setFilteredProblems] = useState<Problem[]>([]);

    // Pagination
    const itemsPerPage = 10;
    const totalItems = filteredProblems.length;
    const [currentPage, setCurrentPage] = useState(1);
    //const paginatedAllProblems = problems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    //const filteredProblemsPaginated = searchTerm.length > 0 ? 
    //    searchList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : []
    const paginatedFilteredProblems = filteredProblems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
        

    // Other constants
    const navigate = useNavigate();
    const showProblems = new ShowProblems();
    
    useEffect(() => {
        loadProblems();
    }, []);

    useEffect(() => {
        let filtered = problems;

        if (searchTerm.length > 0) {
            filtered = searchList;
        }

        filtered = getFilteredProblems(filtered); 

        setFilteredProblems(filtered);
        
    }, [problems, searchList, searchTerm, selectedFilter]);


    async function loadProblems() {
        try {
            const response = await showProblems.execute();
            const sortedResponse = response.sort((a, b) => a.title.localeCompare(b.title));
            setProblems(sortedResponse);
        } catch (error) {
            console.error("Falha ao carregar problemas:", error);
        }
    }

    const handleAddProblem = () => {
        navigate('/adm/problems-register');
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const getFilteredProblems = (problemList: Problem[]) => {
        
        if (selectedFilter === 'todos') {
            return problemList;
        } 

        else if (selectedFilter === 'outros') {

            const specificCategories = ['mecânico', 'eletrônico', 'elétrico', 'sistema'];
            return problemList.filter(problem => !specificCategories.includes(problem.category));

        } 

        else{
            return problemList.filter(problem => problem.category === selectedFilter);
        }
    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        setSelectedFilter(selectedValue);
        setCurrentPage(1); 
    };

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);

        setCurrentPage(1);

        if (e.target.value.trim() === '') {
            setSearchList([]);
            return;
        }
    
        try {
            const searchProblem = new SearchProblemUseCase();
            const title = e.target.value; // Use the updated value directly from the event
            const res = await searchProblem.execute({ title });
            const sortedRes = res.sort((a, b) => a.title.localeCompare(b.title));
            setSearchList(sortedRes);
        } catch (error) {
            console.error(error);
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
                        <button className="buttonSearch">
                            <img src={searchIcon} alt="Search" />
                        </button>
                        <input 
                            type="text" 
                            placeholder="Buscar por Problemas" 
                            value={searchTerm} // Use searchTerm state here
                            onChange={(e) => handleSearch((e))} // Update searchTerm state
                            maxLength={200} 
                        />
                    </div>
                </div>
                <div className="subhead-container">
                    <div className='filter-container'>
                        <h4 className='filters-text'>Filtros</h4>
                        <select className='problems-select-filter' onChange={handleFilterChange}>
                            <option value="todos">Todos</option>
                            <option value="elétrico">Elétrico</option>
                            <option value="mecânico">Mecânico</option>
                            <option value="eletrônico">Eletrônico</option>
                            <option value="sistema">Sistema</option>
                            <option value="outros">Outros</option>
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
                        {paginatedFilteredProblems.map(problem => (
                            <ProblemCard key={problem.id} item={problem} />
                        ))}
                    </ul>
                </div>

            </div>
        </Page>
    );
};
