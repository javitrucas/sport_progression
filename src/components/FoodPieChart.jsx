import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registrar los componentes de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const FoodPieChart = ({ foodData }) => {
  // Calcular las veces que se ha comido cada alimento
  const foodNames = Object.keys(foodData);
  const foodCounts = foodNames.map(food => foodData[food]);

  // Datos para el gráfico circular
  const chartData = {
    labels: foodNames,
    datasets: [
      {
        data: foodCounts,
        backgroundColor: ['#FF9800', '#8BC34A', '#FF5722', '#3F51B5', '#9C27B0'],
        borderColor: ['#FF9800', '#8BC34A', '#FF5722', '#3F51B5', '#9C27B0'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="chart-container">
      <h3>Distribución de Comida</h3>
      <Pie data={chartData} />
    </div>
  );
};

export default FoodPieChart;
