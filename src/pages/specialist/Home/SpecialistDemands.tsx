import React, { useEffect, useState } from 'react'
import { Page, Path, Title } from '../../../components/GlobalComponents.style'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import FullyStar from '../../../assets/icons/FullyStar.svg'
import StarOutlined from '../../../assets/icons/StarOutlined.svg'
import Arrow from '../../../assets/icons/OrderArrow.svg'
import './styles.css'
import {FaUserCircle} from "react-icons/fa";

// Temporary Example
import {Order, ex1} from '../../../domain/entities/example'


const exampleOrder = [ex1, ex1, ex1, ex1, ex1]

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

            {/*Order Info*/}
            <div className="cardHead">
                {/*Supervisor*/}
                <div className='order-user-container'>
                    <FaUserCircle size={40} color='black'/>
                    <div className='order-users-info'>
                        <p className='card-user-names'>{item.supervisor.name}</p>
                        <p className='card-users-info'>{'#'+item.supervisor.id+' - '+item.supervisor.role}</p>
                    </div>
                </div>

                {/*Stars*/}
                <div className='order-evaluation-container'>
                    {Array.from({ length: 5 }, (_, index) => (
                        <img
                            key={index}
                            src={item.note >= index + 1 ? FullyStar : StarOutlined }
                            className="star-image"
                        />
                    ))}
                </div>

                {/*Local and Time*/}
                <div>
                    <div className='order-info'>Setor: {item.sector}</div>
                    <div className='order-info'>Inicio: {item.timeStart}</div>
                </div>

                <img src={Arrow} className='order-arrow'/>

                {/*Technician*/}
                <div className='order-user-container'>
                    <FaUserCircle size={40} color='black'/>
                    <div className='order-users-info'>
                        <p className='card-user-names'>{item.technician.name}</p>
                        <p className='card-users-info'>{'#'+item.technician.id+' - '+item.technician.role}</p>
                    </div>
                </div>
            </div>

            <hr className="division-line"/>

            {/*Problem*/}
            <div className="order-problem-card">
                <p className="order-problem-title">{item.problem.title}</p>
                <div className="order-problem-tags">
                    <div className="order-problem-category">{item.problem.category}</div>
                    <div className="problem-difficulty">{item.problem.difficulty}</div>
                </div>
            </div>
            <p className="order-problem-description">{item.problem.description}</p>
        </div>

    </div>
)

const OrdersList: React.FC<{ orders: Order[] }> = ({ orders }) => (
    <div className="ordersList">
        <ul>{orders.map(renderOrderCard)}</ul>
    </div>
);


export const SpecialistDemands: React.FC = () => {

    const [orders, setProblems] = useState<Order[]>(
        exampleOrder
    );

    const [search, setSearch] = useState<string>('');

    const totalItems = orders.length;
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
            <Path>Home</Path>
            <Title>Solicitações</Title>

            {/*Date calendar*/}
            <div className="head-container">
                <h4>Filtros</h4>
            </div>

            <OrdersList orders={orders} />
        </Page>
    );
};
