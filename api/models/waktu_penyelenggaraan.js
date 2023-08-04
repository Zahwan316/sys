const Sequelize = require('../config');
const {DataTypes} = require("sequelize");
const Sekolah_identitas = require("./sekolah_identitas")

const Waktu_penyelenggaraan =  Sequelize.define('waktu_penyelenggaraan', {
    waktu_penyelenggaraan_id: {
      type: DataTypes.DECIMAL,
      allowNull: false,
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
    tableName: 'waktu_penyelenggaraan',
    schema: 'ref',
    timestamps: false
  });

//Waktu_penyelenggaraan.belongsTo(Sekolah_identitas)

  module.exports = Waktu_penyelenggaraan
