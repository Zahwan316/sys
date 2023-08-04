const Sequelize = require('../config');
const {DataTypes} = require("sequelize");

const Hari = Sequelize.define('hari', {
    hari_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    hari_ke: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    nama: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    create_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: true
    },
    soft_delete: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    last_sync: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updater_id: {
      type: DataTypes.CHAR(36),
      allowNull: true
    }
  }, {
    Sequelize,
    tableName: 'hari',
    schema: 'ref',
    timestamps: false,
    indexes: [
      {
        name: "hari_pkey",
        unique: true,
        fields: [
          { name: "hari_id" },
        ]
      },
    ]
  });

module.exports = Hari
