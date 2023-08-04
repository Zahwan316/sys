const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('merdeka_rencana_cp', {
    rencana_cp_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    ptk_penugasan_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    semester_id: {
      type: DataTypes.CHAR(5),
      allowNull: true
    },
    fase: {
      type: DataTypes.CHAR(2),
      allowNull: true
    },
    elemen_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    capaian_id: {
      type: DataTypes.UUID,
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
    tableName: 'merdeka_rencana_cp',
    schema: 'kbm',
    timestamps: false,
    indexes: [
      {
        name: "merdeka_rencana_cp_pkey",
        unique: true,
        fields: [
          { name: "rencana_cp_id" },
        ]
      },
    ]
  });
};
