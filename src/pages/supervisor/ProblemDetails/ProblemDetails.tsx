import { Page, Path, TagFilter, Title } from '../../../components/GlobalComponents.style';
import { useNavigate } from 'react-router-dom';
import {handleColorDificult} from "../../../utils/ColorAdapter.ts";
import img from "../../../assets/ImgExemple.png"
import './styles.css'

export function ProblemDetails() {
    const problem = {title:"A máquina não funciona", 
                    description:"Lorem ipsum dolor sit amet. Vel assumenda voluptas ut amet placeat aut reprehenderit galisum ea libero dolorem et quam sint. Et sunt dolore sed mollitia dolore et quasi dolore quo omnis quae. Et perspiciatis neque ut deleniti nulla est fugiat exercitationem ut doloremque voluptate hic aliquid cumque qui praesentium ",
                    category:"elétrico", difficulty:"fácil"}

    const navigate = useNavigate();

    const handleCancel = () => {
        navigate('/supervisor/home');
    };

    return (
        <Page>
            <div className='page'>
                <Path>Home / Problema</Path>
                <Title>Problema</Title>

                <div className='problem-details-container'>
                    <div className='problem-details-header'>
                        <p className='problem-title'>{problem.title}</p>
                        <div className='problemTags'>
                                <TagFilter color={'#02AA8B'}>{problem.category}</TagFilter>
                                <TagFilter color={handleColorDificult(problem.difficulty)}>{problem.difficulty}</TagFilter>
                        </div>
                    </div>

                    <div className="problem-details-description-container">
                            <p className="problem-details-description-content">{problem.description}</p>

                            <img src={img} className='problem-img'/>

                    </div>

                    <div className="btn-bar">
                        <button className="btn-cancel" onClick={handleCancel}>
                            Voltar
                        </button>
                        <button className="btn-save" type="submit" form="register-order-not-found">
                                Gerar Ocorrência
                        </button>
                    </div>
                    
                </div>
            </div>
        </Page>
    )
}
