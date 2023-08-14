const Sequelize = require('../config');
const {DataTypes} = require("sequelize");
const Jenis_tinggal = Sequelize.define('jenis_tinggal', {
    jenis_tinggal_id: {
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
    },
    _id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    }
  }, {
    Sequelize,
    tableName: 'jenis_tinggal',
    schema: 'ref',
    timestamps: false,
    indexes: [
      {
        name: "jenis_tinggal_pkey",
        unique: true,
        fields: [
          { name: "_id" },
        ]
      },
    ]
  });

module.exports = Jenis_tinggal
