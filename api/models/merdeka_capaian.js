const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('merdeka_capaian', {
    capaian_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    elemen_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fase: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    lanjut_kode: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    create_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    soft_delete: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'merdeka_capaian',
    schema: 'ref',
    timestamps: false
  });
};
