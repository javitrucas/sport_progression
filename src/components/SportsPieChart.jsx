import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registrar los componentes de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const SportsPieChart = ({ sportsData }) => {
  // Calcular las veces que se ha hecho cada deporte
  const sportNames = Object.keys(sportsData);
  const sportCounts = sportNames.map(sport => sportsData[sport]);

  // Datos para el gráfico circular
  const chartData = {
    labels: sportNames,
    datasets: [
      {
        data: sportCounts,
        backgroundColor: ['#FF5722', '#4CAF50', '#2196F3', '#FFC107', '#9C27B0'],
        borderColor: ['#FF5722', '#4CAF50', '#2196F3', '#FFC107', '#9C27B0'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="chart-container">
      <h3>Distribución de Deportes</h3>
      <Pie data={chartData} />
    </div>
  );
};

export default SportsPieChart;
