import React, { useEffect, useState } from 'react'
import { Page, Path, Title } from '../../../components/GlobalComponents.style'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './styles.css'


// Temporary Example
    import {Order, exampleOrder} from '../../../entities/example.ts'


// Fetch Data
    const fetchData = async (): Promise<Order[]> => {
      try {
        const resp = await axios.get<Order[]>('http://localhost:3300/cadastrar_problema');
        return resp.data;
      } catch (error) {
        console.log(JSON.stringify(error));
        return [];
      }
    };



// Show Orders design
const renderOrderCard = (item: Order, index: number): React.ReactNode => (
    <div key={index} className="card">
      <div className="card-content">
        <div className="cardHead">
          <p className="cardTitulo">{item.problem.title}</p>
          <div className="etiquetas">
            <div className="categoria">{item.problem.category}</div>
            <div className="dificuldade">{item.problem.difficulty}</div>
          </div>
        </div>
        <p className="cardDescricao">{item.problem.description}</p>
      </div>
    </div>
)

const OrdersList: React.FC<{ problems: Order[] }> = ({ problems }) => (
    <div className="listaDeProblemas">
      <ul>{problems.map(renderOrderCard)}</ul>
    </div>
);


const Problems: React.FC = () => {

  const [problems, setProblems] = useState<Order[]>([
      exampleOrder
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


  return (
      <div>
        <Page>
          <Path>Home</Path>
          <Title>Problemas e soluções</Title>

          {/*Date calendar*/}
          <div className="head-container">
              <h4>Data</h4>
          </div>

          <OrdersList problems={problems} />
        </Page>
      </div>
  );
};

export default Problems;
