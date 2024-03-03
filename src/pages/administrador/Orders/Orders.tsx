import React, { useEffect, useState } from 'react'
import { Page, Path, Title } from '../../../components/GlobalComponents.style'
import { useNavigate } from 'react-router-dom'
import './styles.css'
import {OrderCard} from '../../../components/Cards/OrderCard.tsx'
import { api } from '../../../services/api.ts'

// Temporary Example
    import {Order, exampleOrder} from '../../../entities/example.ts'

// Fetch Data
    const fetchData = async (): Promise<Order[]> => {
      try {
        const resp = await api.get('/cadastrar_problema');
        return resp.data;
      } catch (error) {
        console.log(JSON.stringify(error));
        return [];
      }
    };


export const Orders = () => {

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
        <Page>
          <div>
              <Path>Home</Path>
              <Title>Problemas e soluções</Title>

              <div className="head-container">
                  <h4>Data</h4>
              </div>

              <div className="listaDeProblemas">
                <ul>{problems.map((problem : Order) => 
                    <OrderCard item={problem}/>
                )}
                </ul>
              </div>
          </div>
        </Page>
  );
};
