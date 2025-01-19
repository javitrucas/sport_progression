import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ProgressChart = ({ data }) => {
  // Datos para el gráfico
  const chartData = {
    labels: data.map(item => item.date), // Fechas
    datasets: [
      {
        label: 'Puntuación',
        data: data.map(item => item.score), // Puntuaciones
        fill: false,
        backgroundColor: '#FF5722',
        borderColor: '#FF5722',
        tension: 0.1,
      },
    ],
  };

  // Opciones del gráfico
  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Fecha',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Puntuación',
        },
        min: 0,
      },
    },
  };

  return (
    <div className="chart-container">
      <h3>Progreso de Puntuación</h3>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default ProgressChart;
