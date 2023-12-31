const Sequelize = require('../config');
const {DataTypes} = require("sequelize");

const Status_perkawinan = Sequelize.define('status_perkawinan', {
    status_perkawinan_id: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      primaryKey: true
    },
    status_perkawinan: {
      type: DataTypes.STRING,
      allowNull: true
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: true
    },
    soft_delete: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    Sequelize,
    tableName: 'status_perkawinan',
    schema: 'ref',
    timestamps: false,
    indexes: [
      {
        name: "status_perkawinan_pkey",
        unique: true,
        fields: [
          { name: "status_perkawinan_id" },
        ]
      },
    ]
  });

module.exports = Status_perkawinan
