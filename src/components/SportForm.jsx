import React, { useState } from 'react';

function SportsForm({ onScoreUpdate }) {
  // Definir los deportes
  const sportScores = {
    gimnasio: 6,
    correr: 6,
    boxeo: 8,
    bicicleta: 8,
    ruta: 3,
  };

  // Estado para contar las veces que se ha seleccionado cada deporte
  const [selectedSports, setSelectedSports] = useState({
    gimnasio: 0,
    correr: 0,
    boxeo: 0,
    bicicleta: 0,
    ruta: 0,
  });

  // Función para manejar el clic en un deporte
  const handleSportClick = (sport) => {
    const updatedSports = { ...selectedSports, [sport]: selectedSports[sport] + 1 };
    setSelectedSports(updatedSports);
    onScoreUpdate(updatedSports); // Pasar los datos al componente padre
  };

  return (
    <div className="sports-form">
      <h2>¿Has hecho deporte?</h2>
      <div className="sports-buttons">
        {Object.keys(sportScores).map(sport => (
          <button
            key={sport}
            className="sport-button"
            onClick={() => handleSportClick(sport)}
          >
            {sport.charAt(0).toUpperCase() + sport.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SportsForm;
