import React, { useState } from 'react';

function WeightForm({ onWeightUpdate }) {
  const [weight, setWeight] = useState('');

  // Función para manejar el cambio en el input del peso
  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  // Función para manejar el envío del formulario de peso
  const handleWeightSubmit = () => {
    if (weight !== '') {
      onWeightUpdate(weight); // Actualiza el peso en el componente padre
    } else {
      alert('Por favor ingresa tu peso');
    }
  };

  return (
    <div className="weight-form">
      <h3>Registrar tu peso</h3>
      <div className="weight-input-container">
        <input
          type="number"
          value={weight}
          onChange={handleWeightChange}
          placeholder="Introduce tu peso en kg"
          className="weight-input"
        />
      </div>
      <button onClick={handleWeightSubmit} className="weight-submit-button">
        Registrar peso
      </button>
    </div>
  );
}

export default WeightForm;
