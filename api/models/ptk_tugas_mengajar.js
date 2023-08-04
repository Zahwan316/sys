const Sequelize = require('../config');
const {DataTypes} = require("sequelize");

const Ptk_tugas_mengajar = Sequelize.define('ptk_tugas_mengajar', {
    ptk_penugasan_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    ptk_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    semester_id: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    mapel_sp_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'mapel_sp',
        key: 'mapel_sp_id'
      }
    },
    jumlah_jam: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    nomor_surat_tugas: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    tanggal_surat_tugas: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    tmt_tugas: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    tmt_akhir_tugas: {
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
    tableName: 'ptk_tugas_mengajar',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "ptk_tugas_mengajarpkey",
        unique: true,
        fields: [
          { name: "ptk_penugasan_id" },
        ]
      },
    ]
  });

module.exports = Ptk_tugas_mengajar
