const {Sequelize} = require("sequelize");

const sequelize = new Sequelize("akademik","postgres","darthside",{
    host:"localhost",
    port:5432,
    dialect:"postgres"
})

sequelize.authenticate()
    .then(() => console.log("Database Connected"))
    .catch((e) => console.log(e));

module.exports = sequelize