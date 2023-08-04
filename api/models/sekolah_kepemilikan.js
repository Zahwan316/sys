const Sequelize = require('../config');
const {DataTypes} = require("sequelize");

const Sekolah_kepemilikan =  Sequelize.define('sekolah_kepemilikan', {
    sekolah_kepemilikan_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    sekolah_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    status_kepemilikan: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    nama_yayasan: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    nama_notaris: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    nomor_akte_notaris: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    tanggal_akte_notaris: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    keaktifan: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      defaultValue: 1
    },
    tmt: {
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
    tableName: 'sekolah_kepemilikan',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "sekolah_kepemilikan_pkey",
        unique: true,
        fields: [
          { name: "sekolah_kepemilikan_id" },
        ]
      },
    ]
  });

module.exports = Sekolah_kepemilikan