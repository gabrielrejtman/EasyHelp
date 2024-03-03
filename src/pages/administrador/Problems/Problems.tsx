import styled from 'styled-components';
import './styles.css'
import React, { useEffect, useState } from 'react';
import { FaPencil, FaTrash} from 'react-icons/fa6';
import { IoMdSearch } from 'react-icons/io';
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Page = styled.div`
  padding: 20px;
  margin-left: 45px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  outline: none;
  margin-left: 20px;
  background-color: rgba(0, 0, 0, 0);
  border: solid rgba(0, 0, 0, 0);
  cursor: pointer;
`;

interface Problem {
    titulo: string;
    categoria: string;
    dificuldade: string;
    descricao: string;
}

const fetchData = async (): Promise<Problem[]> => {
    try {
        const resp = await axios.get<Problem[]>('http://localhost:3300/cadastrar_problema');
        return resp.data;
    } catch (error) {
        console.log(JSON.stringify(error));
        return [];
    }
};

const renderProblemCard = (item: Problem, index: number): React.ReactNode => (
    <div key={index} className="card">
        <div className="card-content">
            <div className="cardHead">
                <p className="cardTitulo">{item.titulo}</p>
                <div className="etiquetas">
                    <div className="categoria">{item.categoria}</div>
                    <div className="dificuldade">{item.dificuldade}</div>
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

const ProblemsList: React.FC<{ problems: Problem[] }> = ({ problems }) => (
    <div className="listaDeProblemas">
        <ul>{problems.map(renderProblemCard)}</ul>
    </div>
);

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
        descricao: 'A maquina apresenta sinais de...'}
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
        navigate('/register_problem');
    };

    return (
        <div>
            <Page>
                <a>Home</a>
                <Title>Problemas e soluções</Title>
            </Page>

            <div className="head-container">
                <div className="containerInput">
                    <button className="buttonSearch">
                        <IoMdSearch size={24} color="#000" />
                    </button>
                    <input type="text" placeholder="Digite o problema" maxLength={200} />
                </div>
                <ProblemsPagination totalItems={totalItems} />
            </div>

            <ProblemsList problems={problems} />

            <button className="btn-add-problem" onClick={handleAddProblem}>
                Adicionar Problema
            </button>
        </div>
    );
};

export default Problems;
