import { Page, Path, Title } from '../../../../components/GlobalComponents.style';
import { CreateUser } from '../../../../services/useCases/User/CreateUser';
import './styles.css';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function RegisterSpecialist() {
    const [name, setName] = useState('');
    const [registration, setRegistration] = useState('');
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/adm/users");
    }

    const handleChange = async (event:FormEvent) => {
        event.preventDefault();
        try {
            const createUser = new CreateUser();
            const role = "SPECIALIST";
            await createUser.execute({name, registration, role});
            navigate("/adm/users");
        } catch (err) {
            console.error(err);
            }
        };

    return (
        <Page>
            <Path>Usuários / Novo Cadastro</Path>
            <Title>Novo Cadastro de Técnico</Title>
            <div className='addSupervisor-header'>
                <p className='addSupervisor-title'>Cadastro de Técnico</p>
            </div>

            <div className='addSupervisor-body'>

                <div className='addSupervisor-field'>
                    <p>Nome completo</p>
                    <input type='text' onChange={(e) => setName(e.target.value)}></input>
                </div>

                <div className='addSupervisor-field'>
                    <p>Matricula</p>
                    <input type='text' onChange={(e) => setRegistration(e.target.value)}></input>
                </div>
            </div>

            <p className='addSupervisor-note'>A senha padrão é a matrícula do
                supervisor, ela deve ser alterada pelo mesmo.</p>
            <button className='addSupervisor-cancel' onClick={handleBack}>Cancelar</button>
            <button className='addSupervisor-register' onClick={handleChange}>Cadastrar</button>
        </Page>
    )
}