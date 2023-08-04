const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('agama', {
    agama_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      primaryKey: true
    },
    nama: {
      type: DataTypes.STRING(25),
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
    sequelize,
    tableName: 'agama',
    schema: 'ref',
    timestamps: false,
    indexes: [
      {
        name: "agama_pkey",
        unique: true,
        fields: [
          { name: "agama_id" },
        ]
      },
    ]
  });
};
