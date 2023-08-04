const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('jenis_tinggal', {
    jenis_tinggal_id: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    nama: {
      type: DataTypes.STRING(30),
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
    tableName: 'jenis_tinggal',
    schema: 'ref',
    timestamps: false,
    indexes: [
      {
        name: "jenis_tinggal_pkey",
        unique: true,
        fields: [
          { name: "_id" },
        ]
      },
    ]
  });
};
