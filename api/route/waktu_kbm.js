const express = require("express");
const Sequelize = require('sequelize');
const router = express.Router();
const Waktu_kbm = require("../models/waktu_kbm")
const Hari = require("../models/hari")

Hari.hasOne(Waktu_kbm,{
    foreignKey:"hari_ke"
})
Waktu_kbm.belongsTo(Hari,{
    foreignKey:"hari_ke"
})

router.route("/waktu_kbm")
    .get(async(req,res) => {
        try{
            const allData = await Waktu_kbm.findAll({
               /*  include:{
                    model:Hari,
                    attributes:['nama']
                } */
            })
            res.status(200).json({
                message:"Data berhasil diambil",
                data:allData,
                method:req.method
            })
        }
        catch(e){
            res.status(400).json({
                message:e.message,
                method:req.method
            })
        }
    })


module.exports = router