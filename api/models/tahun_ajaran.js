const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tahun_ajaran', {
    tahun_ajaran_id: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    nama: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    periode_aktif: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    tanggal_mulai: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    tanggal_selesai: {
      type: DataTypes.DATEONLY,
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
    tableName: 'tahun_ajaran',
    schema: 'ref',
    timestamps: false
  });
};
