const Sequelize = require('../config');
const {DataTypes} = require("sequelize");
const Sekolah_alamat = Sequelize.define('sekolah_alamat', {
    sekolah_alamat_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    sekolah_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    alamat_jalan: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    rt: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    rw: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    nama_dusun: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    kode_wilayah: {
      type: DataTypes.STRING(10),
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
    tableName: 'sekolah_alamat',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "sekolah_alamat_pkey",
        unique: true,
        fields: [
          { name: "sekolah_alamat_id" },
        ]
      },
    ]
  });


  
module.exports = Sekolah_alamat
