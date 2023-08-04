const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('presensi', {
    presensi_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    presensi_kode: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    deskripsi: {
      type: DataTypes.CHAR(10),
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
    last_sync: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: "1901-01-01 00:00:00"
    },
    updater_id: {
      type: DataTypes.UUID,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'presensi',
    schema: 'ref',
    timestamps: false,
    indexes: [
      {
        name: "presensi_pkey",
        unique: true,
        fields: [
          { name: "presensi_id" },
        ]
      },
    ]
  });
};
