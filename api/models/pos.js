const Sequelize = require('../config');
const {DataTypes} = require("sequelize");
const Pos = Sequelize.define('pos', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    kode_pos: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nama: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    is_cicilan_fix: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    berapax_cicilan_fix: {
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
    updater_id: {
      type: DataTypes.UUID,
      allowNull: true
    }
  }, {
    Sequelize,
    tableName: 'pos',
    schema: 'keuangan',
    timestamps: false,
    indexes: [
      {
        name: "pos_pkey",
        unique: true,
        fields: [
          { name: "_id" },
        ]
      },
    ]
  });

module.exports = Pos