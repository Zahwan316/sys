var DataTypes = require("sequelize").DataTypes;
var _jenis_rombel = require("./jenis_rombel");

function initModels(sequelize) {
  var jenis_rombel = _jenis_rombel(sequelize, DataTypes);


  return {
    jenis_rombel,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
