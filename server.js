const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5000;

app.use(express.json());

// Ruta para obtener los datos
app.get('/data', (req, res) => {
  fs.readFile(path.join(__dirname, 'self_data', 'data.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Error al leer el archivo de datos' });
      return;
    }
    res.json(JSON.parse(data));
  });
});

// Ruta para actualizar los datos
app.post('/data', (req, res) => {
  const newData = req.body;

  fs.writeFile(path.join(__dirname, 'self_data', 'data.json'), JSON.stringify(newData, null, 2), 'utf8', (err) => {
    if (err) {
      res.status(500).json({ error: 'Error al guardar los datos' });
      return;
    }
    res.json({ message: 'Datos actualizados correctamente' });
  });
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
