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
import { CreateProblem } from '../../../services/useCases/Problems/CreateProblem';

export function ProblemNotFound() {

    //Input Refs to Create Order
    const [category, setCategory] = useState<string>("default")
    const [priority, setPriority] = useState<string>("default")
    const [difficulty, setDifficulty] = useState<string>("default")

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

    const countingStars = () => {
        return stars.filter(star => star).length;
    }      

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
        if (!sectorRef.current?.value || priority==="default" || category === "default"){
            notifyError()
            return
        }
        else{
            setOpenRating(true)
        }
    }

    const handleRegisterOrderNotFound = async (event: FormEvent) => {
            event.preventDefault();

            if (!descriptionRef.current?.value || !sectorRef.current?.value)
                return

            const sector = sectorRef.current?.value
            const description = descriptionRef.current?.value
            const status = "pendente"
            const rating = countingStars()

            // Creating the problem if it doesn't exist
            const createProblem = new CreateProblem()
            const title = "Problema não encontrado"
            const descriptionProblem = "Problema não registrado no sistema"

            const createProblemRes = await createProblem.execute({title, description : descriptionProblem, difficulty, category})
                


            try {
                const createOrder = new CreateOrder()
                //await createOrder.execute({ description, status, sector, rating, priority, userId, problemId })
                
            } catch (err) {
                console.error(err);
            }
    
            handleCancel();
    }

    return (
        <Page>
            <ToastContainer/>
            <Path>Home / Problema não encontrado</Path>
            <Title>Problema Não Encontrado</Title>
            
                <div className='create-order-container'>
                    <div className='create-order-header'>
                        Dados da Ocorrência
                    </div>

                    <div className="create-order-content">
                        <div className='containers-info'>
                            <p className='label-container'>Dados do Problema</p>

                            <div className="input-header-problem-not-found">

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
                                    
                                    <p className="label">Dificuldade</p> 

                                    <select className="select" value={difficulty} onChange={e => setDifficulty(e.target.value)}>
                                        <option value="default"></option>
                                        <option value="fácil">Fácil</option>
                                        <option value="médio">Médio</option>
                                        <option value="difícil">Difícil</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className='containers-info'>
                            <p className='label-container'>Dados da Ocorrência</p>

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

                                <div className="select-container">
                                    <p className="label">Setor</p>
                                    <input className='select' ref={sectorRef}/>
                                </div>

                            </div>

                            <div className="description-container-order">
                                <p className="label">Descrição (Opcional)</p>
                                <textarea className="description-textarea-order" ref={descriptionRef}/>
                            </div>
                        
                        </div>

                    </div>

                    <p style={{fontSize:"12px", fontWeight:"600"}}>*Prioridade alta: parada na linha</p>

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
                            <button className="btn-save" onClick={() => handleRegisterOrderNotFound}>
                                    Salvar
                            </button>
                        </div>
                </RatingModal>
        </Page>
    )
}