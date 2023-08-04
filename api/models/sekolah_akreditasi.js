const Sequelize = require('../config');
const {DataTypes} = require("sequelize");

const Sekolah_akreditasi = Sequelize.define('sekolah_akreditasi', {
    sekolah_akreditasi_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    sekolah_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    status_akreditasi: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    nilai_akreditasi: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    nomor_sk_akreditasi: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    tanggal_sk_akreditasi: {
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
    tableName: 'sekolah_akreditasi',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "sekolah_akreditasi_pkey",
        unique: true,
        fields: [
          { name: "sekolah_akreditasi_id" },
        ]
      },
    ]
  });

module.exports = Sekolah_akreditasi
