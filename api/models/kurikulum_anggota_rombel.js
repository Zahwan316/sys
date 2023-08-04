const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('kurikulum_anggota_rombel', {
    anggota_rombel_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    peserta_didik_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'peserta_didik',
        key: 'peserta_didik_id'
      }
    },
    rombongan_belajar_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    jenis_pendaftaran_id: {
      type: DataTypes.SMALLINT,
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
    tableName: 'kurikulum_anggota_rombel',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "anggota_rombel_pkey",
        unique: true,
        fields: [
          { name: "anggota_rombel_id" },
        ]
      },
    ]
  });
};
