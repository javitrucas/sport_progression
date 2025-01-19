import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import DailyProgressForm from './components/DailyProgressForm';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';
import SportsForm from './components/SportForm';
import FoodForm from './components/FoodForm';
import WeightForm from './components/WeightForm';
import ProgressChart from './components/ProgressChart'; // Importar la gráfica de puntuación
import WeightChart from './components/WeightChart'; // Importar la gráfica de peso
import SportsPieChart from './components/SportsPieChart'; // Importar el gráfico de deportes (barra)
import FoodPieChart from './components/FoodPieChart'; // Importar el gráfico de comida (barra)

function App() {
  const [days, setDays] = useState(1);
  const [completedDays, setCompletedDays] = useState([]);
  const [failedDays, setFailedDays] = useState([]);
  const [date, setDate] = useState(new Date());
  const [hasCompletedToday, setHasCompletedToday] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [weight, setWeight] = useState(null);
  const [scoreHistory, setScoreHistory] = useState([]); // Guardar el historial de puntuación
  const [weightHistory, setWeightHistory] = useState([]); // Guardar el historial de peso
  const [sportsData, setSportsData] = useState([]); // Guardar los datos de deportes
  const [foodData, setFoodData] = useState([]); // Guardar los datos de alimentos
  const [activeForm, setActiveForm] = useState('sports');

  useEffect(() => {
    const savedCompletedDays = JSON.parse(localStorage.getItem('completedDays')) || [];
    const savedFailedDays = JSON.parse(localStorage.getItem('failedDays')) || [];
    const savedSportsData = JSON.parse(localStorage.getItem('sportsData')) || [];
    const savedFoodData = JSON.parse(localStorage.getItem('foodData')) || [];
    const savedWeightHistory = JSON.parse(localStorage.getItem('weightHistory')) || [];
    const savedScoreHistory = JSON.parse(localStorage.getItem('scoreHistory')) || [];

    setCompletedDays(savedCompletedDays);
    setFailedDays(savedFailedDays);
    setSportsData(savedSportsData);
    setFoodData(savedFoodData);
    setWeightHistory(savedWeightHistory);
    setScoreHistory(savedScoreHistory);

    const currentDate = new Date().toLocaleDateString();
    const completedToday = savedCompletedDays.includes(currentDate) || savedFailedDays.includes(currentDate);
    setHasCompletedToday(completedToday);
  }, []);

  const handleDateChange = newDate => {
    setDate(newDate);
  };

  const handleWeightUpdate = (newWeight) => {
    setWeight(newWeight);
    const newWeightHistory = [...weightHistory, { date: new Date().toLocaleDateString(), weight: newWeight }];
    setWeightHistory(newWeightHistory);
    localStorage.setItem('weightHistory', JSON.stringify(newWeightHistory)); // Guardar en localStorage
  };

  const handleSportsDataUpdate = (updatedSportsData) => {
    setSportsData(updatedSportsData);
    localStorage.setItem('sportsData', JSON.stringify(updatedSportsData)); // Guardar en localStorage
  };

  const handleFoodDataUpdate = (updatedFoodData) => {
    setFoodData(updatedFoodData);
    localStorage.setItem('foodData', JSON.stringify(updatedFoodData)); // Guardar en localStorage
  };

  // Calcular la puntuación total
  const calculateTotalScore = () => {
    let score = 0;
    
    // Añadir la puntuación por deportes
    sportsData.forEach(sport => {
      score += sport.score; // Suponiendo que 'score' es un campo en el objeto de deportes
    });
    
    // Añadir la puntuación por comida
    foodData.forEach(food => {
      score += food.score; // Suponiendo que 'score' es un campo en el objeto de comida
    });

    // Añadir la puntuación por peso (ajustar según tus reglas)
    if (weight > 83) {
      score -= 5; // Ejemplo de regla
    }

    return score;
  };

  const handleProgressComplete = (completed) => {
    const currentDate = new Date().toLocaleDateString();
    const newScore = calculateTotalScore();

    if (completed) {
      setCompletedDays(prev => [...prev, currentDate]);
      localStorage.setItem('completedDays', JSON.stringify([...completedDays, currentDate]));
      setDays(days + 1);

      const newScoreHistory = [...scoreHistory, { date: currentDate, score: newScore }];
      setScoreHistory(newScoreHistory);
      localStorage.setItem('scoreHistory', JSON.stringify(newScoreHistory));

      setTotalScore(newScore); // Actualizar la puntuación total
      setHasCompletedToday(true);
    } else {
      setFailedDays(prev => [...prev, currentDate]);
      localStorage.setItem('failedDays', JSON.stringify([...failedDays, currentDate]));
      setDays(0); // Reiniciar días, pero no borrar las gráficas ni los datos
    }
  };

  const handleTabChange = (form) => {
    setActiveForm(form);
  };

  return (
    <div>
      <Header days={days} />
      <main>
        <h2>Seguimiento del reto 75 Hard</h2>

        {/* Barra de navegación */}
        <div className="form-tabs">
          <div className={`tab ${activeForm === 'sports' ? 'active' : ''}`} onClick={() => handleTabChange('sports')}>
            <span>Deportes</span>
          </div>
          <div className={`tab ${activeForm === 'food' ? 'active' : ''}`} onClick={() => handleTabChange('food')}>
            <span>Alimentación</span>
          </div>
          <div className={`tab ${activeForm === 'weight' ? 'active' : ''}`} onClick={() => handleTabChange('weight')}>
            <span>Peso</span>
          </div>
          <div className={`tab ${activeForm === '75hard' ? 'active' : ''}`} onClick={() => handleTabChange('75hard')}>
            <span>Reto 75 Hard</span>
          </div>
        </div>

        {/* Formularios */}
        {!hasCompletedToday && activeForm === 'sports' && <SportsForm onScoreUpdate={handleSportsDataUpdate} />}
        {!hasCompletedToday && activeForm === 'food' && <FoodForm onScoreUpdate={handleFoodDataUpdate} />}
        {!hasCompletedToday && activeForm === 'weight' && <WeightForm onWeightUpdate={handleWeightUpdate} />}
        {!hasCompletedToday && activeForm === '75hard' && <DailyProgressForm onComplete={handleProgressComplete} />}

        {/* Mostrar las gráficas */}
        <div className="charts-container">
          <ProgressChart data={scoreHistory} />
          <WeightChart data={weightHistory} />
          <SportsPieChart sportsData={sportsData} />
          <FoodPieChart foodData={foodData} />
        </div>

        {/* Mostrar la puntuación total */}
        <div className="total-score">
          <h3>Puntuación total: {totalScore}</h3>
        </div>

        {/* Mostrar el peso si se ha registrado */}
        {weight && (
          <div className="weight-display">
            <h3>Peso registrado: {weight} kg</h3>
          </div>
        )}

        <div>
          <Calendar
            onChange={handleDateChange}
            value={date}
            view="month"
          />
        </div>
      </main>
    </div>
  );
}

export default App;

/*ESTE FUNCIONAAAAAa */