const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Biblioteca = sequelize.define('Biblioteca', {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true, 
    autoIncrement: true
  },

  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contenido: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Biblioteca;