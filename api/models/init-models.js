var DataTypes = require("sequelize").DataTypes;
var _mapel_sp = require("./mapel_sp");

function initModels(sequelize) {
  var mapel_sp = _mapel_sp(sequelize, DataTypes);


  return {
    mapel_sp,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
