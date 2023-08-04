const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ptk_temp', {
    ptk_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ptk_penugasan_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    nama: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ptk_temp',
    schema: 'public',
    timestamps: false
  });
};
