const Sequelize = require('../config');
const {DataTypes} = require("sequelize");
const Ptk_alamat = Sequelize.define('ptk_alamat', {
    ptk_alamat_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    ptk_id: {
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
    Sequelize,
    tableName: 'ptk_alamat',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "ptk_alamat_pkey",
        unique: true,
        fields: [
          { name: "ptk_alamat_id" },
        ]
      },
    ]
  });

module.exports = Ptk_alamat
