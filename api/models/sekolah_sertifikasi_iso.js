const Sequelize = require('../config');
const {DataTypes} = require("sequelize");

const Sekolah_iso = Sequelize.define('sekolah_sertifikasi_iso', {
    sekolah_sertifikasi_iso_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    sekolah_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    sertifikasi_iso_id: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    nomor_sertifikasi_iso: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    tanggal_sertifikasi_iso: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    create_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    soft_delete: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    last_sync: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: "1901-01-01 00:00:00"
    },
    updater_id: {
      type: DataTypes.UUID,
      allowNull: true
    }
  }, {
    Sequelize,
    tableName: 'sekolah_sertifikasi_iso',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "sekolah_sertifikasi_iso_pkey",
        unique: true,
        fields: [
          { name: "sekolah_sertifikasi_iso_id" },
        ]
      },
    ]
  });


  module.exports = Sekolah_iso;
