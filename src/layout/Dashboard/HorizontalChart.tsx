import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

interface HorizontalBarChartProps {
    labels: string[];
    data: number[];
    width?: number; // Adicionando a largura como uma propriedade opcional
    height?: number; // Adicionando a altura como uma propriedade opcional
}

export const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({ labels, data, width = 400, height = 300 }) => {
    const horizontalBarChartRef = useRef<HTMLCanvasElement>(null);
    const [horizontalBarChartInstance, setHorizontalBarChartInstance] = useState<Chart | null>(null);

    useEffect(() => {
        let newHorizontalBarChartInstance: Chart | undefined;
        if (horizontalBarChartRef.current) {
            if (horizontalBarChartInstance) {
                horizontalBarChartInstance.destroy();
            }
            const ctx = horizontalBarChartRef.current.getContext('2d');
            if (ctx) {
                newHorizontalBarChartInstance = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels,
                        datasets: [{
                            data,
                            backgroundColor: Array(data.length).fill('#02AA8B'),
                            borderWidth: 0,
                            barThickness: 32
                        }]
                    },
                    options: {
                        indexAxis: 'y',
                        maintainAspectRatio: false,
                        responsive: true, // Permitir responsividade
                        aspectRatio: width / height, // Definir a proporção largura/altura
                        scales: {
                            x: {
                                beginAtZero: true,
                                grid: {
                                    display: false
                                }
                            },
                            y: {
                                grid: {
                                    display: false
                                }
                            }
                        },
                        layout: {
                            padding: {
                                top: 20,
                                bottom: 10
                            }
                        },
                        plugins: {
                            legend: {
                                display: false
                            }
                        }
                    }
                });
                setHorizontalBarChartInstance(newHorizontalBarChartInstance);
            }
        }

        return () => {
            if (newHorizontalBarChartInstance) {
                newHorizontalBarChartInstance.destroy();
            }
        };
    }, [labels, data, width, height]);

    return <canvas ref={horizontalBarChartRef} width={width} height={height}></canvas>;
};
