import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import DailyProgressForm from './components/DailyProgressForm';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';
import SportsForm from './components/SportForm';
import FoodForm from './components/FoodForm';
import WeightForm from './components/WeightForm';
import WeightChart from './components/WeightChart';
import SportsPieChart from './components/SportsPieChart';
import FoodPieChart from './components/FoodPieChart';

function App() {
  const [days, setDays] = useState(1);
  const [completedDays, setCompletedDays] = useState([]);
  const [failedDays, setFailedDays] = useState([]);
  const [date, setDate] = useState(new Date());
  const [hasCompletedToday, setHasCompletedToday] = useState(false);
  const [weight, setWeight] = useState(null);
  const [weightHistory, setWeightHistory] = useState([]);
  const [sportsData, setSportsData] = useState([]);
  const [foodData, setFoodData] = useState([]);
  const [activeForm, setActiveForm] = useState('sports');
  const [activeChart, setActiveChart] = useState('weight');

  useEffect(() => {
    const savedCompletedDays = JSON.parse(localStorage.getItem('completedDays')) || [];
    const savedFailedDays = JSON.parse(localStorage.getItem('failedDays')) || [];
    const savedSportsData = JSON.parse(localStorage.getItem('sportsData')) || [];
    const savedFoodData = JSON.parse(localStorage.getItem('foodData')) || [];
    const savedWeightHistory = JSON.parse(localStorage.getItem('weightHistory')) || [];

    setCompletedDays(savedCompletedDays);
    setFailedDays(savedFailedDays);
    setSportsData(savedSportsData);
    setFoodData(savedFoodData);
    setWeightHistory(savedWeightHistory);

    const currentDate = new Date().toLocaleDateString();
    const completedToday = savedCompletedDays.includes(currentDate) || savedFailedDays.includes(currentDate);
    setHasCompletedToday(completedToday);

    const checkEndOfDay = () => {
      const now = new Date();
      const currentDate = now.toLocaleDateString();

      if (!completedToday && !failedDays.includes(currentDate)) {
        setFailedDays(prev => [...prev, currentDate]);
        localStorage.setItem('failedDays', JSON.stringify([...failedDays, currentDate]));
        setDays(0); // Reinicia el contador de días
      }
    };

    const endOfDayTimer = setInterval(checkEndOfDay, 1000 * 60 * 60); // Comprobar cada hora

    return () => clearInterval(endOfDayTimer);
  }, [completedDays, failedDays]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleWeightUpdate = (newWeight) => {
    setWeight(newWeight);
    const newWeightHistory = [...weightHistory, { date: new Date().toLocaleDateString(), weight: newWeight }];
    setWeightHistory(newWeightHistory);
    localStorage.setItem('weightHistory', JSON.stringify(newWeightHistory));
  };

  const handleSportsDataUpdate = (updatedSportsData) => {
    setSportsData(updatedSportsData);
    localStorage.setItem('sportsData', JSON.stringify(updatedSportsData));
  };

  const handleFoodDataUpdate = (updatedFoodData) => {
    setFoodData(updatedFoodData);
    localStorage.setItem('foodData', JSON.stringify(updatedFoodData));
  };

  const handleProgressComplete = (completed) => {
    const currentDate = new Date().toLocaleDateString();

    if (completed) {
      setCompletedDays(prev => [...prev, currentDate]);
      localStorage.setItem('completedDays', JSON.stringify([...completedDays, currentDate]));
      setDays(days + 1);
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

  const handleChartChange = (chart) => {
    setActiveChart(chart);
  };

  const tileClassName = ({ date }) => {
    const currentDate = date.toLocaleDateString();

    if (completedDays.includes(currentDate)) {
      return 'completed';
    } else if (failedDays.includes(currentDate)) {
      return 'failed';
    } else if (new Date().toLocaleDateString() === currentDate) {
      return 'today';
    }
    return '';
  };

  return (
    <div>
      <Header days={days} />
      <main>
        <h2>Seguimiento del reto 75 Hard</h2>

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

        {!hasCompletedToday && activeForm === 'sports' && <SportsForm onScoreUpdate={handleSportsDataUpdate} />}
        {!hasCompletedToday && activeForm === 'food' && <FoodForm onScoreUpdate={handleFoodDataUpdate} />}
        {!hasCompletedToday && activeForm === 'weight' && <WeightForm onWeightUpdate={handleWeightUpdate} />}
        {!hasCompletedToday && activeForm === '75hard' && <DailyProgressForm onComplete={handleProgressComplete} />}

        <h2>Gráficas</h2>

        <div className="chart-tabs">
          <div className={`tab ${activeChart === 'weight' ? 'active' : ''}`} onClick={() => handleChartChange('weight')}>
            <span>Gráfica Peso</span>
          </div>
          <div className={`tab ${activeChart === 'sports' ? 'active' : ''}`} onClick={() => handleChartChange('sports')}>
            <span>Gráfica Deporte</span>
          </div>
          <div className={`tab ${activeChart === 'food' ? 'active' : ''}`} onClick={() => handleChartChange('food')}>
            <span>Gráfica Comida</span>
          </div>
        </div>

        <div className="charts-container">
          {activeChart === 'weight' && <WeightChart data={weightHistory} />}
          {activeChart === 'sports' && <SportsPieChart sportsData={sportsData} />}
          {activeChart === 'food' && <FoodPieChart foodData={foodData} />}
        </div>

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
            tileClassName={tileClassName}
          />
        </div>

        {/* Contador de días fallados */}
        <div className="failed-days">
          <h3 style={{ color: 'red' }}>Días fallados: {failedDays.length}</h3>
        </div>

      </main>
    </div>
  );
}

export default App;
