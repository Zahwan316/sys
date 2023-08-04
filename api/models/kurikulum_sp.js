const Sequelize = require('../config');
const {DataTypes} = require("sequelize");

const Kurikulum_sp = Sequelize.define('kurikulum_sp', {
    kurikulum_sp_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    sekolah_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    kurikulum_kode: {
      type: DataTypes.SMALLINT,
      allowNull: false
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
    tableName: 'kurikulum_sp',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "kurikulum_sp_pkey",
        unique: true,
        fields: [
          { name: "kurikulum_sp_id" },
        ]
      },
    ]
  });


  module.exports = Kurikulum_sp
