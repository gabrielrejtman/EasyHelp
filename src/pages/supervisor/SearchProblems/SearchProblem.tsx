import { useEffect, useRef, useState } from 'react';
import { IoMdSearch, IoIosAlert } from 'react-icons/io';
import axios from 'axios';
import { Title, Page, Path } from '../../../components/GlobalComponents.style.tsx';
import { SearchProblemCard } from '../../../components/Cards/SearchProblemCard.tsx';
import './styles.css'
import {useNavigate} from "react-router-dom";
import Problem from '../../../domain/entities/Problem'
import { ShowProblems } from '../../../services/useCases/Problems/ShowProblems.ts';
import { SearchProblemOpenSearchUseCase } from '../../../domain/usecases/OpenSearch/SearchProblemOpenSearchUseCase.ts';
import { SearchProblemUseCase } from '../../../services/useCases/Problems/SearchProblem.ts'
import { title } from 'process';

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
    const [search, setSearch] = useState<Problem[]>([]);
    const searchTerm = useRef<HTMLInputElement>(null)
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

    const handleSearch = async () => {
        console.log("sexo");
        if(!searchTerm.current?.value){
            return 
        }

        try{
            const searchProblem = new SearchProblemUseCase();
            const title = searchTerm.current?.value;
            const res = await searchProblem.execute({title});
            setSearch(res);
            console.log(search);

        }catch(error){
            console.log(error);
        }
    }

    return (
        <Page>
            <Path>Home</Path>

            <Title>Buscar Problemas</Title>

            <div className="search-problem-containerInput">
                <button onClick={handleSearch} className="search-problem-buttonSearch">
                    <IoMdSearch size={24} color="#000" />
                </button>
                <input
                    type="text"
                    placeholder="Digite o problema"
                    maxLength={200}
                    ref ={searchTerm}
                />
            </div>

            <div className="search-problem-filters">
                <SearchProblemFilter buttonName={'Mecânico'}/>
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
                    <SearchProblemCard itens={problems} />
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

