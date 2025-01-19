import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

function Header({ days }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (days > 1) {
      setAnimate(true); // Iniciar animación al completar un día
      setTimeout(() => setAnimate(false), 3000); // Detener la animación después de 3 segundos
    }
  }, [days]);

  return (
    <header className={`header ${animate ? 'animate' : ''}`}>
      <h1>75 Hard</h1>
      <div className={`days ${animate ? 'animate' : ''}`}>
        {days}/75
      </div>
      {animate && (
        <>
          <div className="celebrate">¡Ole tu poooollaaa!</div>
          <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={500} gravity={0.2} /> {/* Confeti más denso y con mayor gravedad */}
        </>
      )}
    </header>
  );
}

export default Header;
