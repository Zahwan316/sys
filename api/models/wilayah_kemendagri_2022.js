const Sequelize = require('../config');
const {DataTypes} = require("sequelize");

const Wilayah_kemendagri = Sequelize.define('wilayah_kemendagri_2022', {
    id_wilayah: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    nama: {
      type: DataTypes.STRING(120),
      allowNull: true
    }
  }, {
    Sequelize,
    tableName: 'wilayah_kemendagri_2022',
    schema: 'ref',
    timestamps: false
  });

module.exports = Wilayah_kemendagri
