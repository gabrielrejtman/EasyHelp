import React, { useEffect, useState } from 'react';
import {Page, Path, Title} from '../../../components/GlobalComponents.style.tsx'
import styled from 'styled-components';
import FullyStar from '../../../assets/icons/FullyStar.svg';
import StarOutlined from '../../../assets/icons/StarOutlined.svg';
import Arrow from '../../../assets/icons/OrderArrow.svg';
import { FaUserCircle } from 'react-icons/fa';
import { Order, PrismaClient } from '@prisma/client';
import { BackgroundModal } from '../../../components/GlobalComponents.style';
import { ModalStyle } from '../../../components/GlobalComponents.style';
import { ShowOrders } from '../../../services/useCases/Orders/ShowOrders.ts';
import { format } from 'date-fns';
import PrismaOrderRepository from '../../../api/prisma/PrismaOrderRepository.ts';
import { UpdateOrder } from '../../../services/useCases/Orders/UpdateOrders.ts';

  
const exampleOrder: Order[] = [
    {
        id: '1',
        supervisor: { name: "Supervisor 1", id: '1', role: "Supervisor" },
        technician: { name: "Técnico 1", id: '2', role: "Técnico" },
        note: 4,
        sector: "Setor A",
        timeStart: "08:00",
        status: "Em andamento",
        problem: {
            title: "Problema 1",
            category: "Elétrico",
            difficulty: "Alta",
            description: "Descrição do problema 1"
        },
        timeEnd: '',
        description: ''
    },
    {
        id: '2',
        supervisor: { name: "Supervisor 2", id: '3', role: "Supervisor" },
        technician: { name: "Técnico 2", id: '4', role: "Técnico" },
        note: 3,
        sector: "Setor B",
        timeStart: "09:00",
        status: "Fechado",
        problem: {
            title: "Problema 2",
            category: "Mecânico",
            difficulty: "Média",
            description: "Descrição do problema 2"
        },
        timeEnd: '',
        description: ''
    }
];


const OrdersListContainer = styled.div`
    padding-top: 20px;
    .card-content {
        cursor: pointer;
    }
`;

const OrderCard = (order: Order, openPopup:(order: Order)=>void): React.ReactNode => {

    return(
    <button className="card" style={{ borderColor:'transparent' }} onClick={() => openPopup(order)}>
        <div className="card-content">
            <div className="cardHead">

                <div className='order-user-container'>
                    <FaUserCircle size={40} color='black'/>
                    <div className='order-users-info'>
                        <p className='card-user-names'>{'Paulo Victor Mourão'}</p>
                        <p className='card-users-information'>{'#' + 28116 + ' - ' + 'Supervisor'}</p>
                    </div>
                </div>
                
                <div className='order-evaluation-container'>
                    {Array.from({ length: 5 }, (_, index) => (
                        <img
                            key={index}
                            src={order.rating >= index + 1 ? FullyStar : StarOutlined}
                            className="star-image"
                        />
                    ))}
                </div>
                
                <div>
                    <div className='order-info'>Setor: {order.sector}</div>
                    <div className='order-info'>Inicio: {order.createdAt ? format(order.createdAt, 'HH:mm') : ''}</div>
                </div>
                <img src={Arrow} className='order-arrow'/>
                <div className='order-user-container'>
                    <FaUserCircle size={40} color='black'/>
                    <div className='order-users-info'>
                        <p className='card-user-names'>{"Gabriel Rejtman"}</p>
                        <p className='card-users-information'>{'#' + 692424 + ' - ' + 'Técnico'}</p>
                    </div>
                </div>
            </div>
            <hr className="division-line"/>
            <div className="order-problem-card">
                <p className="order-problem-title">{'TITULO DO PROBLEMA'}</p>
                <div className="order-problem-tags">
                    <div className="order-problem-category">{'CATEGORIA PROBLEMA'}</div>
                    <div className="problem-difficulty">{'DIFICULDADE DO PROBLEMA'}</div>
                </div>
            </div>
            <div className="order-problem-description">{order.description}</div>
        </div>
    </button>
)}


const OrdersList: React.FC<{ orders: Order[],  openPopup:(order: Order)=>void}> = ({ orders, openPopup }) => (
    <div className="ordersList">
      <ul>{orders.map((item) => OrderCard(item, openPopup))}</ul>
    </div>
)


export const SpecialistDemands: React.FC = () => {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [choiceValue, setSelectedValue] = useState<string>('pendente');
    const [orders, setOrders] = useState<Order[]>([]);

    const openPopup = (order: Order) => {
        setSelectedOrder(order);
    };

    const closePopup = (order: Order, status:string) => {
        updateStatus(order, status);
        setSelectedOrder(null);
    };

    const showOrders = new ShowOrders();
    const updateOrders = new UpdateOrder()

    useEffect(() => {
        loadOrders()
    }, []);

    
    async function loadOrders() {
        try {
            const response = await showOrders.execute();
            // Filtra itens que têm 'finalUpdatedAt' definido e ordena
            const sortedResponse = response
            .filter((item) => item.finalUpdatedAt !== undefined) // Filtra itens sem 'finalUpdatedAt'
            .sort((a) => {
                // Como filtramos acima, TypeScript deveria entender que 'finalUpdatedAt' não é undefined aqui, mas vamos assegurar com uma verificação extra
                const dateA = a.finalUpdatedAt ? new Date(a.finalUpdatedAt).getTime() : 0;
                return dateA;
            });
            setOrders(sortedResponse);
        } catch (error) {
            console.error("Falha ao carregar problemas:", error);
        }
    }

    async function updateStatus(order: Order, status:string) {
        try {
            const response = await updateOrders.execute(order.id, status);
            
        } catch (error) {
            console.error("Falha ao carregar problemas:", error);
        }
    }

    return (
        <Page>
            <Path>Home</Path>
            <Title>Solicitações</Title>
            <div className="head-container">
                <div className='filter-order-specialist'>Filtros</div>
            </div>
            <OrdersList orders={orders} openPopup={openPopup}/>
            {selectedOrder && (
                <BackgroundModal>
                    <ModalStyle>
                        <h2>Detalhes da Ordem de Serviço</h2>
                        <p>Descrição: {selectedOrder.description}</p>
                        <p>Status: {selectedOrder.status}</p>
                        <label htmlFor="status">Status:</label>
                        <select name="Status" value={choiceValue} id="status">
                            <option value="pendente">Pendente</option>
                            <option value="concluído">Concluído</option>
                        </select>

                        <button onClick={() => closePopup(selectedOrder, choiceValue)}>Fechar</button>
                    </ModalStyle>
                </BackgroundModal>
            )}
        </Page>
    );
};
