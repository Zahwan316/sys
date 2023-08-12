const Sequelize = require('../config');
const {DataTypes} = require("sequelize");
const Peserta_didik_kontak = Sequelize.define('peserta_didik_kontak', {
    peserta_didik_kontak_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    peserta_didik_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    nomor_telepon_rumah: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    nomor_telepon_seluler: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    twitter: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    facebook: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    instagram: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    youtube: {
      type: DataTypes.STRING(30),
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
    tableName: 'peserta_didik_kontak',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "peserta_didik_kontak_pkey",
        unique: true,
        fields: [
          { name: "peserta_didik_kontak_id" },
        ]
      },
    ]
  });

  module.exports = Peserta_didik_kontak