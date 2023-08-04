const Sequelize = require('../config');
const {DataTypes} = require("sequelize");

const Bank = Sequelize.define('bank', {
    id_bank: {
      type: DataTypes.CHAR(3),
      allowNull: false,
      primaryKey: true
    },
    nm_bank: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    create_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false
    },
    expired_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    last_sync: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    Sequelize,
    tableName: 'bank',
    schema: 'ref',
    timestamps: false,
    indexes: [
      {
        name: "bank_id_bank_idx",
        fields: [
          { name: "id_bank" },
        ]
      },
      {
        name: "bank_pkey",
        unique: true,
        fields: [
          { name: "id_bank" },
        ]
      },
    ]
  });

module.exports = Bank
