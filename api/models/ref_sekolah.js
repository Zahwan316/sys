const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ref_sekolah', {
    ref_sekolah_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    kode_provinsi: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    provinsi: {
      type: DataTypes.STRING(225),
      allowNull: true
    },
    kode_kab_kota: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    kab_kota: {
      type: DataTypes.STRING(225),
      allowNull: true
    },
    kode_kec: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    kecamatan: {
      type: DataTypes.STRING(225),
      allowNull: true
    },
    sekolah_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    npsn: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    nama: {
      type: DataTypes.STRING(225),
      allowNull: true
    },
    bentuk: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    alamat_jalan: {
      type: DataTypes.STRING(225),
      allowNull: true
    },
    lintang: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    bujur: {
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
    sequelize,
    tableName: 'ref_sekolah',
    schema: 'ref',
    timestamps: false
  });
};
