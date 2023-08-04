const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('merdeka_elemen_sp', {
    elemen_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    sekolah_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    mapel_kode: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    elemen_kode: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    deskripsi: {
      type: DataTypes.TEXT,
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
    tableName: 'merdeka_elemen_sp',
    schema: 'kbm',
    timestamps: false,
    indexes: [
      {
        name: "merdeka_elemen_sp_pkey",
        unique: true,
        fields: [
          { name: "elemen_id" },
        ]
      },
    ]
  });
};
