const Sequelize = require('../config');
const {DataTypes} = require("sequelize");

const Status_kepemilikan = Sequelize.define('status_kepemilikan', {
    status_kepemilikan_id: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    nama: {
      type: DataTypes.STRING(20),
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
      allowNull: true
    },
    _id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    }
  }, {
    Sequelize,
    tableName: 'status_kepemilikan',
    schema: 'ref',
    timestamps: false,
    indexes: [
      {
        name: "status_kepemilikan_pkey",
        unique: true,
        fields: [
          { name: "_id" },
        ]
      },
    ]
  });

module.exports = Status_kepemilikan
