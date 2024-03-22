import { FormEvent, useState } from 'react';
import { Page, Path, Title } from '../../../../components/GlobalComponents.style'
import './styles.css'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CreateUser } from '../../../../services/useCases/User/CreateUser';
import { FaUserCircle } from 'react-icons/fa';

export function RegisterSupervisor() {
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
                <p className='addSupervisor-title'>Cadastro de Supervisor</p>
            </div>

            <div className='addSupervisor-body'>
                <FaUserCircle size={100}/>
                <div className='addSupervisor-info-container'>

                    <div className='addSupervisor-field'>
                        <p className='addSupervisor-label'>Nome completo</p>
                        <input className='addSupervisor-name' type='text' onChange={(e) => setName(e.target.value)}></input>
                    </div>

                    <div className='addSupervisor-field' style={{paddingTop:"24px"}}>
                        <p className='addSupervisor-label'>Matrícula</p>
                        <input className='addSupervisor-registration' type='text' onChange={(e) => setRegistration(e.target.value)}></input>
                    </div>
            
                </div>

            </div>

            <div className="btn-bar">
                <button className="btn-cancel" onClick={handleBack}>
                    Cancelar
                </button>
                <button className="btn-save" onClick={handleChange}>
                    Cadastrar
                </button>
            </div>
        </Page>
    )
}