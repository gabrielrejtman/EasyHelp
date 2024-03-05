import React, { useRef, FormEvent } from 'react';
import './styles.css';
import { Page, Path, Title } from '../../../components/GlobalComponents.style';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegisterProblems() {
    const problemRef = useRef<HTMLInputElement>(null);
    const categoryRef = useRef<HTMLSelectElement>(null);
    const dificultRef = useRef<HTMLSelectElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);

    const navigate = useNavigate();

    const handleCancel = () => {
        navigate('/problems');
    };

    const handleProblemRegister = async (event: FormEvent) => {
        event.preventDefault();

        if (!problemRef.current?.value || !descriptionRef.current?.value) return;

        try {
            const response = await axios.post('http://localhost:3300/cadastrar_problema', {
                titulo: problemRef.current?.value,
                descricao: descriptionRef.current?.value,
                dificuldade: dificultRef.current?.value,
                categoria: categoryRef.current?.value,
            });
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
                                <select className="select" ref={categoryRef}>
                                    <option value="elétrico">Elétrico</option>
                                    <option value="mecânico">Mecânico</option>
                                    <option value="eletrônico">Eletrônico</option>
                                    <option value="sistema">Sistema</option>
                                </select>
                            </div>

                            <div className="select-container">
                                <p className="label">Dificuldade</p>
                                <select className="select" ref={dificultRef}>
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

export default RegisterProblems;
