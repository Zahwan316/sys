const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pangkat_golongan', {
    pangkat_golongan_id: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    kode: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    nama: {
      type: DataTypes.STRING(20),
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
    sequelize,
    tableName: 'pangkat_golongan',
    schema: 'ref',
    timestamps: false,
    indexes: [
      {
        name: "pangkat_golongan_pkey",
        unique: true,
        fields: [
          { name: "_id" },
        ]
      },
    ]
  });
};
