var DataTypes = require("sequelize").DataTypes;
var _jenjang_pendidikan = require("./jenjang_pendidikan");

function initModels(sequelize) {
  var jenjang_pendidikan = _jenjang_pendidikan(sequelize, DataTypes);


  return {
    jenjang_pendidikan,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
