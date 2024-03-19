import { Page, Path, TagFilter, Title } from '../../../components/GlobalComponents.style';
import { useNavigate } from 'react-router-dom';
import {handleColorDificult} from "../../../utils/ColorAdapter.ts";
import img from "../../../assets/ImgExemple.png"
import './styles.css'
import { useLocation } from 'react-router-dom';
import Problem from '../../../domain/entities/Problem.ts';

export function ProblemDetails() {
    const location = useLocation();
    const {problem} = location.state;
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate('/supervisor/home');
    };
    const handleCreateOrder = (problem : Problem) => {
        navigate('/supervisor/create-order', {state: {problem}});
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

                    </div>

                    <div className="btn-bar">
                        <button className="btn-cancel" onClick={handleCancel}>
                            Voltar
                        </button>
                        <button className="btn-save" type="submit" onClick={() => handleCreateOrder(problem)}>
                                Gerar Ocorrência
                        </button>
                    </div>
                    
                </div>
            </div>
        </Page>
    )
}