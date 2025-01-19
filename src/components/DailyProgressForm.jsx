import React, { useState, useEffect } from 'react';

function DailyProgressForm({ onComplete }) {
  const [exercised, setExercised] = useState(false);
  const [read, setRead] = useState(false);
  const [noCheatMeals, setNoCheatMeals] = useState(false);
  const [isFormCompleted, setIsFormCompleted] = useState(false);

  // Verificar si ya se ha completado el formulario hoy
  useEffect(() => {
    const today = new Date().toDateString();
    const lastCompletedDay = localStorage.getItem('lastCompletedDay');
    
    if (lastCompletedDay === today) {
      setIsFormCompleted(true); // Ya completado hoy
    }
  }, []);

  // Función para manejar el envío del formulario
  const handleSubmit = () => {
    if (exercised && read && noCheatMeals) {
      localStorage.setItem('lastCompletedDay', new Date().toDateString()); // Guardar la fecha de hoy
      onComplete(true); // Indicamos que el progreso está completado
      setIsFormCompleted(true); // Bloquear el formulario para el resto del día
    } else {
      onComplete(false);
      setIsFormCompleted(false);
    }
  };

  return (
    <div className="form-container">
      {isFormCompleted ? (
        <p className="success-message">Ya has añadido tu rutina hoy. ¡Ole tu poooolla!</p>
      ) : (
        <>
          <div className="button-group">
            <button
              className={`form-button ${exercised ? 'active' : ''}`}
              onClick={() => setExercised(!exercised)}
            >
              Deporte
            </button>
            <button
              className={`form-button ${read ? 'active' : ''}`}
              onClick={() => setRead(!read)}
            >
              Lectura
            </button>
            <button
              className={`form-button ${noCheatMeals ? 'active' : ''}`}
              onClick={() => setNoCheatMeals(!noCheatMeals)}
            >
              Estiramientos
            </button>
          </div>

          <button
            className="submit-button"
            onClick={handleSubmit}
            disabled={!(exercised && read && noCheatMeals)}
          >
            Registrar día
          </button>
        </>
      )}
    </div>
  );
}

export default DailyProgressForm;
