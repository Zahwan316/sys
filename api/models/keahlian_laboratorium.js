const Sequelize = require('../config');
const {DataTypes} = require("sequelize");
const Keahlian_laboratorium = Sequelize.define('keahlian_laboratorium', {
    keahlian_laboratorium_id: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    nama: {
      type: DataTypes.STRING(50),
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
    tableName: 'keahlian_laboratorium',
    schema: 'ref',
    timestamps: false
  });

module.exports = Keahlian_laboratorium;
