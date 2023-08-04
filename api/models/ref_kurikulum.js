const Sequelize = require('../config');
const {DataTypes} = require("sequelize");
const Ref_kurikulum = Sequelize.define('ref_kurikulum', {
    kurikulum_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    kurikulum_kode: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    deskripsi: {
      type: DataTypes.CHAR(70),
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
    finish: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    Sequelize,
    tableName: 'ref_kurikulum',
    schema: 'ref',
    timestamps: false,
    indexes: [
      {
        name: "kurikulum_pkey",
        unique: true,
        fields: [
          { name: "kurikulum_id" },
        ]
      },
    ]
  });

module.exports =Ref_kurikulum
