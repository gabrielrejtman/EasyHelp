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
    const [error, setError] = useState<string>('Preencha todos os campos!')
    const notifyError = () => {
                            toast.error(error, {
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
    const createCategoryRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    const handleCancel = () => {
        navigate('/adm/problems');
    };

    const handleProblemRegister = async (event: FormEvent) => {
        event.preventDefault();

        if (!problemRef.current?.value || !descriptionRef.current?.value 
            || difficulty==="default" || category === "default"){
                setError('Preencha todos os campos!')
                notifyError()
                return
        }
        else if(category === "outro" && !createCategoryRef.current?.value){
            setError('Crie uma categoria nova!')
            notifyError()
            return
        }

        else{
            try {
                const createProblem = new CreateProblem()
                const title = problemRef.current?.value
                const description = descriptionRef.current?.value
                let newCategory = category
                
                if(category==='outro' && createCategoryRef.current?.value){
                    newCategory = createCategoryRef.current?.value
                }
    
                const res = await createProblem.execute({title, description, difficulty, category:newCategory})
                if(res==="Problem already exists"){
                    setError('Já existe um problema com esse nome!')
                    notifyError()
                }
                else
                    notifySuccess()
            } catch (err) {
                console.error(err);
            }
            return
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
                    <form id="register-problem-form" onSubmit={handleProblemRegister}>
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
                                    <option value="outro">Outro</option>
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

                            <div className="select-container">
                                <p className="label">Nova Categoria (Opcional)</p>
                                <input className='select' ref={createCategoryRef}/>
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

                <p style={{fontSize:"12px", fontWeight:"600"}}>*Caso selecionar "Outro" em Categoria, o campo "Nova Categoria" se torna obrigatório</p>

                <div className="btn-bar">
                    <button className="btn-cancel" onClick={handleCancel}>
                        Cancelar
                    </button>
                    <button className="btn-save" type="submit" form="register-problem-form">
                        Salvar
                    </button>
                </div>
            </div>

        </Page>
    );
}

