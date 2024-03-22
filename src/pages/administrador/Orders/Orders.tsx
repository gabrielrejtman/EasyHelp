import React, { useEffect, useState } from 'react'
import { Page, Path, Title } from '../../../components/GlobalComponents.style'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import FullyStar from '../../../assets/icons/FullyStar.svg'
import StarOutlined from '../../../assets/icons/StarOutlined.svg'
import Arrow from '../../../assets/icons/OrderArrow.svg'
import './styles.css'
import {FaUserCircle} from "react-icons/fa";
import Order from '../../../domain/entities/Order'
import { ShowOrders } from '../../../services/useCases/Orders/ShowOrders'
import { format } from 'date-fns';

// Show Orders design

const renderOrderCard = (item: Order, index: number): React.ReactNode => (
    <div key={index} className="card">
        <div className="card-content">

            {/*Order Info*/}
            <div className="cardHead">
                {/*Supervisor*/}
                <div className='order-user-container'>
                    <FaUserCircle size={40} color='black'/>
                    <div className='order-users-info'>
                        {/* <p className='card-user-names'>{item.supervisor.name}</p> */}
                        {/* <p className='card-users-info'>{'#'+item.supervisor.id+' - '+item.supervisor.role}</p> */}
                        <p className='card-user-names'>Adenaldo Júnior</p>
                        <p className='card-users-information'>{'# 1234 - supervisor'}</p>
                    </div>
                </div>

                {/*Stars*/}
                <div className='order-evaluation-container'>
                    {Array.from({ length: 5 }, (_, index) => (
                        <img
                            key={index}
                            src={item.rating >= index + 1 ? FullyStar : StarOutlined }
                            className="star-image"
                        />
                    ))}
                </div>

                {/*Local*/}
                <div className='order-info'>Setor: {item.sector}</div>

                {/*Time*/}
                <div>
                <div className='order-info'>Técnico solicitado: {item.createdAt ? format(item.createdAt, 'HH:mm') : ''}</div>
                    <div className='order-info'>Resolvido: {item.finalUpdatedAt ? format(item.finalUpdatedAt, 'HH:mm') : ''}</div>
                </div>


                <img src={Arrow} className='order-arrow'/>
                {/*Technician*/}
                <div className='order-user-container'>
                    <FaUserCircle size={40} color='black'/>
                    <div className='order-users-info'>
                        {/* <p className='card-user-names'>{item.technician.name}</p>
                        <p className='card-users-info'>{'#'+item.technician.id+' - '+item.technician.role}</p> */}
                        <p className='card-user-names'>Marcelo Pinto</p>
                        <p className='card-users-information'># 12345 - técnico</p>
                    </div>
                </div>
            </div>

            <hr className="division-line"/>

            {/*Problem*/}
            <div className="order-problem-card">
                {/* <p className="order-problem-title">{item.problem.title}</p>
                <div className="order-problem-tags">
                    <div className="order-problem-category">{item.problem.category}</div>
                    <div className="problem-difficulty">{item.problem.difficulty}</div>
                </div> */}
                <p className="order-problem-title">A máquina não funciona</p>
                <div className="order-problem-tags">
                    <div className="order-problem-category">elétrico</div>
                    <div className="problem-difficulty">fácil</div>
                </div>
            </div>
            <p className="order-problem-description">{item.description}</p>
        </div>

    </div>
)

const OrdersList: React.FC<{ orders: Order[] }> = ({ orders }) => (
    <div className="ordersList">
      <ul>{orders.map(renderOrderCard)}</ul>
    </div>
);


const Orders: React.FC = () => {

  const [orders, setProblems] = useState<Order[]>([]);

  const [search, setSearch] = useState<string>('');

  const totalItems = orders.length;
  const navigate = useNavigate();
  const showOrders = new ShowOrders()

   useEffect(() => {
       loadOrders()
   }, []);

   async function loadOrders() {
    try {
        const response = await showOrders.execute();
        // Filtra itens que têm 'finalUpdatedAt' definido e ordena
        const sortedResponse = response
          .filter((item) => item.finalUpdatedAt !== undefined) // Filtra itens sem 'finalUpdatedAt'
          .sort((a, b) => {
            // Como filtramos acima, TypeScript deveria entender que 'finalUpdatedAt' não é undefined aqui, mas vamos assegurar com uma verificação extra
            const dateA = a.finalUpdatedAt ? new Date(a.finalUpdatedAt).getTime() : 0;
            const dateB = b.finalUpdatedAt ? new Date(b.finalUpdatedAt).getTime() : 0;
            return dateA - dateB;
          });
        setProblems(sortedResponse);
    } catch (error) {
        console.error("Falha ao carregar problemas:", error);
    }
  }
  
  
  
  
  
  

  return (
    <Page>
      <Path>Home</Path>
      <Title>Histórico de Ocorrências</Title>

      {/*Date calendar*/}
      <div className="head-container">
          <h4>Data</h4>
      </div>

      <OrdersList orders={orders} />
    </Page>
  );
};

export default Orders;
