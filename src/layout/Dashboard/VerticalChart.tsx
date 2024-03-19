import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

interface VerticalBarChartProps {
    labels: string[];
    data: number[];
}

export const VerticalBarChart: React.FC<VerticalBarChartProps> = ({ labels, data}) => {
    const verticalBarChartRef = useRef<HTMLCanvasElement>(null);
    const [verticalBarChartInstance, setVerticalBarChartInstance] = useState<Chart | null>(null);

    useEffect(() => {
        let newVerticalBarChartInstance: Chart | undefined;
        if (verticalBarChartRef.current) {
            if (verticalBarChartInstance) {
                verticalBarChartInstance.destroy();
            }
            const ctx = verticalBarChartRef.current.getContext('2d');
            if (ctx) {
                newVerticalBarChartInstance = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels,
                        datasets: [{
                            data,
                            backgroundColor: Array(data.length).fill('#02AA8B'),
                            borderWidth: 0,
                            barThickness: 35
                        }]
                    },
                    options: {
                        indexAxis: 'x',
                        maintainAspectRatio: false,
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
                                left: 20,
                                right: 20,
                                top: 20,
                                bottom: 20
                            }
                        },
                        plugins: {
                            legend: {
                                display: false
                            }
                        }
                    }
                });
                setVerticalBarChartInstance(newVerticalBarChartInstance);
            }
        }

        return () => {
            if (newVerticalBarChartInstance) {
                newVerticalBarChartInstance.destroy();
            }
        };
    }, [labels, data]);

    return <canvas ref={verticalBarChartRef}></canvas>;
};