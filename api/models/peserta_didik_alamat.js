const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('peserta_didik_alamat', {
    peserta_didik_alamat_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    peserta_didik_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    alamat_jalan: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    rt: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    rw: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    nama_dusun: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    kode_wilayah: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    kode_pos: {
      type: DataTypes.DECIMAL,
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
    jenis_tinggal_id: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    jarak_ke_sekolah: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    tmt: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    keaktifan: {
      type: DataTypes.DECIMAL,
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
    sequelize,
    tableName: 'peserta_didik_alamat',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "peserta_didik_alamat_pkey",
        unique: true,
        fields: [
          { name: "peserta_didik_alamat_id" },
        ]
      },
    ]
  });
};
