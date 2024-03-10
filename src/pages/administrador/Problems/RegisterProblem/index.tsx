import { useRef, FormEvent, useState } from 'react';
import './styles.css';
import { Page, Path, Title } from '../../../../components/GlobalComponents.style';
import { useNavigate } from 'react-router-dom';
import { CreateProblem } from '../../../../services/useCases/Problems/CreateProblem';
import { ToastContainer, toast, Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export function RegisterProblems() {
    const [category, setCategory] = useState<string>('default');
    const [difficulty, setDifficulty] = useState<string>('default');
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

    const notifySuccess = () => {
        toast.success("Problema cadastrado com sucesso!", {
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

    const problemRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);

    const navigate = useNavigate();

    const handleCancel = () => {
        navigate('/adm/problems');
    };

    const handleProblemRegister = async (event: FormEvent) => {
        event.preventDefault();

        if (!problemRef.current?.value || !descriptionRef.current?.value 
            || difficulty==="default" || category === "default"){
                notifyError()
                return
        }
        else{
            try {
                const createProblem = new CreateProblem()
                const title = problemRef.current?.value
                const description = descriptionRef.current?.value
    
                await createProblem.execute({title, description, difficulty, category})
                
                notifySuccess()
            } catch (err) {
                console.error(err);
            }
    
            //handleCancel();
        }
    };

    return (
        <Page>
            <ToastContainer/>

            <Path>Problemas / Novo Cadastro</Path>
            <Title>Cadastro de problemas</Title>

            <div className="problem-container">
                <div className="problem-header">Problema</div>

                <div className="problem-content">
                    <form id="register-problem" onSubmit={handleProblemRegister}>
                        <div className="input-header">
                            <div className="problem-input-container">
                                <p className="label">Problema</p>
                                <input className="problem-input" ref={problemRef} />
                            </div>

                            <div className="select-container">
                                <p className="label">Categoria</p>
                                <select className="select" value={category} onChange={e => setCategory(e.target.value)}>
                                    <option value="default">Nenhum</option>
                                    <option value="elétrico">Elétrico</option>
                                    <option value="mecânico">Mecânico</option>
                                    <option value="eletrônico">Eletrônico</option>
                                    <option value="sistema">Sistema</option>
                                </select>
                            </div>

                            <div className="select-container">
                                <p className="label">Dificuldade</p>
                                <select className="select" value={difficulty} onChange={e => setDifficulty(e.target.value)}>
                                    <option value="default">Nenhum</option>
                                    <option value="fácil">Fácil</option>
                                    <option value="médio">Médio</option>
                                    <option value="difícil">Difícil</option>
                                </select>
                            </div>
                        </div>

                        <div className="description-container">
                            <p className="label">Descrição</p>
                            <textarea className="description-textarea" ref={descriptionRef} />
                        </div>

                        <div className="description-container">
                            <p className="label">Adicionar imagem ou vídeo</p>
                            <input type="file" />
                        </div>
                    </form>
                </div>

                <div className="btn-bar">
                    <button className="btn-cancel" onClick={handleCancel}>
                        Cancelar
                    </button>
                    <button className="btn-save" type="submit" form="register-problem">
                        Salvar
                    </button>
                </div>
            </div>

        </Page>
    );
}

