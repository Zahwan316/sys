const Sequelize = require('../config');
const {DataTypes} = require("sequelize");
const Status_kepegawaian = Sequelize.define('status_kepegawaian', {
    status_kepegawaian_id: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    nama: {
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
    },
    _id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    }
  }, {
    Sequelize,
    tableName: 'status_kepegawaian',
    schema: 'ref',
    timestamps: false,
    indexes: [
      {
        name: "status_kepegawaian_pkey",
        unique: true,
        fields: [
          { name: "_id" },
        ]
      },
    ]
  });

  module.exports = Status_kepegawaian;
