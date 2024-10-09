require('dotenv').config();
const User = require('./User');
const Catalogo_Clientes = require('./Catalogo_Clientes');
const Citas = require('./Citas');
const Abogados = require('./Abogados');
const ProcesosLeg = require('./ProcesosLeg');
const RecursosEducativos = require('./RecursosEducativos');
const Event = require('./Event');

// Definir las relaciones entre los modelos
User.hasMany(Catalogo_Clientes, { foreignKey: 'Id_user_cliente' });
Catalogo_Clientes.belongsTo(User, { foreignKey: 'Id_user_cliente' });

Catalogo_Clientes.hasMany(Citas, { foreignKey: 'Cliente' });
Citas.belongsTo(Catalogo_Clientes, { foreignKey: 'Cliente' });

Abogados.hasMany(Citas, { foreignKey: 'Abogado' });
Citas.belongsTo(Abogados, { foreignKey: 'Abogado' });

Event.hasMany(Citas, { foreignKey: 'googleEventId' });
Citas.belongsTo(Event, { foreignKey: 'googleEventId' });

// Exportar todos los modelos para poder usarlos en otras partes del proyecto
module.exports = {
  User,
  Catalogo_Clientes,
  Citas,
  Abogados,
  ProcesosLeg,
  RecursosEducativos,
  Event
};
