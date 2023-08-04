const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('peserta_didik_kesehatan', {
    peserta_didik_kesehatan_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    peserta_didik_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    buta_warna: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    berat_badan: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    tinggi_badan: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    lingkar_kepala: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    visus_mata: {
      type: DataTypes.CHAR(8),
      allowNull: true
    },
    ldl: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hdl: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    gula_darah: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    tekanan_darah: {
      type: DataTypes.CHAR(8),
      allowNull: true
    },
    tanggal_test: {
      type: DataTypes.DATEONLY,
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
    tableName: 'peserta_didik_kesehatan',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "peserta_didik_kesehatan_pkey",
        unique: true,
        fields: [
          { name: "peserta_didik_kesehatan_id" },
        ]
      },
    ]
  });
};
