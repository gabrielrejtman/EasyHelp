import React, {useEffect, useState} from "react";
import { BsFiletypePdf } from "react-icons/bs";
import { Page, Path, Title } from '../../../components/GlobalComponents.style';
import './styles.css';


import {PieChart} from "../../../layout/Dashboard/PieChart.tsx";
import {HorizontalBarChart} from "../../../layout/Dashboard/HorizontalChart.tsx";
import {VerticalBarChart} from "../../../layout/Dashboard/VerticalChart.tsx"

import {ReportReview} from "../Reports/ReportLayout/ReportReview.tsx";

import { GetDashboardData, ResultType } from "../../../services/useCases/Report/GetDashboardData.ts";
import Problem from "../../../domain/entities/Problem.ts";
import { GiSummits } from "react-icons/gi";
import { sum } from "lodash";


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
    const [dashboardData, setProblems] = useState<ResultType>();

    useEffect(() => {
        loadDashboardData();
    }, []);

    const getDashboardData = new GetDashboardData();

    async function loadDashboardData() {
        try {
            const response = await getDashboardData.execute();
            setProblems(response);
        } catch (error) {
            console.error("Falha ao carregar problemas:", error);
        }
    }

   
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
                        labels={['a', 'a', 'a', 'a']}
                        data={[1,10,30,20]}
                        />
                </div>

                <div className='dashboard-item'>
                    <div className='dashboard-head'>
                        <div className='dashboard-item-title'>Problemas mais frequentes</div>
                    </div>
                    <PieChart
                        frequency={[12, 30]}
                        mostCommonCategory={"eletrico"}
                        />
                </div>

                <div className='dashboard-item'>
                    <div className='dashboard-head'>
                        <div className='dashboard-item-title'>Setores com mais problemas</div>
                    </div>
                    <VerticalBarChart
                        labels={['a', 'a', 'a', 'a']}
                        data={[1,10,30,20]} />

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