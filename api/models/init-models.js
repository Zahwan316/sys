var DataTypes = require("sequelize").DataTypes;
var _kurikulum_rombongan_belajar = require("./kurikulum_rombongan_belajar");

function initModels(sequelize) {
  var kurikulum_rombongan_belajar = _kurikulum_rombongan_belajar(sequelize, DataTypes);


  return {
    kurikulum_rombongan_belajar,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
