const Sequelize = require('../config');
const {DataTypes} = require("sequelize");
const ref_pekerjaan =  Sequelize.define('pekerjaan', {
    pekerjaan_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nama: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    a_wirausaha: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    a_pejabat_publik: {
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
    },
    _id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    }
  }, {
    Sequelize,
    tableName: 'pekerjaan',
    schema: 'ref',
    timestamps: false,
    indexes: [
      {
        name: "pekerjaan_pkey",
        unique: true,
        fields: [
          { name: "_id" },
        ]
      },
    ]
  });

module.exports = ref_pekerjaan