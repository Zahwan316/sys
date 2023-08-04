const Sequelize = require('../config');
const {DataTypes} = require("sequelize");

const Waktu_kbm = Sequelize.define('waktu_kbm', {
    waktu_kbm_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    hari_ke: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    jam_ke: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    waktu1: {
      type: DataTypes.TIME,
      allowNull: true
    },
    waktu2: {
      type: DataTypes.TIME,
      allowNull: true
    },
    durasi: {
      type: DataTypes.TIME,
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
    tableName: 'waktu_kbm',
    schema: 'kbm',
    timestamps: false,
    indexes: [
      {
        name: "waktu_kbm_pkey",
        unique: true,
        fields: [
          { name: "waktu_kbm_id" },
        ]
      },
    ]
  });

module.exports = Waktu_kbm
