const Sequelize = require('../config');
const {DataTypes} = require("sequelize");
const Alat_transportasi =  Sequelize.define('alat_transportasi', {
    alat_transportasi_id: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      primaryKey: true
    },
    nama: {
      type: DataTypes.STRING(40),
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
    tableName: 'alat_transportasi',
    schema: 'ref',
    timestamps: false,
    indexes: [
      {
        name: "alat_transportasi_pkey",
        unique: true,
        fields: [
          { name: "alat_transportasi_id" },
        ]
      },
    ]
  });

module.exports = Alat_transportasi