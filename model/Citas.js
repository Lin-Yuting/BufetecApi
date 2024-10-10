const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Citas = sequelize.define('Citas', {
  id_citas: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_evento: {
    type: DataTypes.STRING,
    references: {
      model: 'events',
      key: 'googleEventId'
    }
  },
  Cliente: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Catalogo_Clientes',
      key: 'id_Cat_Cli'
    }
  },
  Abogado: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Abogados',
      key: 'id_Abogado'
    }
  }
});

module.exports = Citas;
