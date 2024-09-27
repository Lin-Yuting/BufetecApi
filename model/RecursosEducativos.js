const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const RecursosEducativos = sequelize.define('Recursos_Educativos', {
  id_Recurso: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Nombre_Recurso: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Descrip_Recurso: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = RecursosEducativos;
