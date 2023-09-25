const Sequelize = require('../config');
const {DataTypes} = require("sequelize");

const Ptk_anggota_keluarga = Sequelize.define('ptk_anggota_keluarga', {
    ptk_anggota_keluarga_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    ptk_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: true
    },
    jenis_kelamin: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    tempat_lahir: {
      type: DataTypes.CHAR(100),
      allowNull: true
    },
    tanggal_lahir: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    hubungan_keluarga_kode: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    pekerjaan_id: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    create_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    last_update: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    last_sync: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: "1901-01-01 00:00:00"
    },
    updater_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    soft_delete: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    Sequelize,
    tableName: 'ptk_anggota_keluarga',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "ptk_anggota_keluarga_pkey",
        unique: true,
        fields: [
          { name: "ptk_anggota_keluarga_id" },
        ]
      },
    ]
  });

  module.exports = Ptk_anggota_keluarga
