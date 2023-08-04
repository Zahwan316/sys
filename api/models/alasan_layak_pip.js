const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('alasan_layak_pip', {
    id_layak_pip: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    alasan_layak_pip: {
      type: DataTypes.STRING(100),
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
    tableName: 'alasan_layak_pip',
    schema: 'ref',
    timestamps: false
  });
};
