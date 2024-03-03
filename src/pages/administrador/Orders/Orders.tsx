import './styles.css';
import { useEffect, useState } from 'react';
import { Page, Path, Title } from '../../../components/GlobalComponents.style';
import { FaPencil, FaTrash } from 'react-icons/fa6';
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Button = styled.button`
  outline: none;
  margin-left: 20px;
  background-color: rgba(0, 0, 0, 0);
  border: solid rgba(0, 0, 0, 0);
  cursor: pointer;
`

function Orders() {
  let listaDeOcorrencias = []

  const [orders, setOrders] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function fetchData() {
      const response = await loadOrders();
    }
    fetchData();
  }, []);

  async function loadOrders() {
    try {
      const resp = await axios.get('http://localhost:3300/cadastrar_ocorrencia');
      listaDeOcorrencias = resp.data;
      setOrders(listaDeOcorrencias);
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }

  const limitItems = 10
  const totalItems = orders.length
  const [offset, setOffset] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  let navigate = useNavigate()

  const handleAddOrder = () => {
    navigate('/register_order')
  }

  return (
      <Page>
        <Path>Home</Path>
        <Title>Histórico de Ocorrências</Title>

        <div className="head-container">
          <div className="btn-pages">
            <BiSolidLeftArrow size={14} />
            <p className="pages-index">1-10 de {totalItems}</p>
            <BiSolidRightArrow size={14} />
          </div>
        </div>

        <div className="listaDeOcorrencias">
          <ul>
            {orders.map((item) => (
                <div className="card" key={item.id}>
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
                      <FaPencil size={24} />
                    </Button>
                    <Button>
                      <FaTrash size={24} />
                    </Button>
                  </div>
                </div>
            ))}
          </ul>
        </div>
      </Page>
  );
}

export default Orders;
