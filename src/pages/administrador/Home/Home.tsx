import React from "react";
import { BsFiletypePdf } from "react-icons/bs";
import { Page, Path, Title } from '../../../components/GlobalComponents.style';
import './styles.css';


import {PieChart} from "../../../layout/Dashboard/PieChart.tsx";
import {HorizontalBarChart} from "../../../layout/Dashboard/HorizontalChart.tsx";
import {VerticalBarChart} from "../../../layout/Dashboard/VerticalChart.tsx"

import {ReportReview} from "../Reports/ReportLayout/ReportReview.tsx";

interface ButtonCreatePDFProps {
    children: React.ReactElement
}

const ButtonCreatePDF: React.FC<ButtonCreatePDFProps> = ({ children }) => {
    const handleReportReview = () => {
        window.open('/report-review');
    };

    return (
        <div>
            <button className='button-create-pdf' onClick={handleReportReview}>
                <div className='button-create-pdf-content'>
                    <BsFiletypePdf size={21}/>
                    <div className='button-create-pdf-text'>Gerar Relatório</div>
                </div>
            </button>
        </div>
    );
};


const Home: React.FC = () => {

    return (
        <Page>
            <Path>Home</Path>
            <div className='title-container'>
                <Title>Dashboards</Title>
                <ButtonCreatePDF>
                    <ReportReview />
                </ButtonCreatePDF>
            </div>

            <div className='data-container'>
                <div className='data-text'>Data início</div>
                <input className='data-input'></input>
                <div className='data-text'>Data fim</div>
                <input className='data-input'></input>
            </div>




            <div className='dashboard-grid'>

                <div className='dashboard-item'>

                    <div className='dashboard-head'>
                        <div className='dashboard-item-title'>Ocorrências mais registradas</div>

                    </div>


                    <HorizontalBarChart
                        labels={['Maquina não liga', 'Rolamento de...', 'a1a1a1', 'a2a2a2']}
                        data={[30, 10, 20, 12]}
                        />
                </div>

                <div className='dashboard-item'>
                    <div className='dashboard-head'>
                        <div className='dashboard-item-title'>Problemas mais frequente</div>
                    </div>
                    <PieChart
                        frequency={[4, 32]}
                        mostCommonCategory={'elétrico'}
                        />
                </div>

                <div className='dashboard-item'>
                    <div className='dashboard-head'>
                        <div className='dashboard-item-title'>Setores com mais problemas</div>
                    </div>
                    <VerticalBarChart
                        labels={['setor 1', 'setor 2', 'setor 3', 'setor 4']}
                        data={[30, 10, 20, 12]} />

                </div>

                <div className='dashboard-item'>
                    <div className='dashboard-head'>
                        <div className='dashboard-item-title'>Avaliações</div>
                    </div>
                </div>

            </div>
        </Page>
    );
};

export default Home;