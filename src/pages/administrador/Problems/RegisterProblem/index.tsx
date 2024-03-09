import { useRef, FormEvent, useState } from 'react';
import './styles.css';
import { Page, Path, Title } from '../../../../components/GlobalComponents.style';
import { useNavigate } from 'react-router-dom';
import { ICreateProblem } from '../../../../domain/usecases/Problem/CreateProblemUseCase';
import { CreateProblem } from '../../../../services/useCases/Problems/CreateProblem';

export function RegisterProblems() {
    const [problems, setProblems] = useState<ICreateProblem[]>([]);
    
    const problemRef = useRef<HTMLInputElement>(null);
    const categoryRef = useRef<HTMLInputElement>(null);
    const difficultyRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);

    const navigate = useNavigate();

    const handleCancel = () => {
        navigate('/adm/problems');
    };

    const handleProblemRegister = async (event: FormEvent) => {
        event.preventDefault();

        if (!problemRef.current?.value || !descriptionRef.current?.value 
            || !difficultyRef.current?.value || !categoryRef.current?.value) return;

        try {
            const createProblem = new CreateProblem()
            const title = problemRef.current?.value
            const description = descriptionRef.current?.value
            const difficulty = difficultyRef.current?.value
            const category = categoryRef.current?.value

            const response  = createProblem.execute({title, description, difficulty, category})
            console.log(response)
        } catch (err) {
            console.error(err);
        }

        handleCancel();
    };

    return (
        <Page>
            <Path>Home</Path>
            <Title>Cadastro de problemas e soluções</Title>

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
                                <input type="text" ref={categoryRef}/>
                                {/* <select className="select" ref={categoryRef}>
                                    <option value="default">Nenhum</option>
                                    <option value="elétrico">Elétrico</option>
                                    <option value="mecânico">Mecânico</option>
                                    <option value="eletrônico">Eletrônico</option>
                                    <option value="sistema">Sistema</option>
                                </select> */}
                            </div>

                            <div className="select-container">
                                <p className="label">Dificuldade</p>
                                <input ref={difficultyRef}/>
                                {/* <select className="select" ref={difficultyRef}>
                                    <option value="default">Nenhum</option>
                                    <option value="fácil">Fácil</option>
                                    <option value="médio">Médio</option>
                                    <option value="difícil">Difícil</option>
                                </select> */}
                            </div>
                        </div>

                        <div className="description-container">
                            <p className="label">Descrição</p>
                            <textarea className="description-textarea" ref={descriptionRef} />
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
    )
}
