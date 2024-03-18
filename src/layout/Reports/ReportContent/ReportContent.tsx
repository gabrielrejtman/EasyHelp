import React from "react";
import './styles.css'
import {LineChart} from "./Charts/LineChart.tsx";
import {VerticalBarReport} from "./Charts/VerticalBarReport.tsx";
import {HorizontalBarReport} from "./Charts/HorizontalBarReport.tsx";
import {CategoryPerSector} from "./Charts/CategoryPerSector.tsx";


interface ReportData{
}
interface ReportContentProps{
    ReportData: ReportData
}

export const ReportContent: React.FC<ReportContentProps> = ({}) =>{
    function formatDate(date: Date): string {
        const day: string = String(date.getDate()).padStart(2, '0');
        const month: string = String(date.getMonth() + 1).padStart(2, '0');
        const year: number = date.getFullYear();

        return `${day}/${month}/${year}`;
    }
    function concatenatedString(list: string[]) {
        let result = ''
        for (let i = 0; i < list.length; i++) {
            result += categories[i];
            if (i < categories.length - 2) {
                result += ', ';
            }
            else if(i == categories.length - 2){
                result += ' e '
            }
        }
        return result
    }
    const startDate = new Date('2024-03-01');
    const endDate = new Date('2024-03-30');
    const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24);

    const hoursPerDay = Array.from({ length: 30 }, () => Math.floor(Math.random() * 24));
    const totalHours = hoursPerDay.reduce((i, e) => i + e, 0)

    const sectors = ['s1','s2', 's3','s4', 's5','s6', 's7','s8']
    const ordersPerSector = [56, 46, 38, 22, 15, 9, 8, 4]
    const totalOrders = ordersPerSector.reduce((i, e) => i + e, 0)

    const categories = ['eletrico','sistema', 'mecanico', 'eletronico']
    const problemsPerCategory = [80, 60, 30, 10]
    const frequencies = [
        [1, 20, 30, 40],
        [15, 25, 35, 45],
        [12, 22, 32, 42],
        [18, 28, 38, 48],
        [16, 26, 36, 46],
        [14, 24, 34, 44],
        [11, 21, 31, 41],
        [17, 27, 37, 47]
    ];

    return (
        <div className='report-content'>

            <div className='report-title'>
                Relatório De Problemas {formatDate(startDate)} - {formatDate(endDate)}
            </div>

            <div className='full-container-chart'>
                <div className='chart-title'>
                    Total de horas paradas por dia</div>
                <LineChart startDate={startDate} endDate={endDate} hoursPerDay={hoursPerDay} height={120}/>

                <div className='chart-description'>
                    Durante esse periodo, tivemos um total de {totalHours} horas paradas, devido
                    a problemas graves nas linhas de produção, o grafico a cima aponta a quantidade
                    de horas perdidas por dia, considerando todos os setores. Informando uma média
                    de aproximadamente {(totalHours/totalDays).toFixed(0)} horas paradas por dia.
                </div>
            </div>


            <div className='full-container-chart'>
                <div className='chart-title'>
                    Total de problemas por setor</div>
                <VerticalBarReport labels={sectors} data={ordersPerSector}/>
                <div className='chart-description'>
                    Durante esse periodo, tivemos um total de {totalOrders} problemas registrados, em todos os setores,
                    o grafico a cima aponta em ordem decrescente, os setores com maior frequencia de problemas. Tivemos
                    uma média de aproximadamente {(totalOrders/sectors.length).toFixed(0)} problemas
                    por setor.
                </div>
            </div>

            <div className='space-between-pages'/>

            <div className='full-container-chart'>
                <div className='chart-title'>Categorias mais frequentes</div>
                <div className='half-container-chart'>
                    <div className='categories'>
                        <HorizontalBarReport data={problemsPerCategory} labels={categories} width={600} height={350}/>
                    </div>
                    <div className='chart-description-half'>
                       As catrgotias de problema durante esse periodo se dividem em: {concatenatedString(categories)},
                       o grafico a esquerda indica a frequencia total de ocorrencias por categoria.
                    </div>
                </div>
            </div>

            <div className='full-container-chart'>
                <div className='chart-title'>
                    Categorias por setor</div>
                <div>
                    <div className='categories-per-sector-chart'>
                        <CategoryPerSector categories={categories} sectors={sectors} frequencies={frequencies}/>
                    </div>
                </div>
                <div className='chart-description'>
                    Este gráfico de barras verticais mostra a distribuição da frequência de problemas por
                    categoria em cada setor da linha de produção. Cada barra representa um setor específico,
                    enquanto as diferentes cores das barras indicam as diferentes categorias de problemas.
                    A altura de cada barra representa a frequência com que cada categoria de problema ocorre
                    em um determinado setor.
                </div>

            </div>
        </div>
    )
}
