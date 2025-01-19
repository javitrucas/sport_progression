import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WeightChart = ({ data }) => {
  // Calculamos el valor mínimo y máximo de los datos de peso para ajustar la escala y
  const minWeight = Math.min(...data.map(item => item.weight)) - 1; // Restamos 5 para dar margen
  const maxWeight = Math.max(...data.map(item => item.weight)) + 1; // Sumamos 5 para dar margen

  // Datos para el gráfico
  const chartData = {
    labels: data.map(item => item.date), // Fechas
    datasets: [
      {
        label: 'Peso (kg)',
        data: data.map(item => item.weight), // Peso
        fill: false,
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50',
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
          text: 'Peso (kg)',
        },
        min: minWeight, // Ajusta el mínimo dinámicamente
        max: maxWeight, // Ajusta el máximo dinámicamente
      },
    },
  };

  return (
    <div className="chart-container">
      <h3>Progreso de Peso</h3>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default WeightChart;
