const Sequelize = require('../config');
const {DataTypes} = require("sequelize");

const Hubungan_keluarga = Sequelize.define('hubungan_keluarga', {
    hubungan_keluarga_id: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    nama: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    create_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    last_update: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    soft_delete: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    last_sync: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updater_id: {
      type: DataTypes.CHAR(1),
      allowNull: true
    }
  }, {
    Sequelize,
    tableName: 'hubungan_keluarga',
    schema: 'ref',
    timestamps: false
  });

  module.exports = Hubungan_keluarga
