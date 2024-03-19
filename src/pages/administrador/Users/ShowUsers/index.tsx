import React, { useEffect, useState } from 'react'
import { Page, Path, Title } from '../../../../components/GlobalComponents.style'
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import add from '../../../../assets/icons/Add.svg'
import searchIcon from '../../../../assets/icons/Search.svg'
import './styles.css'
import User from '../../../../domain/entities/User'
import { ShowUsers } from '../../../../services/useCases/User/ShowUsers'
import { UserCard } from '../../../../components/Cards/UserCard'
import { SearchUser } from '../../../../services/useCases/User/SearchUser'
import { ProblemsPagination } from '../../../../components/ProblemsPagination'


const UsersPagination: React.FC<{ totalItems: number }> = ({ totalItems }) => (
    <div className="btn-pages">
        <BiSolidLeftArrow size={14} />
        <p className="pages-index">1-10 de {totalItems}</p>
        <BiSolidRightArrow size={14} />
    </div>
);


export const Users = () => {

    //States
    const [search, setSearch] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>(''); // State for searchTerm
    const [users, setUsers] = useState<User[]>([]);

    //Pagination
    const itemsPerPage = 10;
    const totalItems = searchTerm.length > 0 ? search.length : users.length
    const [currentPage, setCurrentPage] = useState(1);
    const paginatedAllUsers = 
        users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    const paginatedSearch = searchTerm.length > 0 ? 
        search.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : []

    //Global constants
    const showUsers = new ShowUsers()
    const navigate = useNavigate();

    useEffect(() => {
        loadUsers()
    }, []);

    async function loadUsers(){
        try {
            const response = await showUsers.execute();
            const sortedResponse = response.sort((a, b) => a.name.localeCompare(b.name));
            setUsers(sortedResponse);
        } catch (error) {
            console.error("Falha ao carregar problemas:", error);
        }
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleAddUsers = () => {
        navigate('/adm/users-register');
    };

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    
        if (e.target.value.trim() === '') {
            setSearch([]);
            return;
        }
    
        try {
            const searchProblem = new SearchUser();
            const res = await searchProblem.execute({ name: searchTerm });
            const sortedResponse = res.sort((a, b) => a.name.localeCompare(b.name));
            setSearch(sortedResponse);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Page>
            <div className='page'>
                <Path>Home</Path>
                <Title>Usuarios</Title>

                {/*Add User, Search Bar*/}
                <div className="head-container-users">
                    <div className="left-section">
                        {/* Add User */}
                        <button className="btn-add-problem" onClick={handleAddUsers}>
                            <div className='itens-btn-add'>
                                <img src={add} alt="Add"/>
                                <p className='btn-text'>Novo Cadastro</p>
                            </div>
                        </button>

                        {/* Search Bar */}
                        <div className="containerInput">
                            <button className="buttonSearch">
                                <img src={searchIcon} alt="Search" />
                            </button>
                            <input 
                                type="text" 
                                placeholder="Buscar por Usuário" 
                                value={searchTerm} // Use searchTerm state here
                                onChange={(e) => handleSearch((e))} // Update searchTerm state
                                maxLength={200} 
                            />
                        </div>
                    </div>

                    {/* Pagination Element */}
                    <div className='pagination-element'>
                        <ProblemsPagination
                            totalItems={totalItems}
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>


                <div className="problemsList">
                    {searchTerm.length > 0 ? (
                        <ul>
                            {paginatedSearch.map((user) => (
                                <UserCard key={user.id} item={user} />
                            ))}
                        </ul>
                    ) : (
                        <ul>
                            {paginatedAllUsers.map((user) => (
                                <UserCard key={user.id} item={user} />
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </Page>
    );
};
