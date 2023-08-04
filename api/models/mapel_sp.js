const Sequelize = require('../config');
const {DataTypes} = require("sequelize");


const Mapel_sp = Sequelize.define('mapel_sp', {
    mapel_sp_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    sekolah_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    kurikulum_id: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    kurikulum_pil: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1
    },
    kelompok: {
      type: DataTypes.CHAR(2),
      allowNull: true,
      defaultValue: "NULL"
    },
    mapel_kode: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    mapel_rank: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nama: {
      type: DataTypes.CHAR(50),
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
    akronim: {
      type: DataTypes.STRING(12),
      allowNull: true
    }
  }, {
    Sequelize,
    tableName: 'mapel_sp',
    schema: 'kbm',
    timestamps: false,
    indexes: [
      {
        name: "mapel_sp_pkey",
        unique: true,
        fields: [
          { name: "mapel_sp_id" },
        ]
      },
    ]
  });

module.exports = Mapel_sp

