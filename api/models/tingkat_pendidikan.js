const Sequelize = require('../config');
const {DataTypes} = require("sequelize");
const Tingkat_pendidikan = Sequelize.define('tingkat_pendidikan', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tingkat_id: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    nama: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    tk: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    tklb: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    sd: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    sdlb: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    smp: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    smplb: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    sma: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    smalb: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    smk: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: true
    },
    create_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    soft_delete: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    last_sync: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updater_id: {
      type: DataTypes.CHAR(36),
      allowNull: true
    }
  }, {
    Sequelize,
    tableName: 'tingkat_pendidikan',
    schema: 'ref',
    timestamps: false,
    indexes: [
      {
        name: "tingkat_pkey",
        unique: true,
        fields: [
          { name: "_id" },
        ]
      },
    ]
  });

module.exports = Tingkat_pendidikan

