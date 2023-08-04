const Sequelize = require('../config');
const {DataTypes} = require("sequelize");

const Akreditasi =  Sequelize.define('akreditasi', {
    akreditasi_id: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    nama: {
      type: DataTypes.STRING(30),
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
    tableName: 'akreditasi',
    schema: 'ref',
    timestamps: false
  });


module.exports = Akreditasi
