const Sequelize = require('../config');
const {DataTypes} = require("sequelize");
const Bentuk_pendidikan = Sequelize.define('bentuk_pendidikan', {
    bentuk_pendidikan_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      primaryKey: true
    },
    nama: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    jenjang_paud: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    jenjang_tk: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    jenjang_sd: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    jenjang_smp: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    jenjang_sma: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    jenjang_tinggi: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    direktorat_pembinaan: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    aktif: {
      type: DataTypes.DECIMAL,
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
    tableName: 'bentuk_pendidikan',
    schema: 'ref',
    timestamps: false,
    indexes: [
      {
        name: "bentuk_pendidikan_bentuk_pendidikan_id_idx",
        fields: [
          { name: "bentuk_pendidikan_id" },
        ]
      },
      {
        name: "bentuk_pendidikan_pkey",
        unique: true,
        fields: [
          { name: "bentuk_pendidikan_id" },
        ]
      },
    ]
  });

  module.exports = Bentuk_pendidikan;
