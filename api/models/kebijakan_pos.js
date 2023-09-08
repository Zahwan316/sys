const Sequelize = require('../config');
const {DataTypes} = require("sequelize");
const Kebijakan_pos = Sequelize.define('kebijakan_pos', {
    kebijakan_pos_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    kode_pos: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    no_sk_kebijakan: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    tanggal_sk_kebijakan: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    tmt: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    tingkat_pendidikan_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tahun_ajaran_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    besaran: {
      type: DataTypes.DECIMAL,
      allowNull: false
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
    updater_id: {
      type: DataTypes.UUID,
      allowNull: true
    }
  }, {
    Sequelize,
    tableName: 'kebijakan_pos',
    schema: 'keuangan',
    timestamps: false,
    indexes: [
      {
        name: "kebijakan_pos_pkey",
        unique: true,
        fields: [
          { name: "kebijakan_pos_id" },
        ]
      },
    ]
  });

module.exports = Kebijakan_pos
