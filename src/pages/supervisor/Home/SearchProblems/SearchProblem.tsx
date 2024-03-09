import { useEffect, useState } from 'react';
import { IoMdSearch, IoIosAlert } from 'react-icons/io';
import axios from 'axios';
import { Title, Page } from '../../../../components/GlobalComponents.style.tsx';
import { SearchProblemCard } from '../../../../components/Cards/SearchProblemCard.tsx';
import './styles.css'
import {useNavigate} from "react-router-dom";

interface Problem {
    title: string;
    category: string;
    difficulty: string;
    description: string;
}

const ex1 = {
    title: "maquina nao liga",
    category: 'elétrico',
    difficulty: 'dificil',
    description: 'esse problema ai é dificil a pampa',
}


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
    const [problems, setProblems] = useState<Problem[]>([]);
    const [search, setSearch] = useState<string>('');

    const navigate = useNavigate();


    useEffect(() => {
        async function fetchData() {
            await loadProblems();
        }
        fetchData();
    }, []);

    async function loadProblems() {
        try {
            const resp = await axios.get<Problem[]>('http://localhost:3300/cadastrar_problema');
            setProblems(resp.data);
        } catch (error) {
            console.error(JSON.stringify(error));
        }
    }


    const handleNotFound = () => {
        navigate('/supervisor/problem-not-found');
    };

    return (
        <Page>
            <p className="path">Home</p>

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
                <SearchProblemFilter buttonName={'Mecanico'}/>
                <SearchProblemFilter buttonName={'Eletrônico'}/>
                <SearchProblemFilter buttonName={'Elétrico'}/>
                <SearchProblemFilter buttonName={'Sistema'}/>
                <SearchProblemFilter buttonName={'Outros'}/>
            </div>


            <p className="search-problem-cardTitle" id="problemasPesquisados">
                Problemas pesquisados
            </p>

            <div className="search-problem-listOfProblems">
                <ul>
                    <SearchProblemCard itens={[ex1, ex1, ex1, ex1, ex1, ex1]} />
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

