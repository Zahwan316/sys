const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('merdeka_rencana_atp', {
    rencana_atp_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    rencana_tujuan_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    urutan: {
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
    tableName: 'merdeka_rencana_atp',
    schema: 'kbm',
    timestamps: false,
    indexes: [
      {
        name: "merdeka_rencana_atp_pkey",
        unique: true,
        fields: [
          { name: "rencana_atp_id" },
        ]
      },
    ]
  });
};
