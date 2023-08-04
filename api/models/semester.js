const Sequelize = require('../config');
const {DataTypes} = require("sequelize");

const Semester = Sequelize.define('semester', {
    semester_id: {
      type: DataTypes.CHAR(5),
      allowNull: false
    },
    tahun_ajaran_id: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    nama: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    semester: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    periode_aktif: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    tanggal_mulai: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    tanggal_selesai: {
      type: DataTypes.DATEONLY,
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
    tableName: 'semester',
    schema: 'ref',
    timestamps: false,
    indexes: [
      {
        name: "semester_pkey",
        unique: true,
        fields: [
          { name: "_id" },
        ]
      },
    ]
  });

module.exports = Semester
