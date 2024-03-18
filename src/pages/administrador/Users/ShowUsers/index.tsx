import React, { useEffect, useState } from 'react'
import { Page, Path, Title } from '../../../../components/GlobalComponents.style'
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import add from '../../../../assets/icons/Add.svg'
import searchIcon from '../../../../assets/icons/Search.svg'
import './styles.css'
import User from '../../../../domain/entities/User'
import { ShowUsers } from '../../../../services/useCases/User/ShowUsers'
import { UserCard } from '../../../../components/Cards/User'


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

    //Global constants
    const showUsers = new ShowUsers()
    
    const navigate = useNavigate();

    useEffect(() => {
        loadUsers()
    }, []);

    async function loadUsers(){
        try {
            const response = await showUsers.execute();
            setUsers(response);
        } catch (error) {
            console.error("Falha ao carregar problemas:", error);
        }
    }

    const handleAddUsers = () => {
        navigate('/adm/users-register');
    };

    return (
        <Page>
            <div className='page'>
                <Path>Home</Path>
                <Title>Usuarios</Title>

                {/*Add Problem, Search Bar*/}
                <div className="head-container">
                    {/*Add Problem*/}
                    <div>
                        <button className="btn-add-problem" onClick={handleAddUsers}>
                            <div className='itens-btn-add'>
                                <img src={add}/>
                                <p className='btn-text'>Novo Cadastro</p>
                            </div>
                        </button>
                    </div>

                </div>

                <div className="problemsList">
                    {searchTerm === '' ? ( // Check searchTerm here
                        <ul>{users.map((user) => (
                            <UserCard key={user.id} item={user} />
                        ))}</ul>
                    ) : (
                        <ul>{search.map((user) => (
                            <UserCard key={user.id} item={user} />
                        ))}</ul>
                    )}
                </div>
            </div>
        </Page>
    );
};
