var DataTypes = require("sequelize").DataTypes;
var _ptk_alamat = require("./ptk_alamat");

function initModels(sequelize) {
  var ptk_alamat = _ptk_alamat(sequelize, DataTypes);


  return {
    ptk_alamat,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
