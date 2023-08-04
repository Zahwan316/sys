const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('merdeka_rencana_formatif', {
    rencana_formatif_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    rencana_materi_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    soal: {
      type: DataTypes.CHAR(47),
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
    tableName: 'merdeka_rencana_formatif',
    schema: 'kbm',
    timestamps: false,
    indexes: [
      {
        name: "merdeka_rencana_formatif_pkey",
        unique: true,
        fields: [
          { name: "rencana_formatif_id" },
        ]
      },
    ]
  });
};
