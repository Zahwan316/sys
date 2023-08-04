const Sequelize = require('../config');
const {DataTypes} = require("sequelize");

const Status_sekolah = Sequelize.define('status_sekolah', {
    status_sekolah_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    status_sekolah: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    deskripsi: {
      type: DataTypes.CHAR(6),
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
    Sequelize,
    tableName: 'status_sekolah',
    schema: 'ref',
    timestamps: false,
    indexes: [
      {
        name: "status_sekolah_pkey",
        unique: true,
        fields: [
          { name: "status_sekolah_id" },
        ]
      },
    ]
  });

module.exports = Status_sekolah
