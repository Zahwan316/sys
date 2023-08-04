const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ptk_pangkat_gol', {
    ptk_pangkat_gol_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    ptk_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    pangkat_gol_id: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    nomor_sk: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    tanggal_sk: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    tmt_pangkat: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    masa_kerja_gol_tahun: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    masa_kerja_bulan: {
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
    tableName: 'ptk_pangkat_gol',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "ptk_pangkat_gol_pkey",
        unique: true,
        fields: [
          { name: "ptk_pangkat_gol_id" },
        ]
      },
    ]
  });
};
