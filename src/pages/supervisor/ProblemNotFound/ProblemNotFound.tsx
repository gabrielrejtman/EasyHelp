import './styles.css';
import { Page, Path, Title } from '../../../components/GlobalComponents.style';

import { useNavigate } from 'react-router-dom';

export function ProblemNotFound() {

    const navigate = useNavigate();

    const handleCancel = () => {
        navigate('/supervisor/home');
    };

    return (
        <Page>
            <Path>Home / Problema não encontrado</Path>
            <Title>Problema Não Encontrado</Title>

            <div className='create-order-container'>
                <div className='create-order-header'>
                    Dados da Ocorrência
                </div>

                <div className="create-order-content">
                    <form id="register-order-not-found">
                        <div className="input-header">
                            <div className="problem-input-container">
                                <p className="label">Problema</p>
                                <input className="problem-input disabled" value="Problema não encontrado" disabled={true}/>
                            </div>

                            <div className="select-container">
                                <p className="label">Categoria</p>
                                {/* <input type="text" ref={categoryRef}/> */}
                                <select className="select">
                                    <option value="default">Nenhum</option>
                                    <option value="elétrico">Elétrico</option>
                                    <option value="mecânico">Mecânico</option>
                                    <option value="eletrônico">Eletrônico</option>
                                    <option value="sistema">Sistema</option>
                                </select>
                            </div>

                            <div className="select-container">
                                <p className="label">Setor</p>
                                <input className='select'/>
                            </div>
                        </div>

                        <div className="description-container">
                            <p className="label">Descrição</p>
                            <textarea className="description-textarea"/>
                        </div>

                        <div className="input-footer">

                            <div className="problem-input-container">
                                <p className="label">Status</p>
                                <input className='select disabled' value="Pendente" disabled={true}/>
                            </div>

                            <div className="select-container">

                                <p className="label">Prioridade</p>

                                <select className="select">
                                    <option value="baixa">Baixa</option>
                                    <option value="média">Média</option>
                                    <option value="alta">Alta</option>
                                </select>

                            </div>

                        </div>
                    </form>

                </div>

                <div className="btn-bar">
                    <button className="btn-cancel" onClick={handleCancel}>
                        Cancelar
                    </button>
                    <button className="btn-save" type="submit" form="register-order-not-found">
                            Enviar
                    </button>
                </div>
                
            </div>
        </Page>
    )
}
