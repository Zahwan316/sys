const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('merdeka_rencana_atp_rombel', {
    rencana_atp_rombel_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    rencana_atp_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    rombongan_belajar_id: {
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
    },
    finish: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'merdeka_rencana_atp_rombel',
    schema: 'kbm',
    timestamps: false,
    indexes: [
      {
        name: "merdeka_rencana_atp_rombel_pkey",
        unique: true,
        fields: [
          { name: "rencana_atp_rombel_id" },
        ]
      },
    ]
  });
};
