import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

interface LineChartProps {
    startDate: Date;
    endDate: Date;
    hoursPerDay: number[];
    width?: number;
    height?: number;
}

export const LineChart: React.FC<LineChartProps> = ({ startDate, endDate, hoursPerDay, width = 400, height = 300 }) => {
    const lineChartRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        let lineChartInstance: Chart | undefined;
        if (lineChartRef.current) {
            const ctx = lineChartRef.current.getContext('2d');
            if (ctx) {
                const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
                const dates = [];
                const data = [];

                for (let i = 0; i < days; i++) {
                    const currentDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
                    dates.push(currentDate.toLocaleDateString());
                    data.push(hoursPerDay[i] || 0);
                }

                lineChartInstance = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: dates,
                        datasets: [
                            {
                                label: 'Horas por Dia',
                                data: data,
                                fill: false,
                                borderColor: 'rgb(75, 192, 192)',
                                tension: 0.1
                            }
                        ]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }
        }

        return () => {
            if (lineChartInstance) {
                lineChartInstance.destroy();
            }
        };
    }, [startDate, endDate, hoursPerDay, width, height]);

    return <canvas ref={lineChartRef} width={width} height={height}></canvas>;
};
