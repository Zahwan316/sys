const Sequelize = require('../config');
const {DataTypes} = require("sequelize");

const Sertifikasi_iso =  Sequelize.define('sertifikasi_iso', {
    sertifikasi_iso_id: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    nama: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    create_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false
    },
    expired_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    last_sync: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    Sequelize,
    tableName: 'sertifikasi_iso',
    schema: 'ref',
    timestamps: false
  });

  module.exports = Sertifikasi_iso
