const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('jabatan_tugas_ptk', {
    jabatan_ptk_id: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    nama: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    jabatan_utama: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    tugas_tambahan_guru: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    jumlah_jam_diakui: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    harus_refer_unit_org: {
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
    sequelize,
    tableName: 'jabatan_tugas_ptk',
    schema: 'ref',
    timestamps: false
  });
};
