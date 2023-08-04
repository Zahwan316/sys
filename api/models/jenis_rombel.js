const Sequelize = require('../config');
const {DataTypes} = require("sequelize");
const Jenis_rombel = Sequelize.define('jenis_rombel', {
    jenis_rombel: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    nm_jenis_rombel: {
      type: DataTypes.STRING(80),
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
    tableName: 'jenis_rombel',
    schema: 'ref',
    timestamps: false
  });

  module.exports = Jenis_rombel
