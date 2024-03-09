import './styles.css';
import { Page, Path, Title } from '../../../../components/GlobalComponents.style';



export function ProblemNotFound() {

    return (
        <Page>
            <Path>Home / Problema não encontrado</Path>
            <Title>Problema Não Encontrado</Title>

            <div className='create-order-container'>
                <div className='create-order-header'>
                    Dados da Ocorrência
                </div>

                <div className="create-order-content">
                    <form id="register-order">
                        <div className="create-order-fields-head">
                            <p className="label">Problema</p>
                        </div>


                    </form>
                </div>
            </div>
        </Page>
    )
}
