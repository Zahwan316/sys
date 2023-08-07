const Sequelize = require('../config');
const {DataTypes} = require("sequelize");
const Merdeka_mapel = Sequelize.define('merdeka_mapel', {
    mapel_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    mapel_kode: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    kelompok: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    sub_kelompok: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    nama: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    kurikulum_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    bentuk_pendidikan_id: {
      type: DataTypes.INTEGER,
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
    }
  }, {
    Sequelize,
    tableName: 'merdeka_mapel',
    schema: 'ref',
    timestamps: false
  });

module.exports = Merdeka_mapel
