const Sequelize = require('../config');
const {DataTypes} = require("sequelize");
const Kurikulum_rombongan_belajar = Sequelize.define('kurikulum_rombongan_belajar', {
    rombongan_belajar_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    kurikulum_program_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    tingkat_pendidikan_id: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    nama: {
      type: DataTypes.CHAR(10),
      allowNull: false
    },
    jenis_rombel: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    semester_id: {
      type: DataTypes.SMALLINT,
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
    is_industri: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    Sequelize,
    tableName: 'kurikulum_rombongan_belajar',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "rombongan_belajar_pkey",
        unique: true,
        fields: [
          { name: "rombongan_belajar_id" },
        ]
      },
    ]
  });

  module.exports = Kurikulum_rombongan_belajar
