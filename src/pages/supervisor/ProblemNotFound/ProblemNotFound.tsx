// Styles of the page
import './styles.css';

// Use Case of http request
import {CreateOrder} from "../../../services/useCases/Orders/CreateOrder"

// Styled Components
import { Page, Path, Title } from '../../../components/GlobalComponents.style';

// Assets
import StarOutlined from '../../../assets/icons/StarOutlined.svg'
import FullyStar from '../../../assets/icons/FullyStar.svg'

// React
import { useNavigate } from 'react-router-dom';
import { FormEvent, useRef, useState } from 'react';
import { ToastContainer, toast, Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RatingModal from '../../../components/Modals/RatingModal';

export function ProblemNotFound() {

    //Input Refs to Create Order
    const [category, setCategory] = useState<string>("default")
    const [priority, setPriority] = useState<string>("default")
    const descriptionRef = useRef<HTMLTextAreaElement>(null)
    const sectorRef = useRef<HTMLInputElement>(null)

    const [openRating, setOpenRating] = useState<boolean>(false)
    const [stars, setStars] = useState([false, false, false, false, false]);

    //Navigate to the previus page
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate('/supervisor/home');
    };

    const handleStarClicked = (index: number) => {
        const isLastFilledStarClicked = index === stars.lastIndexOf(true);
        if (isLastFilledStarClicked) {
            setStars(stars.map((_, i) => i < index));
        } else {
            setStars(stars.map((_, i) => i <= index));
        }
    };

    const notifyError = () => {
        toast.error("Preencha todos os campos!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
        }

    const handleModal = () => {
        if (!descriptionRef.current?.value || !sectorRef.current?.value || priority==="default" || category === "default"){
            notifyError()
            return
        }
        else{
            setOpenRating(true)
        }
    }

    const handleRegisterOrderNotFound = async (event: FormEvent) => {
            event.preventDefault();
            
            const sector = sectorRef.current?.value
            const description = descriptionRef.current?.value
            const status = "pendente"

            try {
                const createOrder = new CreateOrder()
                //await createOrder.execute({description, status, sector, rating, priority})
                
            } catch (err) {
                console.error(err);
            }
    
            //handleCancel();
    }

    return (
        <Page>
            <ToastContainer/>
            <Path>Home / Problema não encontrado</Path>
            <Title>Problema Não Encontrado</Title>
            
            <form id="register-order-not-found" onSubmit={handleRegisterOrderNotFound}>
                <div className='create-order-container'>
                    <div className='create-order-header'>
                        Dados da Ocorrência
                    </div>

                    <div className="create-order-content">
                            <div className="input-header">
                                <div className="problem-input-container">
                                    <p className="label">Problema</p>
                                    <input className="problem-input disabled" value="Problema não encontrado" disabled={true}/>
                                </div>

                                <div className="select-container">
                                    <p className="label">Categoria</p>
                                    <select className="select" value={category} onChange={e => setCategory(e.target.value)}>
                                        <option value="default"></option>
                                        <option value="elétrico">Elétrico</option>
                                        <option value="mecânico">Mecânico</option>
                                        <option value="eletrônico">Eletrônico</option>
                                        <option value="sistema">Sistema</option>
                                    </select>
                                </div>

                                <div className="select-container">
                                    <p className="label">Setor</p>
                                    <input className='select' ref={sectorRef}/>
                                </div>
                            </div>

                            <div className="description-container">
                                <p className="label">Descrição</p>
                                <textarea className="description-textarea" ref={descriptionRef}/>
                            </div>

                            <div className="input-footer">

                                <div className="problem-input-container">
                                    <p className="label">Status</p>
                                    <input className='select disabled' value="Pendente" disabled={true}/>
                                </div>

                                <div className="select-container">

                                    <p className="label">Prioridade</p>

                                    <select className="select" value={priority} onChange={e => setPriority(e.target.value)}>
                                        <option value="default"></option>
                                        <option value="baixa">Baixa</option>
                                        <option value="média">Média</option>
                                        <option value="alta">Alta</option>
                                    </select>

                                </div>

                            </div>

                    </div>

                    <div className="btn-bar">
                        <button className="btn-cancel" onClick={handleCancel}>
                            Cancelar
                        </button>
                        <button className="btn-save" onClick={handleModal}>
                                Enviar
                        </button>
                    </div>
                    
                </div>

                <RatingModal isOpen={openRating}>
                        <div className='evaluation-starts'>
                            {stars.map((filled, index) => (
                                <button key={index} className='btn-star' onClick={() => handleStarClicked(index)}>
                                    <img
                                        src={filled ? FullyStar : StarOutlined}
                                        alt={`Star ${index + 1}`}
                                        className="star-image"
                                    />
                                </button>
                            ))}
                        </div>

                        <div className="btn-bar">
                            <button className="btn-save" type="submit" form="register-order-not-found">
                                    Salvar
                            </button>
                        </div>
                </RatingModal>
            </form>
        </Page>
    )
}
