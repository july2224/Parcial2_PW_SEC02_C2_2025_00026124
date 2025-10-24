// controllers/cuentas.controller.js
const cuentas = require('../data/cuentas');

// Helper: convierte 'true'/'false' (strings) u otros valores en booleano o undefined
function parseBoolean(value) {
  if (value === undefined) return undefined;
  if (typeof value === 'boolean') return value;
  const s = String(value).trim().toLowerCase();
  if (s === 'true') return true;
  if (s === 'false') return false;
  return undefined;
}

// Devuelve todas las cuentas 
function listarCuentas(req, res) {
  res.json({ count: cuentas.length, data: cuentas });
}

// Obtener cuenta por id
function obtenerPorId(req, res) {
  const { id } = req.params;
  const cuenta = cuentas.find(item => item._id === id);
  if (!cuenta) return res.json({ finded: false });
  return res.json({ finded: true, account: cuenta });
}

// Buscar con query params: queryParam (id/nombre/gender) e isActive
function buscarPorQuery(req, res) {
  const { queryParam, isActive } = req.query;
  let resultados = cuentas.slice(); // copia superficial

  const isActiveBool = parseBoolean(isActive);
  if (isActiveBool !== undefined) {
    resultados = resultados.filter(c => c.isActive === isActiveBool);
  }

  if (queryParam) {
    const q = String(queryParam).toLowerCase();
    resultados = resultados.filter(c =>
      c._id === queryParam ||
      c.client.toLowerCase().includes(q) ||
      c.gender.toLowerCase() === q
    );
  }

  if (resultados.length === 0) return res.json({ finded: false });
  if (resultados.length === 1) return res.json({ finded: true, account: resultados[0] });
  return res.json({ finded: true, data: resultados });
}

// Obtener balances (ruta extra)
function obtenerBalances(req, res) {
  const data = cuentas.map(c => ({ client: c.client, balance: c.balance }));
  res.json({ count: data.length, data });
}

module.exports = {
  // API internal names
  listarCuentas,
  obtenerPorId,
  buscarPorQuery,
  obtenerBalances,

  // Alias para compatibilidad con el código de rutas existente
  getCuentaByQuery: buscarPorQuery,
  getCuentasBalance: obtenerBalances,
  getCuentaById: obtenerPorId
};
