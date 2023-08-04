const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('gelar_akademik', {
    gelar_akademik_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    kode: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    nama: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    posisi_gelar: {
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
    }
  }, {
    sequelize,
    tableName: 'gelar_akademik',
    schema: 'ref',
    timestamps: false
  });
};
