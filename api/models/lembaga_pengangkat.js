const Sequelize = require('../config');
const {DataTypes} = require("sequelize");
const lembaga_pengangkat = Sequelize.define('lembaga_pengangkat', {
    lembaga_pengangkat_id: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    nama: {
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
    },
    _id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    }
  }, {
    Sequelize,
    tableName: 'lembaga_pengangkat',
    schema: 'ref',
    timestamps: false,
    indexes: [
      {
        name: "lembaga_pengangkat_pkey",
        unique: true,
        fields: [
          { name: "_id" },
        ]
      },
    ]
  });

module.exports = lembaga_pengangkat
