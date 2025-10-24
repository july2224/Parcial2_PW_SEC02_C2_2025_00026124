// routes/cuentas.routes.js

const express = require('express');
const router = express.Router();
const cuentasController = require('../controllers/cuentas.controller');

//Ruta para consulta con filtros 
router.get('/', cuentasController.getCuentaByQuery);

//Ruta  para balance
router.get('/extra/balance', cuentasController.getCuentasBalance);

//Ruta para obtener por ID específico 
router.get('/:id', cuentasController.getCuentaById);

module.exports = router;
