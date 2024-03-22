// Styles of the page
import '../ProblemNotFound/styles.css';

// Use Case of http request
import { CreateOrder } from "../../../services/useCases/Orders/CreateOrder"

// Styled Components
import { Page, Path, Title } from '../../../components/GlobalComponents.style';

// Assets
import StarOutlined from '../../../assets/icons/StarOutlined.svg'
import FullyStar from '../../../assets/icons/FullyStar.svg'

// React
import { useLocation, useNavigate } from 'react-router-dom';
import { FormEvent, useRef, useState } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RatingModal from '../../../components/Modals/RatingModal';
import { user } from "../../Login/Login"
import Problem from '../../../domain/entities/Problem';
import { FindProblem } from '../../../services/useCases/Problems/FindProblem';
import { Order } from '@prisma/client';

export function CreateOrderFromProblem() {

    //Input Refs to Create Order
    const [category, setCategory] = useState<string>("default")
    const [priority, setPriority] = useState<string>("default")
    const [status, setStatus] = useState<string>("default")
    const descriptionRef = useRef<HTMLTextAreaElement>(null)
    const sectorRef = useRef<HTMLInputElement>(null)

    const [openRating, setOpenRating] = useState<boolean>(false)
    const [stars, setStars] = useState([false, false, false, false, false]);

    //Navigate to the previus page
    const navigate = useNavigate();
    const location = useLocation();
    const { problem } = location.state;

    const handleCancel = () => {
        navigate('/supervisor/home');
    };

    function isOrder(obj: any): obj is Order {
        return obj && typeof obj === 'object'
    }

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
        if (!sectorRef.current?.value || priority === "default" ||
            status === "default") {
            notifyError()
            return
        }
        else {
            setOpenRating(true)
        }
    }

    const countingStars = () => {
        return stars.filter(star => star).length;
    }

    const handleRegisterOrderNotFound = async () => {

        if (!sectorRef.current?.value)
            return

        // Order info
        const sector = sectorRef.current?.value
        const description = descriptionRef.current?.value || "";
        const status = "pendente"
        const rating = countingStars()
        let res: boolean = false

        try {
            const findProblem = new FindProblem()
            const titleProblem = problem.title
            const findRes = await findProblem.execute({ title: titleProblem })
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
            <Path>Home / Gerar Ocorrência</Path>
            <Title>Gerar Ocorrência</Title>

            <div className='create-order-container'>
                <div className='create-order-header'>
                    Dados da Ocorrência
                </div>

                <div className="create-order-content">
                    <div className="input-header">
                        <div className="problem-input-container">
                            <p className="label">Problema</p>
                            <input className="problem-input disabled" value={problem.title} disabled={true} />
                        </div>

                        <div className="select-container">
                            <p className="label">Categoria</p>
                            <input className='select disabled' value={problem.category} disabled={true} />
                        </div>

                        <div className="select-container">
                            <p className="label">Setor</p>
                            <input className='select' ref={sectorRef} />
                        </div>
                    </div>

                    <div className="description-container">
                        <p className="label">Descrição (Opcional)</p>
                        <textarea className="description-textarea" ref={descriptionRef} />
                    </div>

                    <div className="input-footer">

                        <div className="problem-input-container">
                            <p className="label">Status</p>
                            <select className='select' value={status} onChange={e => setStatus(e.target.value)}>
                                <option value="default"></option>
                                <option value="pendente">Pendente</option>
                                <option value="concluída">Concluída</option>
                            </select>
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
                    <button className="btn-save" onClick={() => handleRegisterOrderNotFound()}>
                        Salvar
                    </button>
                </div>
            </RatingModal>
        </Page>
    )
}