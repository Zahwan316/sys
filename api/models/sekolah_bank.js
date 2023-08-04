const Sequelize = require('../config');
const {DataTypes} = require("sequelize");

const Sekolah_bank = Sequelize.define('sekolah_bank', {
    sekolah_bank_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    sekolah_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    id_bank: {
      type: DataTypes.CHAR(3),
      allowNull: false
    },
    cabang_kcp_unit: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    no_rekening: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    rekening_atas_nama: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    keaktifan: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      defaultValue: 1
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
    tableName: 'sekolah_bank',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "sekolah_bank_pkey",
        unique: true,
        fields: [
          { name: "sekolah_bank_id" },
        ]
      },
    ]
  });

module.exports = Sekolah_bank
