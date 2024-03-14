import { Page, Path, TagFilter, Title } from '../../../components/GlobalComponents.style';
import { useNavigate } from 'react-router-dom';
import {handleColorDificult} from "../../../utils/ColorAdapter.ts";
import img from "../../../assets/ImgExemple.png"
import './styles.css'
import { useLocation } from 'react-router-dom';

export function ProblemDetails() {
    const location = useLocation();
    const { item } = location.state;
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate('/supervisor/home');
    };
    const handleCreateOrder = () => {
        navigate('/supervisor/problem-not-found');
    };

    return (
        <Page>
            <div className='page'>
                <Path>Home / Problema</Path>
                <Title>Problema</Title>

                <div className='problem-details-container'>
                    <div className='problem-details-header'>
                        <p className='problem-title'>{item.title}</p>
                        <div className='problemTags'>
                                <TagFilter color={'#02AA8B'}>{item.category}</TagFilter>
                                <TagFilter color={handleColorDificult(item.difficulty)}>{item.difficulty}</TagFilter>
                        </div>
                    </div>

                    <div className="problem-details-description-container">
                            <p className="problem-details-description-content">{item.description}</p>

                            <img src={img} className='problem-img'/>

                    </div>

                    <div className="btn-bar">
                        <button className="btn-cancel" onClick={handleCancel}>
                            Voltar
                        </button>
                        <button className="btn-save" type="submit" onClick={handleCreateOrder}>
                                Gerar Ocorrência
                        </button>
                    </div>
                    
                </div>
            </div>
        </Page>
    )
}
