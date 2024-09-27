const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Abogados = sequelize.define('Abogados', {
  id_Abogado: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Abogado_firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Abogado_lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Abogado_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Abogado_Contact: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Abogados;
