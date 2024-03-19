import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';


interface PieChartProps {
    frequency: number[]; // [ MostCommonFrequency, SumOfAllOthers ]
    mostCommonCategory: string;
}

export const PieChart: React.FC<PieChartProps> = ({ frequency, mostCommonCategory }) => {
    const pieChartRef = useRef<HTMLCanvasElement>(null);
    const [pieChartInstance, setPieChartInstance] = useState<Chart | null>(null);

    useEffect(() => {
        let newPieChartInstance: Chart;
        if (pieChartRef.current) {
            if (pieChartInstance) {
                pieChartInstance.destroy();
            }
            const ctx = pieChartRef.current.getContext('2d');
            if (ctx) {
                newPieChartInstance = new Chart (ctx, {
                    type: 'pie',
                    data: {
                        labels: [mostCommonCategory, 'Outros'],
                        datasets: [{
                            data: frequency,
                            backgroundColor: ['#02AA8B', '#cccccc'],
                            borderWidth: 0
                        }]
                    },
                    options: {
                        aspectRatio: 2

                    }
                });
                setPieChartInstance(newPieChartInstance);
            }
        }

        return () => {
            if (newPieChartInstance) {
                newPieChartInstance.destroy();
            }
        };
    }, [frequency, mostCommonCategory]);

    return <canvas ref={pieChartRef} ></canvas>;
};


