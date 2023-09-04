const Sequelize = require('../config');
const {DataTypes} = require("sequelize");

const Ptk_pend_formal = Sequelize.define('ptk_pend_formal', {
    ptk_pend_formal_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    ptk_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    jenjang_pendidikan_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    program_studi_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    gelar_akademik_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    satuan_pendidikan_formal: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "NULL"
    },
    fakultas: {
      type: DataTypes.STRING(30),
      allowNull: true,
      defaultValue: "NULL"
    },
    kependidikan: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    tahun_masuk: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    tahun_lulus: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    nim: {
      type: DataTypes.STRING(12),
      allowNull: true,
      defaultValue: "NULL"
    },
    status_kuliah: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    semester: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    ipk: {
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
    tableName: 'ptk_pend_formal',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "ptk_pend_formal_pkey",
        unique: true,
        fields: [
          { name: "ptk_pend_formal_id" },
        ]
      },
    ]
  });

  module.exports = Ptk_pend_formal
