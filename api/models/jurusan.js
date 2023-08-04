const Sequelize = require('../config');
const {DataTypes} = require("sequelize");

const Jurusan = Sequelize.define('jurusan', {
    jurusan_id: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    nama_jurusan: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    untuk_sma: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    untuk_smk: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    untuk_pt: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    untuk_slb: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    untuk_smklb: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    jenjang_pendidikan_id: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    jurusan_induk: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    level_bidang_id: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    create_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: true
    },
    expired_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    last_sync: {
      type: DataTypes.DATE,
      allowNull: true
    },
    jurusan_new: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    flag: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    _id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    jurusan_pk: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    kurikulum_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    Sequelize,
    tableName: 'jurusan',
    schema: 'ref',
    timestamps: false,
    indexes: [
      {
        name: "jurusan_pkey",
        unique: true,
        fields: [
          { name: "_id" },
        ]
      },
    ]
  });

  module.exports = Jurusan
