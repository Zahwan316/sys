const Sequelize = require('../config');
const {DataTypes} = require("sequelize");


const Kurikulum = Sequelize.define('kurikulum', {
    kurikulum_sp_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    sekolah_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    kurikulum_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      primaryKey: true
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
    tableName: 'kurikulum',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "kurikulum_pkey",
        unique: true,
        fields: [
          { name: "kurikulum_id" },
        ]
      },
    ]
  });

 module.exports = Kurikulum;

