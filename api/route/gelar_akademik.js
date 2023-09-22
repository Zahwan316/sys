const express = require("express");
const Sequelize = require('sequelize');
const router = express.Router();
const Gelar_akademik = require("../models/gelar_akademik")

router.route("/gelar_akademik")
    .get(async(req,res) => {
        try{
            const getData = await Gelar_akademik.findAll({
                attributes:{
                    exclude:"id"
                }
            });
            res.status(200).json({
                message:"Data berhasil diambil",
                data:getData,
                method:req.method
            })
        }
        catch(e){
            res.status(400).json({
                message:e.message,
                methode:req.method
            })
        }
    })

module.exports = router