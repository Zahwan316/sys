const Sequelize = require('../config');
const {DataTypes} = require("sequelize");
const Alasan_layak_pip = Sequelize.define('alasan_layak_pip', {
    id_layak_pip: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    alasan_layak_pip: {
      type: DataTypes.STRING(100),
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
    tableName: 'alasan_layak_pip',
    schema: 'ref',
    timestamps: false
  });

  module.exports = Alasan_layak_pip
