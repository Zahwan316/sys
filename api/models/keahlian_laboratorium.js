const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('keahlian_laboratorium', {
    keahlian_laboratorium_id: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    nama: {
      type: DataTypes.STRING(50),
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
    tableName: 'keahlian_laboratorium',
    schema: 'ref',
    timestamps: false
  });
};
