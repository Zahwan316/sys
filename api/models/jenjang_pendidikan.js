const Sequelize = require('../config');
const {DataTypes} = require("sequelize");
const Jenjang_pendidikan = Sequelize.define('jenjang_pendidikan', {
    jenjang_pendidikan_id: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      primaryKey: true
    },
    nama: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    jenjang_lembaga: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    jenjang_orang: {
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
    tableName: 'jenjang_pendidikan',
    schema: 'ref',
    timestamps: false,
    indexes: [
      {
        name: "jenjang_pendidikan_pkey",
        unique: true,
        fields: [
          { name: "jenjang_pendidikan_id" },
        ]
      },
    ]
  });

module.exports = Jenjang_pendidikan