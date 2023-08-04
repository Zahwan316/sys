const sequelize = require('../config');
const {DataTypes} = require("sequelize")
const Waktu_penyelenggaraan = require("./waktu_penyelenggaraan")

const Sekolah_identitas = sequelize.define('sekolah_identitas', {
  sekolah_id: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  nama: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  npsn: {
    type: DataTypes.CHAR(20),
    allowNull: true
  },
  bentuk_pendidikan_id: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  status_sekolah: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  waktu_pbm_id: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  sk_pendirian_sekolah: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  tanggal_sk_pendirian: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  mbs_kode: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  npwp: {
    type: DataTypes.CHAR(15),
    allowNull: true
  },
  nm_wp: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  nomor_telepon: {
    type: DataTypes.STRING(35),
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(35),
    allowNull: true
  },
  instagram: {
    type: DataTypes.STRING(35),
    allowNull: true
  },
  twitter: {
    type: DataTypes.STRING(35),
    allowNull: true
  },
  facebook: {
    type: DataTypes.STRING(35),
    allowNull: true
  },
  website: {
    type: DataTypes.STRING(35),
    allowNull: true
  },
  keaktifan: {
    type: DataTypes.DECIMAL,
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
    defaultValue: sequelize.Sequelize.fn('now')
  },
  last_update: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: sequelize.Sequelize.fn('now')
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
  tableName: 'sekolah_identitas',
  schema: 'public',
  timestamps: false,
  indexes: [
    {
      name: "sekolah_identitas_pkey",
      unique: true,
      fields: [
        { name: "sekolah_id" },
      ]
    },
  ]
});

//Sekolah_identitas.hasOne(Waktu_penyelenggaraan,{foreignKey:"waktu_penyelenggaraan_id"})

module.exports = Sekolah_identitas