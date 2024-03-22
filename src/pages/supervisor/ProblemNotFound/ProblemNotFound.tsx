// Styles of the page
import './styles.css';

// Use Case of http request
import { CreateOrder } from "../../../services/useCases/Orders/CreateOrder"

// Styled Components
import { Page, Path, Title } from '../../../components/GlobalComponents.style';

// Assets
import StarOutlined from '../../../assets/icons/StarOutlined.svg'
import FullyStar from '../../../assets/icons/FullyStar.svg'

// React
import { useNavigate } from 'react-router-dom';
import { FormEvent, useRef, useState } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RatingModal from '../../../components/Modals/RatingModal';
import { CreateProblem } from '../../../services/useCases/Problems/CreateProblem';
import { FindProblem } from '../../../services/useCases/Problems/FindProblem';
import Problem from '../../../domain/entities/Problem';
import { user } from "../../Login/Login"
import { Order } from '@prisma/client';

export function ProblemNotFound() {

    //Input Refs to Create Order
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

    const countingStars = () => {
        return stars.filter(star => star).length;
    }

    function isOrder(obj: any): obj is Order {
        return obj && typeof obj === 'object'
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
        if (!sectorRef.current?.value || priority === "default") {
            notifyError()
            return
        }
        else {
            setOpenRating(true)
        }
    }

    const handleRegisterOrderNotFound = async () => {

        if (!sectorRef.current?.value)
            return

        // Order info
        const sector = sectorRef.current?.value
        const description = descriptionRef.current?.value || "";
        const status = "pendente"
        const rating = countingStars()

        // Creating "problem not found" if it doesn't exist
        const createProblem = new CreateProblem()
        const title = "Problema não encontrado"
        const descriptionProblem = "Problema não registrado no sistema"
        const difficulty = "não encontrado"
        const category = "outro"

        let res: boolean = false

        try {
            const createProblemRes = await createProblem.execute({ title, description: descriptionProblem, difficulty, category })

            const findProblem = new FindProblem()

            const findRes = await findProblem.execute({ title })
            const createOrder = new CreateOrder()

            if (findRes != undefined && user != undefined) {
                if (typeof findRes.id === 'string' && typeof user.id === 'string') {
                    const response = await createOrder.execute({ description, status, sector, rating, priority, supervisorId: user.id, problemId: findRes.id })
                    res = true
                }
            }

        } catch (err) {
            console.error(err);
        }
        if (res)
            handleCancel();
    }

    return (
        <Page>
            <ToastContainer />
            <Path>Home / Problema não encontrado</Path>
            <Title>Problema Não Encontrado</Title>

            <div className='create-order-container'>
                <div className='create-order-header'>
                    Dados da Ocorrência
                </div>

                <div className="create-order-content">
                    <div className="input-header-problem-not-found">

                        <div className="problem-input-container">
                            <p className="label">Problema</p>
                            <input className="problem-input disabled" value="Problema não encontrado" disabled={true} />
                        </div>

                        <div className="select-container">
                            <p className="label">Categoria</p>
                            <input className='select disabled' value="outro" disabled={true} />
                        </div>

                        <div className="select-container">

                            <p className="label">Dificuldade</p>
                            <input className='select disabled' value="não encontrado" disabled={true} />

                        </div>
                    </div>

                    <div className="input-footer">

                        <div className="problem-input-container">
                            <p className="label">Status</p>
                            <input className='select disabled' value="pendente" disabled={true} />
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
                            <input className='select' ref={sectorRef} />
                        </div>

                    </div>

                    <div className="description-container-order">
                        <p className="label">Descrição (Opcional)</p>
                        <textarea className="description-textarea-order" ref={descriptionRef} />
                    </div>

                </div>

                <p style={{ fontSize: "12px", fontWeight: "600" }}>*Prioridade alta: parada na linha</p>

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
                    <button className="btn-save" onClick={() => handleRegisterOrderNotFound()}>
                        Salvar
                    </button>
                </div>
            </RatingModal>
        </Page>
    )
}