import { FormEvent, useState } from 'react';
import { Page, Path, Title } from '../../../../components/GlobalComponents.style'
import './styles.css'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CreateUser } from '../../../../services/useCases/User/CreateUser';

export function RegisterSupervisor() {
    const [name, setName] = useState('');
    const [registration, setRegistration] = useState('');
    const navigate = useNavigate();

    const handleChange = async (event:FormEvent) => {
        event.preventDefault();
        try {
            const createUser = new CreateUser();
            const role = "SUPERVISOR";
            await createUser.execute({name, registration, role});
            navigate("/adm/users");
            toast.success("Cadastro realizado com sucesso");
        } catch (err) {
            console.error(err);
            }
        };
    return (
        <Page>
            <Path>Usuários / Novo Cadastro</Path>
            <Title>Novo Cadastro de Supervisor</Title>
            <div className='addSupervisor-header'>
                <p className='addSupervisor-title'>Register Supervisor</p>
            </div>

            <div className='addSupervisor-body'>

                <div className='addSupervisor-field'>
                    <p>Nome completo</p>
                    <input className = "input-name" type='text' onChange={(e) => setName(e.target.value)}></input>
                </div>

                <div className='addSupervisor-field'>
                    <p>Matricula</p>
                    <input className = "input-registration-number" type='text' onChange={(e) => setRegistration(e.target.value)}></input>
                </div>

            </div>

            <p className='addSupervisor-note'>A senha padrão é a matrícula do
                supervisor, ela deve ser alterada pelo mesmo.</p>
            <button className='addSupervisor-cancel'>Cancelar</button>
            <button className='addSupervisor-register' onClick={handleChange}>Cadastrar</button>
        </Page>
    )
}