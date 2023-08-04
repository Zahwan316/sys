const Sequelize = require('../config');
const {DataTypes} = require("sequelize");
const Kurikulum_program = Sequelize.define('kurikulum_program', {
    kurikulum_program_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    kurikulum_sp_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    jurusan_id: {
      type: DataTypes.CHAR(8),
      allowNull: false
    },
    no_sk_izin: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    tanggal_sk_izin: {
      type: DataTypes.DATEONLY,
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
    tableName: 'kurikulum_program',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "kurikulum_program_pkey",
        unique: true,
        fields: [
          { name: "kurikulum_program_id" },
        ]
      },
    ]
  });

  module.exports = Kurikulum_program
