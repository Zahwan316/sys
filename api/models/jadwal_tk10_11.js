const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('jadwal_tk10_11', {
    jam_ke: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    hari_ke: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    kode_guru: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    nama_rombel: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    rombongan_belajar_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    kode_rombel: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tingkat: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    guru_kode: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ptk_id: {
      type: DataTypes.STRING(36),
      allowNull: true
    },
    nama_guru: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    mapel: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    mapel_sp_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'jadwal_tk10_11',
    schema: 'public',
    timestamps: false
  });
};
