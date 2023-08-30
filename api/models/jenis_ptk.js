const Sequelize = require('../config');
const {DataTypes} = require("sequelize");

const Jenis_ptk = Sequelize.define('jenis_ptk', {
    jenis_ptk_id: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    jenis_ptk: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    guru_kelas: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    guru_matpel: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    guru_bk: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    guru_inklusi: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    guru_pengganti: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    pengawas_satdik: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    pengawas_plb: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    pengawas_matpel: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    pengawas_bidang: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    tas: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    tendik_lainnya: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    formal: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    create_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false
    },
    expired_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    last_sync: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    Sequelize,
    tableName: 'jenis_ptk',
    schema: 'ref',
    timestamps: false
  });

module.exports = Jenis_ptk;
