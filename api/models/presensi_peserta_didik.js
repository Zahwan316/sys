const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('presensi_peserta_didik', {
    presensi_peserta_didik_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    peserta_didik_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    presensi_kode: {
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
    tableName: 'presensi_peserta_didik',
    schema: 'kbm',
    timestamps: false,
    indexes: [
      {
        name: "presensi_peserta_didik_pkey",
        unique: true,
        fields: [
          { name: "presensi_peserta_didik_id" },
        ]
      },
    ]
  });
};
