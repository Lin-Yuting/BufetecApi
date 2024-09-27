const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Citas = sequelize.define('Citas', {
  id_citas: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Tipo_Cita: {
    type: DataTypes.STRING,
    defaultValue: 'Asesoria'
  },
  Dia: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  Hora: {
    type: DataTypes.TIME,
    allowNull: false
  },
  Duracion_Cita: {
    type: DataTypes.TIME,
    allowNull: false
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
