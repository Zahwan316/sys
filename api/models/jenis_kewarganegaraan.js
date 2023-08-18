const Sequelize = require('../config');
const {DataTypes} = require("sequelize");

const Jenis_kewarganegraan = Sequelize.define('jenis_kewarganegaraan', {
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "jenis_kewarganegaraan_nama_key"
    },
    alpha_2: {
      type: DataTypes.CHAR(2),
      allowNull: false,
      unique: "jenis_kewarganegaraan_alpha_2_key"
    },
    alpha_3: {
      type: DataTypes.CHAR(3),
      allowNull: true
    },
    numcode: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    phone_code: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    }
  }, {
    Sequelize,
    tableName: 'jenis_kewarganegaraan',
    schema: 'ref',
    timestamps: false,
    indexes: [
      {
        name: "jenis_kewarganegaraan_alpha_2_key",
        unique: true,
        fields: [
          { name: "alpha_2" },
        ]
      },
      {
        name: "jenis_kewarganegaraan_nama_key",
        unique: true,
        fields: [
          { name: "nama" },
        ]
      },
      {
        name: "jenis_kewarganegaraan_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });

  module.exports = Jenis_kewarganegraan
