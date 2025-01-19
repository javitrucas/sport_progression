import React, { useState } from 'react';

function FoodForm({ onScoreUpdate }) {
  const foods = [
    { name: 'Fruta', score: 5 },
    { name: 'Bollería', score: -6 },
    { name: 'Cerveza', score: -3 },
    { name: 'Cubata', score: -10 },
    { name: 'Refresco 0,0', score: 2 },
  ];

  // Estado para contar las veces que se ha seleccionado cada alimento
  const [selectedFoods, setSelectedFoods] = useState({
    Fruta: 0,
    Bollería: 0,
    Cerveza: 0,
    Cubata: 0,
    'Refresco 0,0': 0,
  });

  // Función para manejar el clic en un alimento
  const handleFoodClick = (food) => {
    const updatedFoods = { ...selectedFoods, [food]: selectedFoods[food] + 1 };
    setSelectedFoods(updatedFoods);
    onScoreUpdate(updatedFoods); // Pasar los datos al componente padre
  };

  return (
    <div className="food-form">
      <h3>¿Qué has comido?</h3>
      <div className="food-buttons">
        {foods.map((food, index) => (
          <button
            key={index}
            className="food-button"
            onClick={() => handleFoodClick(food.name)}
          >
            {food.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FoodForm;
