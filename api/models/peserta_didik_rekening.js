const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('peserta_didik_rekening', {
    peserta_didik_rekening_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    peserta_didik_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    id_bank: {
      type: DataTypes.CHAR(4),
      allowNull: true
    },
    no_rekening: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    rekening_atas_nama: {
      type: DataTypes.STRING(50),
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
    tableName: 'peserta_didik_rekening',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "peserta_didik_rekening_pkey",
        unique: true,
        fields: [
          { name: "peserta_didik_rekening_id" },
        ]
      },
    ]
  });
};
