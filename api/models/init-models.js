var DataTypes = require("sequelize").DataTypes;
var _hubungan_keluarga = require("./hubungan_keluarga");

function initModels(sequelize) {
  var hubungan_keluarga = _hubungan_keluarga(sequelize, DataTypes);


  return {
    hubungan_keluarga,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
