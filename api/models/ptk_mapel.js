const Sequelize = require('../config');
const {DataTypes} = require("sequelize");
const Ptk_mapel = Sequelize.define('ptk_mapel', {
    ptk_mapel_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    ptk_penugasan_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    mapel_sp_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    jumlah_jam: {
      type: DataTypes.DECIMAL,
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
    tableName: 'ptk_mapel',
    schema: 'kbm',
    timestamps: false,
    indexes: [
      {
        name: "ptk_mapel_pkey",
        unique: true,
        fields: [
          { name: "ptk_mapel_id" },
        ]
      },
    ]
  });

  module.exports = Ptk_mapel;
