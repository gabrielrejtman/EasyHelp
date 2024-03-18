import React from 'react';
import Chart from 'chart.js/auto';

interface VerticalBarChartProps {
    categories: string[];
    sectors: string[];
    frequencies: number[][];
}

export const CategoryPerSector: React.FC<VerticalBarChartProps> = ({ categories, sectors, frequencies }) => {
    const chartRef = React.useRef<HTMLCanvasElement>(null);
    const chartInstance = React.useRef<Chart | null>(null);

    React.useEffect(() => {
        if (chartRef.current && frequencies.length > 0) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                if (chartInstance.current) {
                    chartInstance.current.destroy();
                }

                chartInstance.current = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: sectors,
                        datasets: categories.map((category, index) => ({
                            label: category,
                            data: frequencies.map((frequency) => frequency[index]),
                            backgroundColor: getColorPalette(index),
                            borderWidth: 1,
                            barThickness: 32
                        }))
                    },
                    options: {
                        scales: {
                            x: {
                                stacked: true,
                            },
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [categories, sectors, frequencies]);

    return <canvas ref={chartRef}></canvas>;
};

// Função para gerar uma paleta de cores baseada no índice
const getColorPalette = (index: number): string => {
    const palette = ['#02AA8B', '#E6B333', '#3366E6', '#999966'];
    return palette[index % palette.length];
};
