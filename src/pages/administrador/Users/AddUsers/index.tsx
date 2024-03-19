import toolsIcon from '../../../../assets/icons/Tools.svg'
import helmetIcon from '../../../../assets/icons/SafetyHat.svg'
import { useNavigate } from 'react-router-dom'
import { Page, Path, Title } from '../../../../components/GlobalComponents.style'
import './styles.css'

export function AddUsers() {
    const navigate = useNavigate();
    const handleAddSupervisor = () => {
        navigate('/adm/supervisor-register');
    };
    const handleAddSpecialist = () => {
        navigate('/adm/specialist-register');
    };


    return (
        <Page>
            <Path>Usuarios / Novo Cadastro</Path>
            <Title>Novo Cadastro</Title>

                <button className='addUsers-button' onClick={handleAddSpecialist}>
                    <div className='addUsers-content'>
                        <img src={toolsIcon} className='addUsers-icon-a'/>
                        <p>Técnico</p>
                    </div>
                </button>

                <button className='addUsers-button' onClick={handleAddSupervisor}>
                    <div className='addUsers-content'>
                        <img src={helmetIcon} className='addUsers-icon-b'/>
                        <p>Supervisor</p>
                    </div>
                </button>
        </Page>
    )
}

