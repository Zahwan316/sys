const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('penghasilan', {
    penghasilan_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nama: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    batas_bawah: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    batas_atas: {
      type: DataTypes.INTEGER,
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
    tableName: 'penghasilan',
    schema: 'public',
    timestamps: false
  });
};
