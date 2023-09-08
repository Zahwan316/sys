var DataTypes = require("sequelize").DataTypes;
var _kebijakan_pos = require("./kebijakan_pos");

function initModels(sequelize) {
  var kebijakan_pos = _kebijakan_pos(sequelize, DataTypes);


  return {
    kebijakan_pos,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
