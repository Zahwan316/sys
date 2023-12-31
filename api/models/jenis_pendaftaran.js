const Sequelize = require('../config');
const {DataTypes} = require("sequelize");
const Jenis_pendaftaran = Sequelize.define('jenis_pendaftaran', {
    jenis_pendaftaran_id: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      primaryKey: true
    },
    nama: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    daftar_sekolah: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    daftar_rombel: {
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
    tableName: 'jenis_pendaftaran',
    schema: 'ref',
    timestamps: false,
    indexes: [
      {
        name: "jenis_pendaftaran_pkey",
        unique: true,
        fields: [
          { name: "jenis_pendaftaran_id" },
        ]
      },
    ]
  });

module.exports = Jenis_pendaftaran
