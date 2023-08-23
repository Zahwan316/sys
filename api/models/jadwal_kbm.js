const Sequelize = require('../config');
const {DataTypes} = require("sequelize");

const Jadwal_kbm = Sequelize.define('jadwal_kbm', {
    jadwal_kbm_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    ptk_penugasan_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'ptk_tugas_mengajar',
        key: 'ptk_penugasan_id'
      }
    },
    ptk_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    rombongan_belajar_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'kurikulum_rombongan_belajar',
        key: 'rombongan_belajar_id'
      }
    },
    hari_ke: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    jam_ke: {
      type: DataTypes.SMALLINT,
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
    },
    tanggal:{
      type: DataTypes.UUID,
      allowNull: true
    }
  }, {
    Sequelize,
    tableName: 'jadwal_kbm',
    schema: 'kbm',
    timestamps: false,
    indexes: [
      {
        name: "jadwal_kbm_pkey",
        unique: true,
        fields: [
          { name: "jadwal_kbm_id" },
        ]
      },
    ]
  });

module.exports = Jadwal_kbm

