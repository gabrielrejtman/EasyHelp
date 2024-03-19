import React, { useState } from 'react';
import {Page, Path, Title} from '../../../components/GlobalComponents.style.tsx'
import styled from 'styled-components';
import FullyStar from '../../../assets/icons/FullyStar.svg';
import StarOutlined from '../../../assets/icons/StarOutlined.svg';
import Arrow from '../../../assets/icons/OrderArrow.svg';
import { FaUserCircle } from 'react-icons/fa';
import { Order } from '../../../domain/entities/example';
import { BackgroundModal } from '../../../components/GlobalComponents.style';
import { ModalStyle } from '../../../components/GlobalComponents.style';

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
            category: "Categoria 1",
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
            category: "Categoria 2",
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

const OrderCard: React.FC<{ order: Order; onClick: () => void }> = ({ order, onClick }) => (
    <button className="card" onClick={onClick}>
        <div className="card-content">
            <div className="cardHead">
                <div className='order-user-container'>
                    <FaUserCircle size={40} color='black'/>
                    <div className='order-users-info'>
                        <p className='card-user-names'>{order.supervisor.name}</p>
                        <p className='card-users-info'>{'#'+order.supervisor.id+' - '+order.supervisor.role}</p>
                    </div>
                </div>
                <div className='order-evaluation-container'>
                    {Array.from({ length: 5 }, (_, index) => (
                        <img
                            key={index}
                            src={order.note >= index + 1 ? FullyStar : StarOutlined }
                            className="star-image"
                        />
                    ))}
                </div>
                <div>
                    <div className='order-info'>Setor: {order.sector}</div>
                    <div className='order-info'>Inicio: {order.timeStart}</div>
                </div>
                <img src={Arrow} className='order-arrow'/>
                <div className='order-user-container'>
                    <FaUserCircle size={40} color='black'/>
                    <div className='order-users-info'>
                        <p className='card-user-names'>{order.technician.name}</p>
                        <p className='card-users-info'>{'#'+order.technician.id+' - '+order.technician.role}</p>
                    </div>
                </div>
            </div>
            <hr className="division-line"/>
            <div className="order-problem-card">
                <p className="order-problem-title">{order.problem.title}</p>
                <div className="order-problem-tags">
                    <div className="order-problem-category">{order.problem.category}</div>
                    <div className="problem-difficulty">{order.problem.difficulty}</div>
                </div>
            </div>
            <p className="order-problem-description">{order.problem.description}</p>
        </div>
    </button>
);

export const SpecialistDemands: React.FC = () => {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const openPopup = (order: Order) => {
        setSelectedOrder(order);
    };

    const closePopup = () => {
        setSelectedOrder(null);
    };

    return (
        <Page>
            <Path>Home</Path>
            <Title>Solicitações</Title>
            <div className="head-container">
                <div className='filter-order-specialist'>Filtros</div>
            </div>
            <OrdersListContainer>
                {exampleOrder.map((order, index) => (
                    <OrderCard key={index} order={order} onClick={() => openPopup(order)} />
                ))}
            </OrdersListContainer>
            {selectedOrder && (
                <BackgroundModal>
                    <ModalStyle>
                        <h2>Detalhes da Ordem de Serviço</h2>
                        <p>Descrição: {selectedOrder.problem.description}</p>
                        <p>Status: {selectedOrder.status}</p>
                        <label htmlFor="status">Status:</label>
                        <select name="Status" id="status">
                            <option value="open">Em aberto</option>
                            <option value="selected">Em andamento</option>
                            <option value="closed">Resolvido</option>
                        </select>


                        <button onClick={closePopup}>Fechar</button>
                    </ModalStyle>
                </BackgroundModal>
            )}
        </Page>
    );
};
