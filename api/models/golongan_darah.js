const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('golongan_darah', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    golongan_darah_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    nama: {
      type: DataTypes.CHAR(12),
      allowNull: true
    },
    create_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updater_id: {
      type: DataTypes.CHAR(36),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'golongan_darah',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "golongan_darah_pkey",
        unique: true,
        fields: [
          { name: "_id" },
        ]
      },
    ]
  });
};
