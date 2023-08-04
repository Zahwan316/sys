const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('program_studi', {
    program_studi_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    kelompok_program_studi_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    kode: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    nama: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    kelompok: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    jenjang_paud: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    jenjang_tk: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    jenjang_sd: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    jenjang_smp: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    jenjang_sma: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    jenjang_tinggi: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    a_sert_komp: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    a_sert_profesi: {
      type: DataTypes.DECIMAL,
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
    sequelize,
    tableName: 'program_studi',
    schema: 'ref',
    timestamps: false
  });
};
