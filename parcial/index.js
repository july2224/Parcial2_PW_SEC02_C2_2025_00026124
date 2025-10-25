const express = require('express');
const app = express();
const cuentasRoutes = require('./routes/cuentas.routes');

const PORT = 3130;

// Middleware para parsear JSON
app.use(express.json());

// Usar rutas de cuentas (mount en /cuentas para coincidir con las rutas de prueba)
app.use('/cuentas', cuentasRoutes);

// 404 
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Levantar el servidor con console.log
app.listen(PORT, () => {
  console.log(`✅ Servidor backend corriendo en http://localhost:${PORT}`);
});
