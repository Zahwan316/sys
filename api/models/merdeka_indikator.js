const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('merdeka_indikator', {
    indikator_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    atp_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    ptk_penugasan_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    deskripsi: {
      type: DataTypes.TEXT,
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
    tableName: 'merdeka_indikator',
    schema: 'kbm',
    timestamps: false,
    indexes: [
      {
        name: "merdeka_indikator_pkey",
        unique: true,
        fields: [
          { name: "indikator_id" },
        ]
      },
    ]
  });
};
