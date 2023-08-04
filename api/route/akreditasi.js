const express = require("express");
const Sequelize = require('sequelize');
const router = express.Router();
const Akreditasi = require("../models/akreditasi")

router.route("/akreditasi")
    .get(async(req,res) => {
        try{
            const allData = await Akreditasi.findAll({attributes:{exclude:"id"}});
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