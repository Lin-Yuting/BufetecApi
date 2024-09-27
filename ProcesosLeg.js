const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProcesosLeg = sequelize.define('Procesos_Leg', {
  id_Proceso: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Nombre_Proceso: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Descrip_Proceso: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = ProcesosLeg;
