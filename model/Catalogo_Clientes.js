const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Catalogo_Clientes = sequelize.define('Catalogo_Clientes', {
  id_Cat_Cli: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Cli_Nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Cli_Num_Exp: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Id_user_cliente: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id_user'
    }
  }
});

module.exports = Catalogo_Clientes;
