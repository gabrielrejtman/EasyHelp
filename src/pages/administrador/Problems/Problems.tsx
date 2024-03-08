import React, { useEffect, useState } from 'react'
import { Page, Path, Title } from '../../../components/GlobalComponents.style'
import { FaPencil, FaTrash} from 'react-icons/fa6'
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import add from '../../../assets/icons/Add.svg'
import searchIcon from '../../../assets/icons/Search.svg'
import './styles.css'

const Button = styled.button`
  outline: none;
  margin-left: 20px;
  background-color: #f0f0f0;
  cursor: pointer;
`

interface Problem {
    titulo: string;
    categoria: string;
    dificuldade: string;
    descricao: string;
}

// Fetch Data
    const fetchData = async (): Promise<Problem[]> => {
        try {
            const resp = await axios.get<Problem[]>('http://localhost:3300/cadastrar_problema');
            return resp.data;
        } catch (error) {
            console.log(JSON.stringify(error));
            return [];
        }
    };


// Show problems design
    const renderProblemCard = (item: Problem, index: number): React.ReactNode => (
        <div key={index} className="problemCard">
            <div className="problemCardContent">
                <div className="problemCardHead">
                    <p className="cardProblemTitle">{item.titulo}</p>
                    <div className="problemTags">
                        <div className="problemCategory">{item.categoria}</div>
                        <div className="problemDifficulty">{item.dificuldade}</div>
                    </div>
                </div>
                <p className="cardDescricao">{item.descricao}</p>
            </div>
            <div className="btn-bar">
                <Button>
                    <FaPencil size={15} />
                </Button>
                <Button>
                    <FaTrash size={15} />
                </Button>
            </div>
        </div>
    )

    const ProblemsPagination: React.FC<{ totalItems: number }> = ({ totalItems }) => (
        <div className="btn-pages">
            <BiSolidLeftArrow size={14} />
            <p className="pages-index">1-10 de {totalItems}</p>
            <BiSolidRightArrow size={14} />
        </div>
    );



const Problems: React.FC = () => {

    const [problems, setProblems] = useState<Problem[]>([{
        titulo: 'maquina não liga',
        categoria: 'eletrico',
        dificuldade: 'facil',
        descricao: 'A máquina apresenta sinais de...'}
    ]);

    const [search, setSearch] = useState<string>('');

    const totalItems = problems.length;
    const navigate = useNavigate();

//    useEffect(() => {
//        const fetchAndSetProblems = async () => {
//            const problemsData = await fetchData();
//            setProblems(problemsData);
//        };
//        fetchAndSetProblems();
//    }, []);

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
                    <ul>{problems.map(renderProblemCard)}</ul>
                </div>

            </div>
        </Page>
    );
};

export default Problems;
