import { useEffect, useState } from 'react';
import { IoMdSearch, IoIosAlert } from 'react-icons/io';
import { Title, Page, Path } from '../../../components/GlobalComponents.style.tsx';
import './styles.css'
import {useNavigate} from "react-router-dom";
import Problem from '../../../domain/entities/Problem'
import { ShowProblems } from '../../../services/useCases/Problems/ShowProblems.ts';import { SearchProblemUseCase } from '../../../services/useCases/Problems/SearchProblem.ts'
import { ProblemsPagination } from '../../../components/ProblemsPagination.tsx';
import { SearchProblemCard } from '../../../components/Cards/SearchProblemCard.tsx';

// SearchProblemFilter component
const SearchProblemFilter: React.FC<{
    buttonName: string,
    onFilterChange: (filter: string) => void,
    isActive: boolean // Adicione esta prop
}> = ({ buttonName, onFilterChange, isActive }) => {
    const handleClick = () => {
        onFilterChange(buttonName);
    };

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

    // States
    const [problems, setProblems] = useState<Problem[]>([]);
    const [searchList, setSearchList] = useState<Problem[]>([])
    const [searchTerm, setSearchTerm] = useState<string>(''); 
    const [selectedFilter, setSelectedFilter] = useState('Todos'); 

    //Pagination
    const itemsPerPage = 10;
    const totalItems = searchTerm.length > 0 ? searchList.length : problems.length
    const [currentPage, setCurrentPage] = useState(1);
    const filteredProblemsPaginated = searchTerm.length > 0 ? 
        searchList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : []
    const paginatedAllProblems = problems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    // Constants
    const showProblems = new ShowProblems()
    const navigate = useNavigate();
    
    useEffect(() => {
        loadProblems();
    }, []);

    async function loadProblems() {
        try {
            const response = await showProblems.execute();
            const sortedResponse = response.sort((a, b) => a.title.localeCompare(b.title));
            setProblems(sortedResponse);
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

    const getFilteredProblems = (problemList: Problem[]) => {

        if (selectedFilter === 'Todos') {
            return problemList;
        } 
        
        else if (selectedFilter === 'Outros') {

            const specificCategories = ['mecânico', 'eletrônico', 'elétrico', 'sistema'];
            return problemList.filter(problem => !specificCategories.includes(problem.category));

        } 

        else {
            return problemList.filter(problem => problem.category === selectedFilter.toLocaleLowerCase());
        }
    };
    

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    
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
            <Path>Home</Path>

            <Title>Buscar Problemas</Title>

            <div className="search-problem-containerInput">
                <button className="search-problem-buttonSearch" >
                    <IoMdSearch size={24} color="#000" />
                </button>
                <input
                    type="text"
                    placeholder="Digite o problema"
                    maxLength={200}
                    value={searchTerm}
                    onChange={(e) => handleSearch((e))}
                />
            </div>

            <div className="search-problem-filters">
                {['Todos', 'Mecânico', 'Eletrônico', 'Elétrico', 'Sistema', 'Outros'].map((filterName) => (
                    <SearchProblemFilter
                        key={filterName} // Não esqueça de adicionar uma key ao mapear listas!
                        buttonName={filterName}
                        onFilterChange={setSelectedFilter}
                        isActive={selectedFilter === filterName}
                    />
                ))}
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

            <div className="problemsList">
                { searchTerm.length > 0 ? 
                    (
                        <ul>
                            {getFilteredProblems(filteredProblemsPaginated).map(problem => (
                                <SearchProblemCard key={problem.id} problem={problem} />
                            ))}
                        </ul>
                    ) :
                    (
                        <ul>
                            {getFilteredProblems(paginatedAllProblems).map(problem => (
                                <SearchProblemCard key={problem.id} problem={problem} />
                            ))}
                        </ul>
                    )
                }
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

