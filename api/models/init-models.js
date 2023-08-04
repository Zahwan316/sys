var DataTypes = require("sequelize").DataTypes;
var _ref_kurikulum = require("./ref_kurikulum");

function initModels(sequelize) {
  var ref_kurikulum = _ref_kurikulum(sequelize, DataTypes);


  return {
    ref_kurikulum,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
