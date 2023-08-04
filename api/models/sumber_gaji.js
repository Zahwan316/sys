const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sumber_gaji', {
    sumber_gaji_id: {
      type: DataTypes.DECIMAL,
      allowNull: false
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
    sequelize,
    tableName: 'sumber_gaji',
    schema: 'ref',
    timestamps: false
  });
};
